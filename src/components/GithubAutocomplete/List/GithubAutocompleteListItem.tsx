import React from 'react';
import styled from 'styled-components';

export default function GithubAutocompleteListItem({
    number = 0,
}: {
    number: number;
}): JSX.Element {
    return (
        <ListItem>
            <span>#{number}</span>
            List item #{number}
        </ListItem>
    );
}

const ListItem = styled.li`
    display: block;
    padding: 1rem;
    position: relative;

    > span {
        position: absolute;
        top: 0;
        right: 0;
        background: #fafafa;
        color: #aaa;
        font-size: 11px;
        padding: 3px 7px;
    }

    + li {
        border-top: 1px solid #dadada;
    }
`;
