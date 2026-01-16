import { create } from 'zustand';
import type { Transaction } from '../storage/transactions';
import { TransactionStorage } from '../storage/transactions';

interface TransactionStore {
	transactions: Transaction[];
	isLoading: boolean;
	loadTransactions: () => Promise<void>;
	addTransaction: (tx: Transaction) => Promise<void>;
	updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
	deleteTransaction: (id: string) => Promise<void>;
	clearAll: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
	transactions: [],
	isLoading: false,

	loadTransactions: async () => {
		set({ isLoading: true });
		try {
			const transactions = await TransactionStorage.getTransactions();
			set({ transactions, isLoading: false });
		} catch (error) {
			console.error('Failed to load transactions:', error);
			set({ isLoading: false });
		}
	},

	addTransaction: async (tx: Transaction) => {
		await TransactionStorage.saveTransaction(tx);
		set({ transactions: [tx, ...get().transactions] });
	},

	updateTransaction: async (id: string, updates: Partial<Transaction>) => {
		await TransactionStorage.updateTransaction(id, updates);
		set({
			transactions: get().transactions.map((transaction) =>
				transaction.id === id ? { ...transaction, ...updates } : transaction,
			),
		});
	},

	deleteTransaction: async (id: string) => {
		await TransactionStorage.deleteTransaction(id);
		set({
			transactions: get().transactions.filter((transaction) => transaction.id !== id),
		});
	},

	clearAll: async () => {
		await TransactionStorage.clearAll();
		set({ transactions: [] });
	},
}));
