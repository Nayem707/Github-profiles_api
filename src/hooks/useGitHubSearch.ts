import { useState, useCallback } from 'react';
import type {
  GitHubUser,
  GitHubRepository,
  ApiError,
  SortOption,
  PaginationInfo,
  GitHubActivity,
} from '../types/github';

import {
  fetchUser,
  fetchUserRepositories,
  fetchUserActivities,
} from '../api/github';

interface UseGitHubSearchResult {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  activities: GitHubActivity[];
  loading: boolean;
  error: ApiError | null;
  pagination: PaginationInfo;
  searchUser: (username: string) => Promise<void>;
  loadRepositories: (page?: number, sort?: SortOption) => Promise<void>;
  loadActivities: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const REPOS_PER_PAGE = 10;

export const useGitHubSearch = (): UseGitHubSearchResult => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 0,
    perPage: REPOS_PER_PAGE,
    totalCount: 0,
  });

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    setRepositories([]);
    setActivities([]);
    setError(null);
    setPagination({
      currentPage: 1,
      totalPages: 0,
      perPage: REPOS_PER_PAGE,
      totalCount: 0,
    });
  }, []);

  // Helper function to load repositories for a specific user
  const loadReposForUser = async (
    username: string,
    page = 1,
    sort: SortOption = 'updated'
  ) => {
    const sortParam =
      sort === 'stars' ? 'updated' : sort === 'name' ? 'full_name' : 'updated';

    const { repositories: repos, totalCount } = await fetchUserRepositories(
      username,
      page,
      REPOS_PER_PAGE,
      sortParam as 'updated' | 'created' | 'pushed' | 'full_name'
    );

    // Client-side sorting for stars since GitHub API doesn't support it
    const sortedRepos = [...repos];
    if (sort === 'stars') {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sort === 'name') {
      sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
      repositories: sortedRepos,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / REPOS_PER_PAGE),
        perPage: REPOS_PER_PAGE,
        totalCount,
      },
    };
  };

  // Helper function to load activities for a specific user
  const loadActivitiesForUser = async (username: string) => {
    return await fetchUserActivities(username);
  };

  const searchUser = useCallback(
    async (username: string) => {
      if (!username.trim()) {
        setError({ message: 'Please enter a valid username' });
        return;
      }

      setLoading(true);
      setError(null);
      reset();

      try {
        const userData = await fetchUser(username);
        setUser(userData);

        // Load repos and activities in parallel with the fetched user data
        const [reposResult, activitiesResult] = await Promise.allSettled([
          loadReposForUser(userData.login, 1, 'updated'),
          loadActivitiesForUser(userData.login),
        ]);

        if (reposResult.status === 'fulfilled') {
          setRepositories(reposResult.value.repositories);
          setPagination(reposResult.value.pagination);
        }

        if (activitiesResult.status === 'fulfilled') {
          setActivities(activitiesResult.value);
        }
      } catch (err) {
        setError(err as ApiError);
        setUser(null);
        setRepositories([]);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    },
    [reset]
  );

  const loadRepositories = useCallback(
    async (page = 1, sort: SortOption = 'updated') => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const result = await loadReposForUser(user.login, page, sort);
        setRepositories(result.repositories);
        setPagination(result.pagination);
      } catch (err) {
        setError(err as ApiError);
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const loadActivities = useCallback(async () => {
    if (!user) return;

    try {
      const activityData = await loadActivitiesForUser(user.login);
      setActivities(activityData);
    } catch (err) {
      console.warn('Failed to load activities:', err);
      setActivities([]);
    }
  }, [user]);

  return {
    user,
    repositories,
    activities,
    loading,
    error,
    pagination,
    searchUser,
    loadRepositories,
    loadActivities,
    clearError,
    reset,
  };
};
