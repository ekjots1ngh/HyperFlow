'use client';

import { useEffect, useState } from 'react';
import { Fuel } from 'lucide-react';
import type { RouteOption } from '@/lib/types';

interface GasEstimatorProps {
	route?: RouteOption;
	amount?: string;
}

interface GasData {
	totalGas: number;
	refundEligible: boolean;
	breakEvenAmount: number;
	gasToValueRatio: number;
}

const DEFAULT_GAS_DATA: GasData = {
	totalGas: 0,
	refundEligible: false,
	breakEvenAmount: 0,
	gasToValueRatio: 0,
};

export function GasEstimator({ route, amount }: GasEstimatorProps) {
	const [gasData, setGasData] = useState<GasData>(DEFAULT_GAS_DATA);

	useEffect(() => {
		const parsedGas = Number.parseFloat(route?.gasCost ?? '0');
		const parsedAmount = Number.parseFloat(amount ?? '0');

		if (!Number.isFinite(parsedGas) || parsedGas <= 0 || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
			setGasData(DEFAULT_GAS_DATA);
			return;
		}

		const refundEligible = parsedGas > 2 && parsedAmount > 100;
		const breakEvenAmount = parsedGas * 100;
		const gasToValueRatio = (parsedGas / parsedAmount) * 100;

		setGasData({
			totalGas: Number.parseFloat(parsedGas.toFixed(2)),
			refundEligible,
			breakEvenAmount,
			gasToValueRatio: Number.parseFloat(gasToValueRatio.toFixed(2)),
		});
	}, [amount, route?.gasCost]);

	return (
		<div className="space-y-2 rounded-xl bg-gray-50 p-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-sm">
					<Fuel className="h-4 w-4 text-gray-600" />
					<span className="font-medium">Estimated Gas</span>
				</div>
				<span className="text-lg font-bold">${gasData.totalGas.toFixed(2)}</span>
			</div>

			{gasData.refundEligible ? (
				<div className="rounded bg-blue-50 p-2 text-xs text-blue-700">
					💡 Bridge ${gasData.breakEvenAmount.toFixed(0)}+ to keep gas under 1% of your transfer
				</div>
			) : null}

			<div className="flex items-center gap-2 text-xs text-gray-600">
				<span>Gas-to-Value Ratio:</span>
				<span className="font-medium">{gasData.gasToValueRatio.toFixed(2)}%</span>
			</div>
		</div>
	);
}
