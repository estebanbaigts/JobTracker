import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job, JobStatus } from '../types/job';

interface JobFormProps {
  onSubmit: (job: Omit<Job, 'id'>) => void;
}

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } }
};

export function JobForm({ onSubmit }: JobFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'pending' as JobStatus,
    notes: '',
    appliedDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      appliedDate: new Date(formData.appliedDate),
    });
    setFormData({
      company: '',
      position: '',
      status: 'pending',
      notes: '',
      appliedDate: new Date().toISOString().split('T')[0],
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Application
          </motion.button>
        ) : (
          <motion.form
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.appliedDate}
                  onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </motion.div>

              <motion.div
                className="md:col-span-2"
                variants={inputVariants}
                whileFocus="focus"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex justify-end space-x-4"
            >
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200"
              >
                Save Application
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}