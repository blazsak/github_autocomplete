import React, { useEffect, useRef } from 'react';
import { GithubAutocompleteListItem } from './Item';

import { List, ListWrapper } from './List.style';
import { type ListItemType } from './Item/@types/ListItemType';

export function GithubAutocompleteList({
    items,
    isActive,
    children,
    selected,
    hasError = false,
}: {
    items: ListItemType[];
    isActive: boolean;
    children?: React.ReactNode;
    selected?: ListItemType;
    hasError?: boolean;
}): JSX.Element {
    const listRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (selected != null) {
            const index = items.findIndex((i) => i.id === selected.id);
            const item = listRef.current?.getElementsByTagName('li')?.[index];
            item?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selected, listRef]);
    return (
        <ListWrapper isActive={isActive}>
            <List isActive={isActive} ref={listRef}>
                {items.map((item: ListItemType, index: number) => (
                    <GithubAutocompleteListItem
                        key={item.id}
                        item={item}
                        number={index + 1}
                        isSelected={selected?.id === item.id}
                    />
                ))}
            </List>
            {children !== undefined && isActive && (
                <footer className={hasError ? 'error' : ''}>{children}</footer>
            )}
        </ListWrapper>
    );
}
