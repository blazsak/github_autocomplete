import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { type ListItemType } from './List/Item/@types/ListItemType';
import {
    type GitHubApiRepositorySearchResponseInterface,
    type GitHubApiRepositorySearchUserInterface,
} from './@interfaces/GitHubResponseInterfaces';

// TODO refactor to useCallback debounce function
let fetchCallbackDebounceTimeout: NodeJS.Timeout;

declare type GithubAutocompleteHookType = {
    isLoading: boolean;
    isListActive: boolean;

    setSearch: React.Dispatch<string>;
    itemsToShow: ListItemType[];
    total: number;
    hasError: boolean;
    error: string;
};
export function useGithubAutocomplete(): GithubAutocompleteHookType {
    const { searchRepositories, searchUsers } = useGithubApiSearch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const [items, setItems] = useState<ListItemType[]>([]);
    const [error, setError] = useState<string>('');
    const itemsToShow = useMemo<ListItemType[]>(
        () =>
            items
                // sort by name
                .sort((a, b) => a.name.localeCompare(b.name))
                // extra filter pass for matching current autocompleted result before async fetch finishes
                // .filter((i) => i.name.search(search))
                // return first 50 results
                .slice(0, 50),
        [items],
    );
    const isListActive = useMemo<boolean>(() => search.length >= 3, [search]);

    const hasError = useMemo<boolean>(() => error !== '', [error]);
    // Handle debounced input
    useEffect(() => {
        if (!isListActive) {
            setItems([]);
            return;
        }
        setIsLoading(true);
        setError('');
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
                            url: '',
                            type: 'user',
                        })),
                    ];
                    setTotal(repositories.total_count + users.total_count);
                    setItems(mappedItems);
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
            */
        }, 1000);
    }, [search]);

    return {
        isLoading,
        isListActive,
        setSearch,
        itemsToShow,
        total,
        hasError,
        error,
    };
}

declare type GitHubApiSearchType = {
    searchUsers: (search: string) => Promise<GitHubApiRepositorySearchUserInterface>;
    searchRepositories: (
        search: string,
    ) => Promise<GitHubApiRepositorySearchResponseInterface>;
};

export function useGithubApiSearch(): GitHubApiSearchType {
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
            return await fetch(
                `${apiUrl}/search/repositories?q=${encodedSearch} in:public in:name&per_page=100&page=1`,
            ).then(async (response) => {
                return (await handleResponse(
                    response,
                )) as GitHubApiRepositorySearchResponseInterface;
            });
        },
        /**
         * Search GitHub users
         */
        searchUsers: async (
            search: string,
        ): Promise<GitHubApiRepositorySearchUserInterface> => {
            const encodedSearch = encodeURIComponent(search);
            return await fetch(
                `${apiUrl}/search/users?q=${encodedSearch} in:login&per_page=100&page=1`,
            ).then(async (response) => {
                return (await handleResponse(
                    response,
                )) as GitHubApiRepositorySearchUserInterface;
            });
        },
    };
}
