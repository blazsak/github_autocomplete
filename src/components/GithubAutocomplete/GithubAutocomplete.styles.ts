import styled from 'styled-components';

export const GithubAutocompleteWrapper = styled.div`
    width: calc(100% - 20px);
    max-width: 340px;
    margin: 0 auto;
    text-align: left;
    position: relative;
    box-sizing: border-box;

    // sub components style reset in case no normalization or css reset present
    * {
        box-sizing: border-box;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;
