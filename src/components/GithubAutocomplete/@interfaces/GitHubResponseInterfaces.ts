export interface GitHubApiRepositorySearchResponseInterface {
    total_count: number;
    items: SimplifiedGitHubApiRepositoryInterface[];
}
export interface GitHubApiRepositorySearchUserInterface {
    total_count: number;
    items: SimplifiedGitHubApiUserInterface[];
}

export interface SimplifiedGitHubApiUserInterface {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
export interface SimplifiedGitHubApiRepositoryInterface {
    id: number;
    name: string;
    html_url: string;
    description: string;
    language: string;
    stargazers_count: number;
    owner: SimplifiedGitHubApiUserInterface;
}
