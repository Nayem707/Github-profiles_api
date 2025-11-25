export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

export type SortOption = 'stars' | 'updated' | 'name';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalCount: number;
}

export interface SearchState {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  loading: boolean;
  error: ApiError | null;
  pagination: PaginationInfo;
}

export interface GitHubActivity {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  public: boolean;
  created_at: string;
}
