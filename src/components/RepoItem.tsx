import React from 'react';
import type { GitHubRepository } from '../types/github';
import {
  formatRelativeTime,
  formatNumber,
  getLanguageColor,
} from '../utils/helpers';

interface RepoItemProps {
  repository: GitHubRepository;
  className?: string;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, className = '' }) => {
  const handleRepoClick = () => {
    window.open(repository.html_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer ${className}`}
      onClick={handleRepoClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRepoClick();
        }
      }}
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-3'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate'>
            {repository.name}
          </h3>
          <p className='text-sm text-gray-500 truncate'>
            {repository.full_name}
          </p>
        </div>

        {/* External link icon */}
        <svg
          className='w-5 h-5 text-gray-400 flex-shrink-0 ml-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      </div>

      {/* Description */}
      {repository.description && (
        <p className='text-gray-700 text-sm mb-4 leading-relaxed line-clamp-2'>
          {repository.description}
        </p>
      )}

      {/* Stats and language */}
      <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600'>
        {repository.language && (
          <div className='flex items-center'>
            <span
              className='w-3 h-3 rounded-full mr-2'
              style={{ backgroundColor: getLanguageColor(repository.language) }}
              aria-hidden='true'
            />
            <span>{repository.language}</span>
          </div>
        )}

        {repository.stargazers_count > 0 && (
          <div className='flex items-center'>
            <svg
              className='w-4 h-4 mr-1 text-yellow-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            <span>{formatNumber(repository.stargazers_count)}</span>
          </div>
        )}

        {repository.forks_count > 0 && (
          <div className='flex items-center'>
            <svg
              className='w-4 h-4 mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
        )}

        <div className='flex items-center ml-auto'>
          <span className='text-xs'>
            Updated {formatRelativeTime(repository.updated_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
