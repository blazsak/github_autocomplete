import React from 'react';
import GithubAutocompleteListItem from './GithubAutocompleteListItem';
import styled from 'styled-components';

export default function GithubAutocompleteList({
    number = 2,
}: {
    number: number;
}): JSX.Element {
    return (
        <List>
            {[...Array(number).keys()].map((i: number) => (
                <GithubAutocompleteListItem key={i} number={i + 1} />
            ))}
        </List>
    );
}

const List = styled.ul`
    display: block;
    background: #fff;
    margin-top: 2px;
    border: 1px solid #dadada;
    max-height: 380px;
    overflow: hidden;
    overflow-y: scroll;

    scrollbar-width: thin;

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #dadada;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #999;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #484848;
    }

    &:focus {
        background: #dadada;
    }
`;
