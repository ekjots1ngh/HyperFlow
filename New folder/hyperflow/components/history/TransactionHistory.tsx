'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';
import { useTransactionStore } from '@/lib/store/transactions';
import { BottomSheet } from '../mobile/BottomSheet';
import { TransactionItem } from './TransactionItem';

export function TransactionHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const { transactions, isLoading, loadTransactions, deleteTransaction, clearAll } = useTransactionStore();

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <>
      {transactions.length > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-30 rounded-full border-2 border-gray-200 bg-white p-4 shadow-lg hover:border-blue-500"
        >
          <div className="relative">
            <History className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {transactions.length}
            </div>
          </div>
        </motion.button>
      )}

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Transaction History">
        <div className="p-6 space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Loading history...</p>
            </div>
          ) : transactions.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>
                <button
                  onClick={() => {
                    if (confirm('Clear all transaction history?')) {
                      clearAll();
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear all
                </button>
              </div>

              <AnimatePresence>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {transactions.map((tx) => (
                    <TransactionItem
                      key={tx.id}
                      transaction={tx}
                      onDelete={deleteTransaction}
                    />
                  ))}
                </div>
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No transactions yet</p>
              <p className="text-sm text-gray-400 mt-1">Your bridge history will appear here</p>
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
