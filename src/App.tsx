import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { JobForm } from './components/JobForm';
import { JobCard } from './components/JobCard';
import { JobFilters } from './components/JobFilters';
import { NotFound } from './components/NotFound';
import { useJobs } from './hooks/useJobs';
import { LogOut } from 'lucide-react';

function JobTracker() {
  const { user, logout } = useAuth();
  const { jobs, addJob, updateJobStatus, deleteJob, filter, setFilter } = useJobs();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard jobs={jobs} />
        <JobForm onSubmit={addJob} />
        <JobFilters currentFilter={filter} onFilterChange={setFilter} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onStatusChange={updateJobStatus}
              onDelete={deleteJob}
            />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No job applications found. {filter !== 'all' ? 'Try changing the filter or ' : ''}Start by adding your first application!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <JobTracker /> : <Login />;
}

export default App;