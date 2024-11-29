import React, { useState } from 'react';
import { Job } from './types/job';
import { Dashboard } from './components/Dashboard';
import { JobForm } from './components/JobForm';
import { JobCard } from './components/JobCard';
import { BriefcaseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleAddJob = (newJob: Omit<Job, 'id'>) => {
    const job: Job = {
      ...newJob,
      id: crypto.randomUUID(),
    };
    setJobs([job, ...jobs]);
  };

  const handleStatusChange = (id: string, status: Job['status']) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status } : job
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Job Tracker
            </h1>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard jobs={jobs} />
        <JobForm onSubmit={handleAddJob} />
        
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {jobs.map(job => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard
                  job={job}
                  onStatusChange={handleStatusChange}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No job applications yet. Start by adding your first application!
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;