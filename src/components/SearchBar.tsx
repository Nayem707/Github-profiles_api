import React, { useState, useCallback, memo } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ onSearch, loading = false, className = '' }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
          onSearch(username.trim());
        }
      },
      [username, onSearch]
    );

    const sampleUsers = ['torvalds', 'gaearon', 'octocat', 'sindresorhus'];

    const handleSampleUser = useCallback(
      (user: string) => {
        setUsername(user);
        onSearch(user);
      },
      [onSearch]
    );

    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <form onSubmit={handleSubmit} className='mb-4'>
          <div className='flex flex-col sm:flex-row gap-3'>
            <div className='flex-1'>
              <label htmlFor='username' className='sr-only'>
                GitHub Username
              </label>
              <input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter GitHub username...'
                className='w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed'
                disabled={loading}
                autoComplete='off'
              />
            </div>
            <button
              type='submit'
              disabled={loading || !username.trim()}
              className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Sample users */}
        <div className='text-center'>
          <p className='text-sm text-gray-600 mb-2'>Try these sample users:</p>
          <div className='flex flex-wrap justify-center gap-2'>
            {sampleUsers.map((user) => (
              <button
                key={user}
                onClick={() => handleSampleUser(user)}
                disabled={loading}
                className='px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default SearchBar;
