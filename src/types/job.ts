export type JobStatus = 'pending' | 'interview' | 'rejected' | 'accepted';

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  appliedDate: Date;
  notes: string;
  nextFollowUp?: Date;
}