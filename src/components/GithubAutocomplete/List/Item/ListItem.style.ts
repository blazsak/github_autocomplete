import styled from 'styled-components';

export const ListItem = styled.li`
    padding: 0.25rem;
    position: relative;
    border: 1px solid #aaa;
    margin-left: 25px;
    z-index: 1;
    background: #fff;

    &:hover,
    &.selected {
        background-color: #475569;
        color: white;
        border-color: #475569;
        z-index: 2;
        small {
            background-color: #273549;
        }
    }

    a {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    small {
        position: absolute;
        top: 0;
        right: 0;
        background: #efefef;
        color: #aaa;
        font-size: 11px;
        padding: 3px 7px;
    }
    section {
        width: calc(100% - 75px);
        h6 {
            font-size: 16px;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap;

            overflow: hidden;
            display: block;
        }
        p {
            font-size: 12px;
            text-overflow: ellipsis;
            color: #999;

            padding-right: 2em;

            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;

            height: 3em;
        }
    }
    label {
        display: inline-block;
        position: absolute;
        bottom: 1px;
        left: 2px;
        background-color: #475569;
        font-size: 8px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: white;
        padding: 0.2em 1em;
        overflow: hidden;

        &.user {
            background-color: #c2410c;
        }
    }

    ::before {
        position: absolute;
        content: '';
        width: 13px;
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
