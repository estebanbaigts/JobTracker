import React from 'react';
import { BriefcaseIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BriefcaseIcon className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
          </div>
          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}