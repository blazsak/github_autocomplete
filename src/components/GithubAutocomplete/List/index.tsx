import React from 'react';
import { GithubAutocompleteListItem } from './Item';
import { type GithubAutocompleteListItemType } from '../@types/GithubAutocompleteListItemType';
import { List, ListWrapper } from './List.style';

export function GithubAutocompleteList({
    items,
    isActive,
    children,
    hasError = false,
}: {
    items: GithubAutocompleteListItemType[];
    isActive: boolean;
    children?: React.ReactNode;
    hasError?: boolean;
}): JSX.Element {
    return (
        <ListWrapper isActive={isActive}>
            <List isActive={isActive}>
                {items.map((item: GithubAutocompleteListItemType, index: number) => (
                    <GithubAutocompleteListItem
                        key={item.id}
                        item={item}
                        number={index + 1}
                    />
                ))}
            </List>
            {children !== undefined && isActive && (
                <footer className={hasError ? 'error' : ''}>{children}</footer>
            )}
        </ListWrapper>
    );
}
