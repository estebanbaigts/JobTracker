import React from 'react';
import { CheckCircle2, Briefcase, BarChart3, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoginForm } from './LoginForm';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block">Track Your Job Search</span>
                <span className="block text-blue-600">All in One Place</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              >
                Organize your job applications, track interviews, and manage your career journey with our intuitive job tracking platform.
              </motion.p>
            </div>

            <LoginForm />
          </motion.div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-extrabold text-gray-900">
                Everything you need to manage your job search
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Briefcase className="h-6 w-6 text-white" />,
                    title: "Application Tracking",
                    description: "Keep track of all your job applications in one organized dashboard."
                  },
                  {
                    icon: <CheckCircle2 className="h-6 w-6 text-white" />,
                    title: "Status Updates",
                    description: "Update and monitor the status of each application as you progress."
                  },
                  {
                    icon: <BarChart3 className="h-6 w-6 text-white" />,
                    title: "Analytics",
                    description: "Visualize your job search progress with intuitive statistics."
                  },
                  {
                    icon: <Shield className="h-6 w-6 text-white" />,
                    title: "Secure Storage",
                    description: "Your data is securely stored and accessible from anywhere."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={item}
                    className="pt-6"
                  >
                    <div className="flow-root rounded-lg px-6 pb-8">
                      <div className="-mt-6">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center justify-center rounded-md bg-blue-500 p-3 shadow-lg"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900">{feature.title}</h3>
                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}