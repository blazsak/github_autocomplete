import {
    type SimplifiedGitHubApiRepositoryInterface,
    type SimplifiedGitHubApiUserInterface,
} from '../@interfaces/GitHubResponseInterfaces';
export const STUB_USER: SimplifiedGitHubApiUserInterface = {
    id: 1,
    login: 'Test user item',
    avatar_url: '',
    html_url: '',
};

export const STUB_LIST_REPO: SimplifiedGitHubApiRepositoryInterface[] = [
    {
        id: 1,
        html_url: '',
        name: 'Test item 1',
        description: 'Test description 1',
        language: 'Javascript',
        stargazers_count: 235,
        owner: STUB_USER,
    },
    {
        id: 2,
        html_url: '',
        name: 'Test item 2',
        description: 'Test description 2',
        language: 'Javascript',
        stargazers_count: 5,
        owner: STUB_USER,
    },
    {
        id: 3,
        html_url: '',
        name: 'Test item 3',
        description: 'Test description 3',
        language: 'Javascript',
        stargazers_count: 0,
        owner: STUB_USER,
    },
];
export const STUB_LIST_USER: SimplifiedGitHubApiUserInterface[] = [
    {
        id: 1,
        login: 'Test user 1',
        avatar_url: '',
        html_url: '',
    },
    {
        id: 2,
        login: 'Test user 2',
        avatar_url: '',
        html_url: '',
    },
    {
        id: 3,
        login: 'Test user 3',
        avatar_url: '',
        html_url: '',
    },
];
