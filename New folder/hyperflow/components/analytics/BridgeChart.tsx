'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransactionStore } from '@/lib/store/transactions';

interface DailyVolumeEntry {
	isoDate: string;
	label: string;
	amount: number;
}

const DAYS_BACK = 6;
const ONE_DAY_IN_MS = 86_400_000;

export function BridgeChart() {
	const { transactions } = useTransactionStore();

	const chartData = useMemo<DailyVolumeEntry[]>(() => {
		const grouped = new Map<string, number>();

		for (const tx of transactions) {
			const date = new Date(tx.timestamp);
			if (Number.isNaN(date.getTime())) {
				continue;
			}

			const isoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
			const previous = grouped.get(isoDate) ?? 0;
			const bridgedAmount = Number.parseFloat(tx.fromAmount) / 1e6;

			if (!Number.isFinite(bridgedAmount)) {
				continue;
			}

			grouped.set(isoDate, previous + bridgedAmount);
		}

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const range: DailyVolumeEntry[] = [];

		for (let offset = DAYS_BACK; offset >= 0; offset -= 1) {
			const target = new Date(today.getTime() - offset * ONE_DAY_IN_MS);
			const isoDate = target.toISOString();
			const total = grouped.get(isoDate) ?? 0;
			const label = target.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

			range.push({
				isoDate,
				label,
				amount: total,
			});
		}

		return range;
	}, [transactions]);

	const maxAmount = Math.max(...chartData.map((entry) => entry.amount), 100);

	return (
		<div className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg">
			<h3 className="mb-6 text-lg font-bold">7-Day Volume</h3>

			<div className="flex h-48 items-end justify-between gap-2">
				{chartData.map((day) => (
					<div key={day.isoDate} className="flex flex-1 flex-col items-center">
						<motion.div
							initial={{ height: 0 }}
							animate={{ height: `${(day.amount / maxAmount) * 100}%` }}
							transition={{ duration: 0.5 }}
							className="min-h-[4px] w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-purple-500"
						/>
						<p className="mt-2 text-xs text-gray-600">{day.label}</p>
						{day.amount > 0 ? (
							<p className="text-xs font-bold text-gray-900">${day.amount.toFixed(0)}</p>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
}
