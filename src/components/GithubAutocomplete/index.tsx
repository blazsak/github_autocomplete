import React from 'react';
import { GithubAutocompleteWrapper } from './GithubAutocomplete.styles';
import { GithubAutocompleteInput } from './Input';
import { GithubAutocompleteList } from './List';
import { useGithubAutocomplete } from './utils';

export default function GithubAutocomplete({
    label,
    placeholder,
}: {
    label?: string;
    placeholder?: string;
}): JSX.Element {
    const {
        isLoading,
        isListActive,
        itemsToShow,
        total,
        hasError,
        error,
        handleInputChange,
        handleKeyboard,
        selectedItem,
    } = useGithubAutocomplete();

    return (
        <GithubAutocompleteWrapper>
            <GithubAutocompleteInput
                loading={isLoading}
                label={label}
                placeholder={placeholder}
                onChange={handleInputChange}
                onKey={handleKeyboard}
            />
            <GithubAutocompleteList
                isActive={isListActive}
                items={itemsToShow}
                hasError={hasError}
                selected={selectedItem}
            >
                {hasError ? (
                    error
                ) : (
                    <>
                        {isLoading && `Fetching data...`}
                        {!isLoading &&
                            (itemsToShow.length === 0
                                ? `No records were found`
                                : `Shows ${itemsToShow.length}
                                   item${itemsToShow.length !== 1 ? 's' : ''}
                                   out of ${total} found`)}
                    </>
                )}
            </GithubAutocompleteList>
        </GithubAutocompleteWrapper>
    );
}
