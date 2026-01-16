'use client';

import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, ExternalLink, XCircle } from 'lucide-react';
import type { Transaction } from '@/lib/storage/transactions';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: (id: string) => Promise<void> | void;
  className?: string;
}

const chainNames: Record<number, string> = {
  1: 'Ethereum',
  42161: 'Arbitrum',
  10: 'Optimism',
  137: 'Polygon',
  8453: 'Base',
  998: 'HyperEVM',
};

const formatAmount = (value: string, symbol: string) => {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    return `0.00 ${symbol}`;
  }
  return `${(parsed / 1e6).toFixed(2)} ${symbol}`;
};

export function TransactionItem({ transaction, onDelete, className }: TransactionItemProps) {
  const createdLabel = formatDistanceToNow(transaction.timestamp, { addSuffix: true });

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 animate-pulse text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusClasses = () => {
    switch (transaction.status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const bridgeLink = transaction.txHash
    ? `https://etherscan.io/tx/${transaction.txHash}`
    : undefined;
  const depositLink = transaction.depositTxHash
    ? `https://explorer.hyperliquid.xyz/tx/${transaction.depositTxHash}`
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`rounded-xl border-2 p-4 transition-shadow ${getStatusClasses()} ${className ?? ''}`.trim()}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <div>
            <p className="text-sm font-medium">
              {chainNames[transaction.fromChain] ?? transaction.fromChain} →{' '}
              {chainNames[transaction.toChain] ?? transaction.toChain}
            </p>
            <p className="text-xs text-gray-500">{createdLabel}</p>
          </div>
        </div>
        {onDelete ? (
          <button
            onClick={() => {
              void onDelete(transaction.id);
            }}
            className="text-xs text-gray-400 transition-colors hover:text-red-600"
            type="button"
          >
            Delete
          </button>
        ) : null}
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
        <div>
          <p className="text-gray-600">Amount</p>
          <p className="font-bold">{formatAmount(transaction.fromAmount, transaction.fromToken)}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400" />
        <div className="text-right">
          <p className="text-gray-600">Received</p>
          <p className="font-bold">{formatAmount(transaction.toAmount, transaction.toToken)}</p>
        </div>
      </div>

      {transaction.autoDeposited ? (
        <div className="mb-2 flex items-center gap-1 text-xs text-blue-600">
          <CheckCircle2 className="h-3 w-3" />
          <span>Auto-deposited to Hyperliquid</span>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 text-xs">
        {bridgeLink ? (
          <a
            href={bridgeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-700"
          >
            View bridge
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
        {depositLink ? (
          <a
            href={depositLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-700"
          >
            View deposit
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}
