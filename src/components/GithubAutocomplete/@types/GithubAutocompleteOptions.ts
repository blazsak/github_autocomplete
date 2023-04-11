export declare type GithubAutocompleteOptionsOptional = {
    debounce?: number;
    minSearchLength?: number;
    maxResults?: number;
};
// make options required
export declare type GithubAutocompleteOptions = {
    [Property in keyof GithubAutocompleteOptionsOptional]-?: GithubAutocompleteOptionsOptional[Property];
};
