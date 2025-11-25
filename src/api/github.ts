import axios, { AxiosError } from 'axios';
import type {
  GitHubUser,
  GitHubRepository,
  ApiError,
  GitHubActivity,
} from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Add authorization header if token is available
const token = import.meta.env.VITE_GITHUB_TOKEN;
if (token) {
  api.defaults.headers.common['Authorization'] = `token ${token}`;
}

/**
 * Handle API errors and convert them to a standardized format
 */
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    const status = error.response.status;
    let message = 'An error occurred';

    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 403:
        message =
          'API rate limit exceeded. Please add a GitHub token or try again later.';
        break;
      case 422:
        message = 'Invalid request. Please check the username.';
        break;
      default:
        message = (error.response.data as any)?.message || 'An error occurred';
    }

    return { message, status };
  }

  if (error.request) {
    return { message: 'Network error. Please check your connection.' };
  }

  return { message: error.message || 'An unexpected error occurred' };
};

/**
 * Fetch GitHub user profile information
 */
export const fetchUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await api.get<GitHubUser>(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Fetch user's public repositories with pagination and sorting
 */
export const fetchUserRepositories = async (
  username: string,
  page = 1,
  perPage = 10,
  sort: 'updated' | 'created' | 'pushed' | 'full_name' = 'updated'
): Promise<{ repositories: GitHubRepository[]; totalCount: number }> => {
  try {
    // First, get the user to know total public repos
    const userResponse = await api.get<GitHubUser>(`/users/${username}`);
    const totalCount = userResponse.data.public_repos;

    // Then fetch repositories
    const response = await api.get<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        params: {
          page,
          per_page: perPage,
          sort,
          type: 'public',
        },
      }
    );

    return {
      repositories: response.data,
      totalCount,
    };
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Fetch user's recent public activities
 */
export const fetchUserActivities = async (
  username: string,
  page = 1,
  perPage = 30
): Promise<GitHubActivity[]> => {
  try {
    const response = await api.get<GitHubActivity[]>(
      `/users/${username}/events/public`,
      {
        params: {
          page,
          per_page: perPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

/**
 * Check API rate limit status
 */
export const checkRateLimit = async () => {
  try {
    const response = await api.get('/rate_limit');
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export default api;
