'use client';

import { useEffect, useState } from 'react';
import { Fuel, Info, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { RouteOption } from '@/lib/types';

interface GasEstimatorProps {
	route?: RouteOption;
	amount?: string;
}

interface GasData {
	totalGas: number;
	gasToValueRatio: number;
	isEfficient: boolean;
	breakEvenAmount: number;
}

const INITIAL_STATE: GasData = {
	totalGas: 0,
	gasToValueRatio: 0,
	isEfficient: true,
	breakEvenAmount: 0,
};

export function GasEstimator({ route, amount }: GasEstimatorProps) {
	const [gasData, setGasData] = useState<GasData>(INITIAL_STATE);

	useEffect(() => {
		if (!route || !amount) {
			setGasData(INITIAL_STATE);
			return;
		}

		const gas = Number.parseFloat(route.gasCost ?? '0');
		const amt = Number.parseFloat(amount ?? '0');

		if (!Number.isFinite(gas) || !Number.isFinite(amt) || amt <= 0) {
			setGasData(INITIAL_STATE);
			return;
		}

		const gasToValueRatio = (gas / amt) * 100;
		const isEfficient = gasToValueRatio < 1;
		const breakEvenAmount = gas * 100;

		setGasData({
			totalGas: gas,
			gasToValueRatio,
			isEfficient,
			breakEvenAmount,
		});
	}, [amount, route]);

	if (!route) {
		return null;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`rounded-xl border-2 p-4 ${
				gasData.isEfficient ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
			}`}
		>
			<div className="mb-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Fuel className={`h-5 w-5 ${gasData.isEfficient ? 'text-green-600' : 'text-amber-600'}`} />
					<div>
						<p className="text-xs font-medium text-gray-600">Network fee</p>
						<p className="text-2xl font-bold text-gray-900">${gasData.totalGas.toFixed(2)}</p>
					</div>
				</div>
				<div className="text-right">
					<p className="text-xs text-gray-600">Fee ratio</p>
					<p className={`text-lg font-bold ${gasData.isEfficient ? 'text-green-600' : 'text-amber-600'}`}>
						{gasData.gasToValueRatio.toFixed(2)}%
					</p>
				</div>
			</div>

			{!gasData.isEfficient && gasData.breakEvenAmount > 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mb-2 flex items-start gap-2 rounded-lg bg-white/60 p-2"
				>
					<Info className="h-4 w-4 flex-shrink-0 text-amber-600" />
					<p className="text-xs text-amber-800">
						💡 Bridge <span className="font-bold">${gasData.breakEvenAmount.toFixed(0)}+</span> to get fees under 1% of your transfer
					</p>
				</motion.div>
			) : null}

			{gasData.isEfficient ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="flex items-center gap-2 text-xs text-green-700"
				>
					<TrendingDown className="h-4 w-4" />
					<span className="font-medium">Excellent gas efficiency! Perfect for this amount.</span>
				</motion.div>
			) : null}
		</motion.div>
	);
}
