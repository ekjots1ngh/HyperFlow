'use client';

import localforage from 'localforage';

export interface Transaction {
  id: string;
  timestamp: number;
  fromChain: number;
  toChain: number;
  fromAmount: string;
  toAmount: string;
  fromToken: string;
  toToken: string;
  txHash?: string;
  status: 'pending' | 'success' | 'failed';
  route: {
    tool: string;
    estimatedTime: number;
    gasCost: string;
  };
  autoDeposited?: boolean;
  depositTxHash?: string;
}

const transactionStore = localforage.createInstance({
  name: 'hyperflow',
  storeName: 'transactions',
});

export const TransactionStorage = {
  async saveTransaction(tx: Transaction): Promise<void> {
    const transactions = await this.getTransactions();
    transactions.unshift(tx);
    await transactionStore.setItem('all', transactions.slice(0, 50));
  },

  async getTransactions(): Promise<Transaction[]> {
    const transactions = await transactionStore.getItem<Transaction[]>('all');
    return transactions ?? [];
  },

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<void> {
    const transactions = await this.getTransactions();
    const index = transactions.findIndex((transaction) => transaction.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updates };
      await transactionStore.setItem('all', transactions);
    }
  },

  async deleteTransaction(id: string): Promise<void> {
    const transactions = await this.getTransactions();
    const filtered = transactions.filter((transaction) => transaction.id !== id);
    await transactionStore.setItem('all', filtered);
  },

  async clearAll(): Promise<void> {
    await transactionStore.clear();
  },
};
