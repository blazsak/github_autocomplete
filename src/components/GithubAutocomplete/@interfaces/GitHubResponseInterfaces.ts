export interface GitHubApiRepositorySearchResponseInterface {
    total_count: number;
    items: SimplifiedGitHubApiRepositoryInterface[];
}
export interface GitHubApiRepositorySearchUserInterface {
    total_count: number;
    items: SimplifiedGitHubApiUserInterface[];
}

export interface SimplifiedGitHubApiUserInterface {
    login: string;
    id: number;
    avatar_url: string;
}
export interface SimplifiedGitHubApiRepositoryInterface {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    owner: {
        login: string;
        id: number;
        avatar_url: string;
    };
}
