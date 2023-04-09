import styled from 'styled-components';
import { type ListPropsType } from './@types/ListPropsType';

export const ListWrapper = styled.div`
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: -1px;
    opacity: ${({ isActive }: ListPropsType) => (isActive ? 1 : 0)};
    box-shadow: 0 5px 45px 40px rgba(255, 255, 255, 1);
    transition: 0.2s opacity;

    > footer {
        background: #fff;
        border: 1px solid #aaa;
        padding: 0.5rem 1rem;
        color: #999;
        text-align: right;
        font-size: 13px;
        margin-top: -2px;
        position: relative;
        z-index: 6;

        &.error {
            background-color: #c80900;
            border-color: #c80900;
            color: #fff;
        }
    }
`;

export const List = styled.ul`
    display: block;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(2px);
    max-height: ${({ isActive }: ListPropsType) => (isActive ? '380px' : 0)};
    overflow: hidden;
    overflow-y: scroll;
    transition: max-height 0.15s ease-out;

    scrollbar-width: thin;

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
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
