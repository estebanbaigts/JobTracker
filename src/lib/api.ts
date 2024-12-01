import axios from 'axios';
import { Job, JobStatus } from '../types/job';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (email: string, password: string, name: string) => {
    const { data } = await api.post('/register', { email, password, name });
    localStorage.setItem('token', data.token);
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  }
};

export const jobs = {
  getAll: async () => {
    const { data } = await api.get<Job[]>('/jobs');
    return data.map(job => ({
      ...job,
      appliedDate: new Date(job.appliedDate)
    }));
  },

  create: async (job: Omit<Job, 'id'>) => {
    const { data } = await api.post<Job>('/jobs', job);
    return {
      ...data,
      appliedDate: new Date(data.appliedDate)
    };
  },

  updateStatus: async (id: string, status: JobStatus) => {
    const { data } = await api.patch<Job>(`/jobs/${id}`, { status });
    return {
      ...data,
      appliedDate: new Date(data.appliedDate)
    };
  },

  delete: async (id: string) => {
    await api.delete(`/jobs/${id}`);
  }
};