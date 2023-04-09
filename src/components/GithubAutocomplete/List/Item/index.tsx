import React from 'react';
import { type ListItemType } from './@types/ListItemType';
import { ListItem } from './ListItem.style';

export function GithubAutocompleteListItem({
    item,
    number = 0,
}: {
    item: ListItemType;
    number: number;
}): JSX.Element {
    return (
        <ListItem>
            <span>#{number}</span>
            {item.name}
        </ListItem>
    );
}
