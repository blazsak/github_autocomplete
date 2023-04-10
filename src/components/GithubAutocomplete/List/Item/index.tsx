import React from 'react';
import { type ListItemType } from './@types/ListItemType';
import { ListItem } from './ListItem.style';
import { ListItemAvatar } from './Avatar';

export function GithubAutocompleteListItem({
    item,
    number = 0,
}: {
    item: ListItemType;
    number: number;
}): JSX.Element {
    return (
        <ListItem tabIndex={number + 1}>
            <ListItemAvatar src={item.avatar} />
            <small>#{number}</small>
            <section>
                <h6>{item.name}</h6>
                <p>{item.description.trim()}</p>
            </section>
            <label className={item.type}>{item.type}</label>
        </ListItem>
    );
}
