'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';
import { useTransactionStore } from '@/lib/store/transactions';
import { BottomSheet } from '../mobile/BottomSheet';
import { TransactionItem } from './TransactionItem';

export function TransactionHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const { transactions, isLoading, loadTransactions, deleteTransaction, clearAll } = useTransactionStore();

  useEffect(() => {
    void loadTransactions();
  }, [loadTransactions]);

  const handleClearAll = () => {
    if (typeof window !== 'undefined' && window.confirm('Clear all transaction history?')) {
      void clearAll();
    }
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 rounded-full border-2 border-gray-200 bg-white p-4 shadow-lg transition-colors hover:border-blue-500"
        type="button"
      >
        <div className="relative">
          <History className="h-6 w-6" />
          {transactions.length > 0 ? (
            <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              {transactions.length}
            </div>
          ) : null}
        </div>
      </motion.button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Transaction History">
        <div className="space-y-4 p-6">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="text-gray-600">Loading history...</p>
            </div>
          ) : transactions.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </p>
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-xs text-red-600 transition-colors hover:text-red-700"
                  type="button"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear all
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onDelete={(id) => deleteTransaction(id)}
                      className="mb-3 last:mb-0"
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <History className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-600">No transactions yet</p>
              <p className="mt-1 text-sm text-gray-400">Your bridge history will appear here</p>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
