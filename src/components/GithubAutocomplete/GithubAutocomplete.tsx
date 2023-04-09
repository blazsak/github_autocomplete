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
    const [number, setNumber] = useState<number>(4);

    function onClick(): void {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setNumber(number + 1);
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
            <GithubAutocompleteList number={number} />
            <button onClick={onClick} disabled={isLoading}>
                set Loading
            </button>
            <button
                onClick={() => {
                    setNumber(number + 1);
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    setNumber(number - 1);
                }}
            >
                -
            </button>
        </GithubAutocompleteStyle>
    );
}
