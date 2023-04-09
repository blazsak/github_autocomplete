import styled from 'styled-components';

export const ListItem = styled.li`
    display: block;
    padding: 1rem;
    position: relative;
    border: 1px solid #aaa;
    margin-left: 25px;
    background: #fff;

    > span {
        position: absolute;
        top: 0;
        right: 0;
        background: #efefef;
        color: #aaa;
        font-size: 11px;
        padding: 3px 7px;
    }

    ::before {
        position: absolute;
        content: '';
        width: 15px;
        height: calc(100% + 2px);
        left: -15px;
        top: -50%;
        border-left: 1px dotted #ccc;
        border-bottom: 1px dotted #ccc;
    }

    + li {
        border-top: 0;
    }
`;
