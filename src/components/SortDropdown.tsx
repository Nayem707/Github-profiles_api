import React from 'react';
import type { SortOption } from '../types/github';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  disabled?: boolean;
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  currentSort,
  onSortChange,
  disabled = false,
  className = '',
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'updated', label: 'Recently Updated' },
    { value: 'stars', label: 'Most Stars' },
    { value: 'name', label: 'Name (A-Z)' },
  ];

  return (
    <div className={`${className}`}>
      <label htmlFor='sort' className='sr-only'>
        Sort repositories by
      </label>
      <select
        id='sort'
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        disabled={disabled}
        className='px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200'
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
