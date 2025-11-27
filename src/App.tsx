import { useState, useCallback } from 'react';
import { useGitHubSearch } from './hooks/useGitHubSearch';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import ActivityFeed from './components/ActivityFeed';
import ErrorBanner from './components/ErrorBanner';
import Loader from './components/Loader';
import type { SortOption } from './types/github';

function App() {
  const {
    user,
    repositories,
    activities,
    loading,
    error,
    pagination,
    searchUser,
    loadRepositories,
    clearError,
  } = useGitHubSearch();

  const [currentSort, setCurrentSort] = useState<SortOption>('updated');

  const handleSearch = useCallback(
    async (username: string) => {
      await searchUser(username);
      setCurrentSort('updated');
    },
    [searchUser]
  );

  const handleSortChange = useCallback(
    async (sort: SortOption) => {
      setCurrentSort(sort);
      await loadRepositories(1, sort);
    },
    [loadRepositories]
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      await loadRepositories(page, currentSort);
    },
    [loadRepositories, currentSort]
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              GitHub Profile Viewer
            </h1>
            <p className='text-lg text-gray-600'>
              Discover GitHub profiles, repositories, and recent activities
            </p>
          </div>

          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </header>

      {/* Main content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Error banner */}
        {error && (
          <ErrorBanner error={error} onDismiss={clearError} className='mb-6' />
        )}

        {/* Loading state */}
        {loading && !user && (
          <div className='text-center py-12'>
            <Loader size='lg' />
            <p className='mt-4 text-gray-600 text-lg'>Searching for user...</p>
          </div>
        )}

        {/* User profile and content */}
        {user && (
          <div className='space-y-8'>
            {/* Profile card */}
            <ProfileCard user={user} />

            {/* Two-column layout for larger screens */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Repositories - takes up 2 columns on large screens */}
              <div className='lg:col-span-2'>
                <RepoList
                  repositories={repositories}
                  loading={loading}
                  currentSort={currentSort}
                  onSortChange={handleSortChange}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>

              {/* Activity feed - takes up 1 column on large screens */}
              <div className='lg:col-span-1'>
                <ActivityFeed activities={activities} loading={loading} />
              </div>
            </div>
          </div>
        )}

        {/* Welcome state */}
        {!user && !loading && !error && (
          <div className='text-center py-16'>
            <div className='mb-8'>
              <svg
                className='w-24 h-24 mx-auto text-gray-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Welcome to GitHub Profile Viewer
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Enter a GitHub username above to explore their profile,
              repositories, and recent activities. Try searching for popular
              users like{' '}
              <button
                onClick={() => handleSearch('Nayem707')}
                className='text-blue-600 hover:text-blue-800 underline'
              >
                Nayem707
              </button>
              {', '}
              <button
                onClick={() => handleSearch('torvalds')}
                className='text-blue-600 hover:text-blue-800 underline'
              >
                torvalds
              </button>
              {', '}
              <button
                onClick={() => handleSearch('gaearon')}
                className='text-blue-600 hover:text-blue-800 underline'
              >
                gaearon
              </button>
              {', or '}
              <button
                onClick={() => handleSearch('octocat')}
                className='text-blue-600 hover:text-blue-800 underline'
              >
                octocat
              </button>
              .
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200 mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center text-gray-600'>
            <p className='mb-2'>
              Built with React, TypeScript, Vite, and Tailwind CSS
            </p>
            <p className='text-sm'>
              Powered by the{' '}
              <a
                href='https://docs.github.com/en/rest'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:text-blue-800 underline'
              >
                GitHub REST API
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
