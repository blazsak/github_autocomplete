import { useEffect, useMemo, useState } from 'react';
import { type ListItemType } from './List/Item/@types/ListItemType';
import {
    type GitHubApiRepositorySearchResponseInterface,
    type GitHubApiRepositorySearchUserInterface,
} from './@interfaces/GitHubResponseInterfaces';
import {
    type GithubAutocompleteOptions,
    type GithubAutocompleteOptionsOptional,
} from './@types/GithubAutocompleteOptions';
import { type GithubApiSearchOptions } from './@types/GithubApiSearchOptions';

// TODO refactor to useCallback debounce function
let fetchCallbackDebounceTimeout: NodeJS.Timeout;
let abortController: AbortController;

declare type GithubAutocompleteHookType = {
    isLoading: boolean;
    isListActive: boolean;
    itemsToShow: ListItemType[];
    total: number;
    hasError: boolean;
    error: string;
    selectedItem?: ListItemType;
    handleKeyboard: (key: string) => void;
    handleInputChange: (value: string) => void;
};
export function useGithubAutocomplete(
    _options: GithubAutocompleteOptionsOptional = {},
): GithubAutocompleteHookType {
    const options: GithubAutocompleteOptions = {
        ...{
            // defaults
            debounce: 750,
            minSearchLength: 3,
            maxResults: 50,
        },
        ..._options,
    };
    const { searchRepositories, searchUsers } = useGithubApiSearch({
        maxResults: options.maxResults,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<ListItemType[]>([]);
    const [error, setError] = useState<string>('');
    const [cursor, setCursor] = useState<number>(-1);

    const itemsToShow = useMemo<ListItemType[]>(
        () =>
            items
                // sort by name
                .sort((a, b) => a.name.localeCompare(b.name))
                // extra filter pass for matching current autocompleted result before async fetch finishes
                // .filter((i) => i.name.search(search))
                // return first 50 results
                .slice(0, options.maxResults),
        [items],
    );
    const isListActive = useMemo<boolean>(
        () => search.length >= options.minSearchLength,
        [search],
    );
    const hasError = useMemo<boolean>(() => error !== '', [error]);

    // handle keyboard
    const [selectedItem, setSelectedItem] = useState<ListItemType | undefined>(undefined);
    useEffect(() => {
        if (isLoading) {
            setCursor(-1);
            return;
        }
        setSelectedItem(itemsToShow[cursor]);
    }, [cursor, itemsToShow, isLoading]);

    // Handle debounced input
    useEffect(() => {
        if (!isListActive) {
            setItems([]);
            return;
        }
        setIsLoading(true);
        setError('');
        abortController?.abort();
        abortController = new AbortController();
        clearTimeout(fetchCallbackDebounceTimeout);
        fetchCallbackDebounceTimeout = setTimeout(() => {
            Promise.all([searchRepositories(search), searchUsers(search)])
                .then(([repositories, users]) => {
                    const mappedItems: ListItemType[] = [
                        ...(repositories?.items !== undefined
                            ? repositories.items
                            : []
                        ).map((r) => ({
                            id: `repository:${r.id}`,
                            name: r.name,
                            avatar:
                                r.owner.avatar_url !== ''
                                    ? `${r.owner.avatar_url}&size=60`
                                    : '',
                            description: `${r.language ?? ''} ${r.description ?? ''}`,
                            url: r.html_url,
                            type: 'repo',
                        })),
                        ...(users?.items !== undefined ? users.items : []).map((u) => ({
                            id: `user:${u.id}`,
                            name: u.login,
                            avatar: u.avatar_url !== '' ? `${u.avatar_url}&size=60` : '',
                            description: '',
                            url: u.html_url,
                            type: 'user',
                        })),
                    ];
                    setTotal(repositories.total_count + users.total_count);
                    setItems(mappedItems);
                    setError('');
                })
                .catch((reason) => {
                    setError(
                        reason?.message !== undefined
                            ? reason.message
                            : 'Error: Fetch from API failed',
                    );
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 150);
                });

            /*
            setItems(
                [...Array(Math.floor(Math.random() * 500)).keys()].map((i) => ({
                    id: `test:${i + 1}`,
                    name: (Math.random() + 1).toString(36).substring(2, 7),
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt, nulla ut rutrum congue, velit ipsum elementum nibh, vel dapibus massa nulla ut nisl. Sed bibendum mi lectus, ut mattis elit hendrerit vitae. Cras non ante quis massa elementum feugiat molestie vitae nulla. Suspendisse id ornare mi. Vestibulum in mollis augue. Mauris commodo rhoncus ante, ac rhoncus eros suscipit vel. Nullam at feugiat nibh, placerat dictum lacus',
                    avatar: '',
                    url: '',
                    type: 'Repo',
                })),
            );
            setIsLoading(false);
            /**/
        }, options.debounce);
    }, [search]);

    function handleInputChange(value: string): void {
        setSearch(value.trim());
    }
    function handleKeyboard(key: string): void {
        if (key === 'ArrowUp' && cursor > 0) {
            setCursor(cursor - 1);
        }
        if (key === 'ArrowDown' && cursor < itemsToShow.length - 1) {
            setCursor(cursor + 1);
        }
        if (key === 'Home') {
            setCursor(0);
        }
        if (key === 'End') {
            setCursor(itemsToShow.length - 1);
        }
        if (key === 'Enter' && selectedItem !== undefined) {
            // Todo move to options callback
            window?.open(selectedItem.url, '_blank');
        }
    }

    return {
        isLoading,
        isListActive,
        itemsToShow,
        total,
        hasError,
        error,
        selectedItem,
        handleKeyboard,
        handleInputChange,
    };
}

declare type GitHubApiSearchType = {
    searchUsers: (search: string) => Promise<GitHubApiRepositorySearchUserInterface>;
    searchRepositories: (
        search: string,
    ) => Promise<GitHubApiRepositorySearchResponseInterface>;
};

export const useGithubApiSearch = (
    options: GithubApiSearchOptions,
): GitHubApiSearchType => {
    const apiUrl = 'https://api.github.com';

    async function handleResponse(response: Response): Promise<object> {
        if (response.status !== 200) {
            if (
                response.status === 403 &&
                response.headers.get('x-ratelimit-remaining') === '0'
            ) {
                throw Error('API rate limit exceeded. Try again in a moment.');
            }
            throw Error('API Fetch error.');
        }
        return await response.json();
    }

    return {
        /**
         * Search GitHub repository
         */
        searchRepositories: async (
            search: string,
        ): Promise<GitHubApiRepositorySearchResponseInterface> => {
            const encodedSearch = encodeURIComponent(search);
            return (await handleResponse(
                await fetch(
                    `${apiUrl}/search/repositories?q=${encodedSearch} in:public in:name&per_page=${options.maxResults}&page=1`,
                    { signal: abortController.signal },
                ),
            )) as GitHubApiRepositorySearchResponseInterface;
        },
        /**
         * Search GitHub users
         */
        searchUsers: async (
            search: string,
        ): Promise<GitHubApiRepositorySearchUserInterface> => {
            const encodedSearch = encodeURIComponent(search);
            return (await handleResponse(
                await fetch(
                    `${apiUrl}/search/users?q=${encodedSearch} in:login&per_page=${options.maxResults}&page=1`,
                    { signal: abortController.signal },
                ),
            )) as GitHubApiRepositorySearchUserInterface;
        },
    };
};
