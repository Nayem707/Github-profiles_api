import React from 'react';
import type { GitHubUser } from '../types/github';
import { formatDate, formatNumber } from '../utils/helpers';

interface ProfileCardProps {
  user: GitHubUser;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, className = '' }) => {
  const handleLinkClick = (url: string) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      window.open(`https://${url}`, '_blank', 'noopener,noreferrer');
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow border border-gray-200 p-6 ${className}`}
    >
      <div className='flex flex-col sm:flex-row items-start gap-6'>
        {/* Avatar */}
        <div className='flex-shrink-0'>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-100'
          />
        </div>

        {/* User info */}
        <div className='flex-1 min-w-0'>
          <div className='mb-4'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-1'>
              {user.name || user.login}
            </h1>
            <p className='text-lg text-gray-600'>@{user.login}</p>
            {user.bio && (
              <p className='text-gray-700 mt-3 leading-relaxed'>{user.bio}</p>
            )}
          </div>

          {/* Additional info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
            {user.company && (
              <div className='flex items-center text-gray-600'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z'
                    clipRule='evenodd'
                  />
                </svg>
                {user.company}
              </div>
            )}

            {user.location && (
              <div className='flex items-center text-gray-600'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                </svg>
                {user.location}
              </div>
            )}

            {user.blog && (
              <div className='flex items-center text-gray-600'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z'
                    clipRule='evenodd'
                  />
                </svg>
                <button
                  onClick={() => user.blog && handleLinkClick(user.blog)}
                  className='text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline'
                >
                  {user.blog}
                </button>
              </div>
            )}

            <div className='flex items-center text-gray-600'>
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
              Joined {formatDate(user.created_at)}
            </div>
          </div>
          {/* View on GitHub button */}
          <div className='mt-4'>
            <button
              onClick={() =>
                window.open(user.html_url, '_blank', 'noopener,noreferrer')
              }
              className='w-full sm:w-auto cursor-pointer px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200'
            >
              View on GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='mt-6 pt-6 border-t border-gray-200'>
        <div className='grid grid-cols-3 gap-4 text-center'>
          <div>
            <div className='text-2xl font-bold text-gray-900'>
              {formatNumber(user.public_repos)}
            </div>
            <div className='text-sm text-gray-600'>Repositories</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-gray-900'>
              {formatNumber(user.followers)}
            </div>
            <div className='text-sm text-gray-600'>Followers</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-gray-900'>
              {formatNumber(user.following)}
            </div>
            <div className='text-sm text-gray-600'>Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
