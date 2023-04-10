import React from 'react';
import { GithubAutocompleteListItem } from './Item';

import { List, ListWrapper } from './List.style';
import { type ListItemType } from './Item/@types/ListItemType';

export function GithubAutocompleteList({
    items,
    isActive,
    children,
    hasError = false,
}: {
    items: ListItemType[];
    isActive: boolean;
    children?: React.ReactNode;
    hasError?: boolean;
}): JSX.Element {
    return (
        <ListWrapper isActive={isActive}>
            <List isActive={isActive}>
                {items.map((item: ListItemType, index: number) => (
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
