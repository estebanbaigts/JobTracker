import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const springValue = useSpring(0, {
    stiffness: 80,
    damping: 20,
  });
  const displayValue = useTransform(springValue, Math.round);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}