import React from 'react';
import { GithubAutocompleteListItem } from './Item';
import { type GithubAutocompleteListItemType } from '../@types/GithubAutocompleteListItemType';
import { List } from './List.style';

export function GithubAutocompleteList({
    items,
    isActive,
}: {
    items: GithubAutocompleteListItemType[];
    isActive: boolean;
}): JSX.Element {
    return (
        <List isActive={isActive}>
            {items.map((item: GithubAutocompleteListItemType, index: number) => (
                <GithubAutocompleteListItem
                    key={item.id}
                    item={item}
                    number={index + 1}
                />
            ))}
        </List>
    );
}
