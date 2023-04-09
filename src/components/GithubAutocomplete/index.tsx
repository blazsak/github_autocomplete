import React, { useEffect, useMemo, useState } from 'react';
import { GithubAutocompleteWrapper } from './GithubAutocomplete.styles';
import { GithubAutocompleteInput } from './Input';
import { GithubAutocompleteList } from './List';
import { type GithubAutocompleteListItemType } from './@types/GithubAutocompleteListItemType';

// TODO refactor to useCallback debounce function
let fetchCallbackDebounceTimeout: NodeJS.Timeout;
export default function GithubAutocomplete({
    label,
    placeholder,
}: {
    label?: string;
    placeholder?: string;
}): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [items, setItems] = useState<GithubAutocompleteListItemType[]>([]);
    const isListActive = useMemo(() => search.length >= 3, [search]);

    // Handle debounced input
    useEffect(() => {
        console.log('handle Input', { search });
        if (!isListActive) {
            setItems([]);
            return;
        }
        setIsLoading(true);
        clearTimeout(fetchCallbackDebounceTimeout);
        fetchCallbackDebounceTimeout = setTimeout(() => {
            console.log('fetch from API', { search });
            setItems(
                [...Array(Math.floor(Math.random() * 20)).keys()].map((i) => ({
                    id: i + 1,
                    name: `Item number ${i + 1}`,
                })),
            );
            setIsLoading(false);
        }, 1000);
    }, [search]);
    function handleInputChange(value: string): void {
        setSearch(value.trim());
    }

    return (
        <GithubAutocompleteWrapper>
            <GithubAutocompleteInput
                loading={isLoading}
                label={label}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <GithubAutocompleteList isActive={isListActive} items={items} />
        </GithubAutocompleteWrapper>
    );
}
