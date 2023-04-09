import styled from 'styled-components';
import { type ListPropsType } from './@types/ListPropsType';

export const List = styled.ul`
    display: block;
    background: #fff;
    z-index: 2;
    max-height: 380px;
    overflow: hidden;
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: -1px;

    transition: 0.4s height;

    //opacity: ${({ isActive }: ListPropsType) => (isActive ? 1 : 0)};

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
