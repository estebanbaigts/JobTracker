import React from 'react';
import { format } from 'date-fns';
import { Building2, Calendar, MessageCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: Job['status']) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-green-100 text-green-800',
};

export function JobCard({ job, onStatusChange, onDelete }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.position}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{job.company}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={job.status}
            onChange={(e) => onStatusChange(job.id, e.target.value as Job['status'])}
            className={`${statusColors[job.status]} px-3 py-1 rounded-full text-sm font-medium cursor-pointer`}
          >
            <option value="pending">In Progress</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
            <option value="accepted">Accepted</option>
          </select>
          {job.status === 'rejected' && (
            <button
              onClick={() => onDelete(job.id)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              title="Delete application"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center text-gray-600 mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Applied: {format(job.appliedDate, 'MMM d, yyyy')}</span>
      </div>
      
      {job.notes && (
        <div className="mt-4 bg-gray-50 rounded-md p-3">
          <div className="flex items-center text-gray-600 mb-2">
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="font-medium">Notes</span>
          </div>
          <p className="text-gray-700">{job.notes}</p>
        </div>
      )}
    </motion.div>
  );
}