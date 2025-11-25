import React from 'react';
import type { GitHubActivity } from '../types/github';
import { formatRelativeTime } from '../utils/helpers';

interface ActivityFeedProps {
  activities: GitHubActivity[];
  loading?: boolean;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  loading = false,
  className = '',
}) => {
  const getActivityDescription = (activity: GitHubActivity): string => {
    const { type, payload } = activity;

    switch (type) {
      case 'PushEvent':
        const commitCount = payload?.commits?.length || 0;
        return `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to`;
      case 'CreateEvent':
        const refType = payload?.ref_type;
        if (refType === 'repository') return 'Created repository';
        if (refType === 'branch') return `Created branch ${payload?.ref} in`;
        if (refType === 'tag') return `Created tag ${payload?.ref} in`;
        return 'Created';
      case 'DeleteEvent':
        const deleteRefType = payload?.ref_type;
        return `Deleted ${deleteRefType} ${payload?.ref} from`;
      case 'ForkEvent':
        return 'Forked';
      case 'IssuesEvent':
        return `${
          payload?.action === 'opened'
            ? 'Opened'
            : payload?.action === 'closed'
            ? 'Closed'
            : 'Updated'
        } issue in`;
      case 'IssueCommentEvent':
        return 'Commented on issue in';
      case 'PullRequestEvent':
        return `${
          payload?.action === 'opened'
            ? 'Opened'
            : payload?.action === 'closed'
            ? 'Closed'
            : 'Updated'
        } pull request in`;
      case 'PullRequestReviewEvent':
        return 'Reviewed pull request in';
      case 'WatchEvent':
        return 'Starred';
      case 'ReleaseEvent':
        return `Published release ${payload?.release?.tag_name} in`;
      default:
        return `${type.replace('Event', '')} in`;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'CreateEvent':
      case 'ForkEvent':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'IssuesEvent':
      case 'IssueCommentEvent':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'PullRequestEvent':
      case 'PullRequestReviewEvent':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13z'
              clipRule='evenodd'
            />
          </svg>
        );
      case 'WatchEvent':
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        );
      default:
        return (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z'
              clipRule='evenodd'
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}
      >
        <div className='animate-pulse'>
          <div className='h-6 bg-gray-300 rounded w-1/3 mb-4'></div>
          <div className='space-y-3'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center ${className}`}
      >
        <h2 className='text-xl font-bold text-gray-900 mb-2'>
          Recent Activity
        </h2>
        <p className='text-gray-600'>No recent public activity found.</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}
    >
      <h2 className='text-xl font-bold text-gray-900 mb-6'>Recent Activity</h2>

      <div className='space-y-4'>
        {activities.slice(0, 10).map((activity) => (
          <div
            key={activity.id}
            className='flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0'
          >
            <div className='flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600'>
              {getActivityIcon(activity.type)}
            </div>

            <div className='flex-1 min-w-0'>
              <p className='text-sm text-gray-900'>
                <span className='font-medium'>
                  {getActivityDescription(activity)}
                </span>
                {activity.repo && (
                  <>
                    <button
                      onClick={() =>
                        window.open(
                          `https://github.com/${activity.repo.name}`,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                      className='text-blue-600 hover:text-blue-800 hover:underline font-medium'
                    >
                      {activity.repo.name}
                    </button>
                  </>
                )}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {formatRelativeTime(activity.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activities.length > 10 && (
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Showing 10 of {activities.length} recent activities
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
