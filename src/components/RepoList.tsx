import React from 'react';
import type {
  GitHubRepository,
  SortOption,
  PaginationInfo,
} from '../types/github';
import RepoItem from './RepoItem';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';
import Loader from './Loader';

interface RepoListProps {
  repositories: GitHubRepository[];
  loading?: boolean;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  className?: string;
}

const RepoList: React.FC<RepoListProps> = ({
  repositories,
  loading = false,
  currentSort,
  onSortChange,
  pagination,
  onPageChange,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Loader size='lg' />
        <p className='mt-4 text-gray-600'>Loading repositories...</p>
      </div>
    );
  }

  if (!repositories.length) {
    return (
      <div
        className={`text-center py-12 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
      >
        <div className='text-gray-400 mb-4'>
          <svg
            className='w-16 h-16 mx-auto mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>
          No repositories found
        </h3>
        <p className='text-gray-600'>
          This user doesn't have any public repositories.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header with sort controls */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Public Repositories
          </h2>
          <p className='text-gray-600 text-sm'>
            {pagination.totalCount} repositories
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Sort by:</span>
          <SortDropdown
            currentSort={currentSort}
            onSortChange={onSortChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* Repository grid */}
      <div className='grid gap-4 mb-8'>
        {repositories.map((repo) => (
          <RepoItem key={repo.id} repository={repo} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
          disabled={loading}
        />
      )}
    </div>
  );
};

export default RepoList;
