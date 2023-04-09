import React, { useState } from 'react';
import { GithubAutocompleteStyle } from './GithubAutocompleteStyle';
import GithubAutocompleteInput from './Input/GithubAutocompleteInput';
import GithubAutocompleteList from './List/GithubAutocompleteList';

export default function GithubAutocomplete({
    label,
    placeholder,
}: {
    label?: string;
    placeholder?: string;
}): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function onClick(): void {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    function handleInputChange(value: string): void {
        console.log(value);

        const searchValue = value.trim();
        if (searchValue.length > 3) {
            console.log('init search');
            onClick();
        }
    }

    return (
        <GithubAutocompleteStyle>
            <GithubAutocompleteInput
                loading={isLoading}
                label={label}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <GithubAutocompleteList />
            <button onClick={onClick} disabled={isLoading}>
                Loading
            </button>
        </GithubAutocompleteStyle>
    );
}
