import styled, { css } from 'styled-components';
import { type InputIconPropsType } from './@types/InputIconPropsType';

export const GithubAutocompleteStyles = styled.div`
    width: calc(100% - 20px);
    max-width: 340px;
    margin: 0 auto;
    text-align: left;
    position: relative;
`;

export const Input = styled.input`
    background: #fff;
    border: 1px solid #bbb;
    line-height: 1.1;
    outline: none;
    width: 100%;
    padding: 1rem 40px 1rem 40px;
    transition: 0.3s border-color;

    &:focus {
        border-color: #2196f3;
    }
`;

export const InputIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    transition: 0.3s;

    ${({ active }: InputIconPropsType) =>
        active === true
            ? css`
                  opacity: 1;
                  visibility: visible;
              `
            : css`
                  opacity: 0;
                  visibility: hidden;
              `};

    ${({ right }: InputIconPropsType) =>
        right === true
            ? css`
                  right: 10px;
              `
            : css`
                  left: 10px;
              `}

    svg {
        color: #999;
        width: 20px;
        height: 20px;
    }
`;
export const InputLabel = styled.div`
    margin-bottom: 10px;
    display: block;
    cursor: pointer;
`;
export const InputWrapper = styled.div`
    position: relative;
    z-index: 5;
`;
