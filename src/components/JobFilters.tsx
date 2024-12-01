import React from 'react';
import { JobStatus } from '../types/job';

interface JobFiltersProps {
  currentFilter: JobStatus | 'all';
  onFilterChange: (filter: JobStatus | 'all') => void;
}

export function JobFilters({ currentFilter, onFilterChange }: JobFiltersProps) {
  const filters: { value: JobStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Applications' },
    { value: 'pending', label: 'In Progress' },
    { value: 'interview', label: 'Interview' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentFilter === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}