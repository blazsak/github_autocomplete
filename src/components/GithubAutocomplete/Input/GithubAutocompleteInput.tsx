import React from 'react';
import GithubAutocompleteIconSearch from '../Icon/GithubAutocompleteIconSearch';
import { InputWrapper, Input, InputIcon, InputLabel } from '../GithubAutocompleteStyles';
import GithubAutocompleteIconSpinner from '../Icon/GithubAutocompleteIconSpinner';

export default function GithubAutocompleteInput({
    loading,
    label,
    placeholder,
    onChange = () => {},
}: {
    loading: boolean;
    label?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}): JSX.Element {
    return (
        <label>
            {label !== null && <InputLabel>{label}</InputLabel>}
            <InputWrapper>
                <InputIcon active>
                    <GithubAutocompleteIconSearch />
                </InputIcon>
                <Input
                    autoFocus
                    type="text"
                    placeholder={placeholder}
                    maxLength={50}
                    onChange={(event) => {
                        onChange(event.currentTarget.value);
                    }}
                    onInput={(event) => {
                        onChange(event.currentTarget.value);
                    }}
                />
                <InputIcon right active={loading}>
                    <GithubAutocompleteIconSpinner />
                </InputIcon>
            </InputWrapper>
        </label>
    );
}
