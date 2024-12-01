import React from 'react';
import { BarChart3, BriefcaseIcon, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '../types/job';

interface DashboardProps {
  jobs: Job[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard({ jobs }: DashboardProps) {
  const stats = {
    total: jobs.length,
    pending: jobs.filter(job => job.status === 'pending').length,
    interview: jobs.filter(job => job.status === 'interview').length,
    accepted: jobs.filter(job => job.status === 'accepted').length,
    rejected: jobs.filter(job => job.status === 'rejected').length,
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
    >
      <motion.div variants={item} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <BriefcaseIcon className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <p className="text-gray-600">Total</p>
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              {stats.total}
            </motion.h3>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <p className="text-gray-600">Pending</p>
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              {stats.pending}
            </motion.h3>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
          <div>
            <p className="text-gray-600">Interviews</p>
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              {stats.interview}
            </motion.h3>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-gray-600">Accepted</p>
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              {stats.accepted}
            </motion.h3>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center">
          <XCircle className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <p className="text-gray-600">Rejected</p>
            <motion.h3 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              {stats.rejected}
            </motion.h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}