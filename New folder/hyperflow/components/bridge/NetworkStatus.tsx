'use client';

import { motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';

interface NetworkStatusProps {
  chainId: number;
}

export function NetworkStatus({ chainId }: NetworkStatusProps) {
  const { status } = useNetworkStatus(chainId);

  const getStatusClasses = () => {
    switch (status.congestion) {
      case 'low':
        return 'border-green-300 bg-green-100 text-green-700';
      case 'medium':
        return 'border-yellow-300 bg-yellow-100 text-yellow-700';
      case 'high':
        return 'border-red-300 bg-red-100 text-red-700';
      default:
        return 'border-gray-300 bg-gray-100 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (status.congestion) {
      case 'low':
        return <CheckCircle className="h-3 w-3" />;
      case 'medium':
        return <Activity className="h-3 w-3" />;
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium border ${getStatusClasses()}`}
    >
      {getIcon()}
      <span className="capitalize">{status.congestion}</span>
      <span className="opacity-60">•</span>
      <span>{status.gasPrice} gwei</span>
    </motion.div>
  );
}
