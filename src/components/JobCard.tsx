import React from 'react';
import { format } from 'date-fns';
import { Building2, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: Job['status']) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800',
};

export function JobCard({ job, onStatusChange }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      />

      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <motion.h3
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-xl font-semibold text-gray-900"
            >
              {job.position}
            </motion.h3>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center text-gray-600 mt-1"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span>{job.company}</span>
            </motion.div>
          </div>

          <motion.select
            whileTap={{ scale: 0.95 }}
            value={job.status}
            onChange={(e) => onStatusChange(job.id, e.target.value as Job['status'])}
            className={`${statusColors[job.status]} px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200`}
          >
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </motion.select>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center text-gray-600 mb-2"
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>Applied: {format(job.appliedDate, 'MMM d, yyyy')}</span>
        </motion.div>

        {job.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 bg-gray-50 rounded-md p-3"
          >
            <div className="flex items-center text-gray-600 mb-2">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span className="font-medium">Notes</span>
            </div>
            <p className="text-gray-700">{job.notes}</p>
          </motion.div>
        )}

        {job.nextFollowUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-blue-600"
          >
            Next follow-up: {format(job.nextFollowUp, 'MMM d, yyyy')}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}