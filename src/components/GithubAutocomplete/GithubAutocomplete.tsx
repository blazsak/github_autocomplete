import React, { useMemo, useState } from 'react';
import { GithubAutocompleteStyles } from './GithubAutocompleteStyles';
import GithubAutocompleteInput from './Input/GithubAutocompleteInput';
import GithubAutocompleteList from './List/GithubAutocompleteList';
import { type GithubAutocompleteListItemType } from './@types/GithubAutocompleteListItemType';
import { clearTimeout } from 'timers';

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
    let callbackDebounceTimeout: NodeJS.Timeout;

    const isListActive = useMemo(() => search.length >= 3, [search]);

    function handleInputChange(value: string): void {
        setSearch(value.trim());
        console.log('clear timeout', callbackThrottleTimeout);
        clearTimeout(callbackThrottleTimeout);
        if (!isListActive) {
            setItems([]);
            return;
        }
        callbackThrottleTimeout = setTimeout(fetchApiResults, 1500);
        console.log('set timeout', callbackThrottleTimeout);
    }

    function debounce(callback: () => void, delay: number = 500): void {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

    function fetchApiResults(): void {
        setIsLoading(true);
        console.log('fetch from API', callbackThrottleTimeout);
        setItems(
            [...Array(Math.floor(Math.random() * 20)).keys()].map((i) => ({
                id: i + 1,
                name: `Item number ${i + 1}`,
            })),
        );
    }

    return (
        <GithubAutocompleteStyles>
            <GithubAutocompleteInput
                loading={isLoading}
                label={label}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <GithubAutocompleteList isActive={isListActive} items={items} />
        </GithubAutocompleteStyles>
    );
}
