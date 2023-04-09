import React from 'react';
import { IconSearch, IconSpinner } from './Icon';
import { InputWrapper, Input, InputIcon, InputLabel } from './Input.styles';

export function GithubAutocompleteInput({
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
                    <IconSearch />
                </InputIcon>
                <Input
                    autoFocus
                    type="text"
                    placeholder={placeholder}
                    maxLength={50}
                    onInput={(event) => {
                        onChange(event.currentTarget.value);
                    }}
                />
                <InputIcon right active={loading}>
                    <IconSpinner />
                </InputIcon>
            </InputWrapper>
        </label>
    );
}
