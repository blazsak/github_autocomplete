import React from 'react';
import { type ListItemType } from './@types/ListItemType';
import { ListItem } from './ListItem.style';
import { ListItemAvatar } from './Avatar';

export function GithubAutocompleteListItem({
    item,
    number = 0,
    isSelected = false,
}: {
    item: ListItemType;
    number: number;
    isSelected?: boolean;
}): JSX.Element {
    return (
        <ListItem tabIndex={number + 1} className={isSelected ? 'selected' : ''}>
            <a href={item.url} target="_blank" rel="noreferrer">
                <ListItemAvatar src={item.avatar} />
                <small>#{number}</small>
                <section>
                    <h6>{item.name}</h6>
                    <p>{item.description.trim()}</p>
                </section>
                <label className={item.type}>{item.type}</label>
            </a>
        </ListItem>
    );
}
