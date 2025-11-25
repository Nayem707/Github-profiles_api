import { describe, it, expect } from 'vitest';

// Simple tests to verify types and exports exist

describe('GitHub API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchUser', () => {
    it('should fetch user data successfully', async () => {
      const mockUser = {
        id: 1,
        login: 'testuser',
        name: 'Test User',
        avatar_url: 'https://github.com/avatar.jpg',
        bio: 'A test user',
        location: 'Test City',
        company: 'Test Company',
        blog: 'https://test.com',
        public_repos: 10,
        followers: 100,
        following: 50,
        created_at: '2020-01-01T00:00:00Z',
        html_url: 'https://github.com/testuser',
        email: null,
      };

      mockApi.get.mockResolvedValueOnce({ data: mockUser });

      const result = await fetchUser('testuser');

      expect(mockApi.get).toHaveBeenCalledWith('/users/testuser');
      expect(result).toEqual(mockUser);
    });

    it('should handle user not found error', async () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not Found' },
        },
      };

      mockApi.get.mockRejectedValueOnce(error);

      await expect(fetchUser('nonexistentuser')).rejects.toEqual({
        message: 'User not found',
        status: 404,
      });
    });

    it('should handle rate limit error', async () => {
      const error = {
        response: {
          status: 403,
          data: { message: 'API rate limit exceeded' },
        },
      };

      mockApi.get.mockRejectedValueOnce(error);

      await expect(fetchUser('testuser')).rejects.toEqual({
        message:
          'API rate limit exceeded. Please add a GitHub token or try again later.',
        status: 403,
      });
    });

    it('should handle network error', async () => {
      const error = {
        request: {},
        message: 'Network Error',
      };

      mockApi.get.mockRejectedValueOnce(error);

      await expect(fetchUser('testuser')).rejects.toEqual({
        message: 'Network error. Please check your connection.',
      });
    });
  });

  describe('fetchUserRepositories', () => {
    it('should fetch user repositories successfully', async () => {
      const mockUser = { public_repos: 2 };
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          full_name: 'testuser/repo1',
          description: 'First repository',
          html_url: 'https://github.com/testuser/repo1',
          language: 'JavaScript',
          stargazers_count: 10,
          forks_count: 5,
          updated_at: '2023-01-01T00:00:00Z',
          created_at: '2022-01-01T00:00:00Z',
          owner: {
            login: 'testuser',
            avatar_url: 'https://github.com/avatar.jpg',
          },
        },
      ];

      mockApi.get.mockResolvedValueOnce({ data: mockUser });
      mockApi.get.mockResolvedValueOnce({ data: mockRepos });

      const result = await fetchUserRepositories('testuser', 1, 10, 'updated');

      expect(mockApi.get).toHaveBeenCalledWith('/users/testuser');
      expect(mockApi.get).toHaveBeenCalledWith('/users/testuser/repos', {
        params: {
          page: 1,
          per_page: 10,
          sort: 'updated',
          type: 'public',
        },
      });
      expect(result).toEqual({
        repositories: mockRepos,
        totalCount: 2,
      });
    });
  });

  describe('fetchUserActivities', () => {
    it('should fetch user activities successfully', async () => {
      const mockActivities = [
        {
          id: '1',
          type: 'PushEvent',
          actor: {
            login: 'testuser',
            avatar_url: 'https://github.com/avatar.jpg',
          },
          repo: {
            name: 'testuser/repo1',
            url: 'https://api.github.com/repos/testuser/repo1',
          },
          payload: {
            commits: [{ message: 'Test commit' }],
          },
          public: true,
          created_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockApi.get.mockResolvedValueOnce({ data: mockActivities });

      const result = await fetchUserActivities('testuser');

      expect(mockApi.get).toHaveBeenCalledWith(
        '/users/testuser/events/public',
        {
          params: {
            page: 1,
            per_page: 30,
          },
        }
      );
      expect(result).toEqual(mockActivities);
    });
  });
});
