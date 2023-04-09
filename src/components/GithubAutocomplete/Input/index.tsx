import React, { useState } from 'react';
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
    const [currentValue, setCurrentValue] = useState<string>('');

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
                        setCurrentValue(event.currentTarget.value);
                        onChange(event.currentTarget.value);
                    }}
                    value={currentValue}
                />
                <InputIcon right active={loading}>
                    <IconSpinner />
                </InputIcon>
                <InputIcon right active={!loading && currentValue.length > 0}>
                    <button
                        onClick={() => {
                            setCurrentValue('');
                            onChange('');
                        }}
                    >
                        ✕
                    </button>
                </InputIcon>
            </InputWrapper>
        </label>
    );
}
