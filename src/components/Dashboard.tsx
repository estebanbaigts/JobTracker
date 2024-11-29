import React from 'react';
import { BarChart3, BriefcaseIcon, Clock, CheckCircle2, X} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Job } from '../types/job';
import { AnimatedCounter } from './AnimatedCounter';

interface DashboardProps {
  jobs: Job[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  delay 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: number; 
  color: string;
  delay: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-20 mr-4`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <h3 className="text-2xl font-bold">
            <AnimatedCounter value={value} />
          </h3>
        </div>
      </div>
      <motion.div
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          className={`h-full ${color} bg-opacity-50`}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Dashboard({ jobs }: DashboardProps) {
  const stats = {
    total: jobs.length,
    pending: jobs.filter(job => job.status === 'pending').length,
    accepted: jobs.filter(job => job.status === 'accepted').length,
    rejected: jobs.filter(job => job.status === 'rejected').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={BriefcaseIcon}
        label="Total Applications"
        value={stats.total}
        color="text-blue-500"
        delay={0}
      />
      <StatCard
        icon={Clock}
        label="Pending"
        value={stats.pending}
        color="text-yellow-500"
        delay={0.2}
      />
      <StatCard
        icon={CheckCircle2}
        label="Accepted"
        value={stats.accepted}
        color="text-green-500"
        delay={0.6}
      />
      <StatCard
        icon={X}
        label="Rejected"
        value={stats.rejected}
        color="text-red-500"
        delay={0.6}
      />
    </div>
  );
}