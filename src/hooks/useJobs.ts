import { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types/job';
import { jobs } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export function useJobs() {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchJobs = async () => {
      try {
        const data = await jobs.getAll();
        setJobList(data.sort((a, b) => 
          b.appliedDate.getTime() - a.appliedDate.getTime()
        ));
      } catch (error) {
        toast.error('Failed to fetch jobs');
        console.error(error);
      }
    };

    fetchJobs();
  }, [user]);

  const filteredJobs = jobList.filter(job => 
    filter === 'all' ? true : job.status === filter
  );

  const addJob = async (newJob: Omit<Job, 'id'>) => {
    if (!user) return;

    try {
      const job = await jobs.create(newJob);
      setJobList(prev => [job, ...prev]);
      toast.success('Application added successfully');
    } catch (error) {
      toast.error('Failed to add application');
      console.error(error);
    }
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    try {
      const updatedJob = await jobs.updateStatus(id, status);
      setJobList(prev => prev.map(job => 
        job.id === id ? updatedJob : job
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await jobs.delete(id);
      setJobList(prev => prev.filter(job => job.id !== id));
      toast.success('Application deleted successfully');
    } catch (error) {
      toast.error('Failed to delete application');
      console.error(error);
    }
  };

  return { 
    jobs: filteredJobs, 
    addJob, 
    updateJobStatus, 
    deleteJob,
    filter,
    setFilter
  };
}