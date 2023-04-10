import React, { useState } from 'react';
import { IconSearch, IconSpinner } from './Icon';
import { InputWrapper, Input, InputIcon, InputLabel } from './Input.styles';

export function GithubAutocompleteInput({
    loading,
    label,
    placeholder,
    onChange = () => {},
    onKey = () => {},
}: {
    loading: boolean;
    label?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onKey?: (value: string) => void;
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
                    tabIndex={1}
                    onInput={(event) => {
                        setCurrentValue(event.currentTarget.value);
                        onChange(event.currentTarget.value);
                    }}
                    value={currentValue}
                    onKeyUp={(event) => {
                        onKey(event.key);
                    }}
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
