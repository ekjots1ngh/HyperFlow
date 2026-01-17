'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className = '', animate = true }: SkeletonProps) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded ${className}`}
      animate={
        animate
          ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }
          : {}
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  );
}
