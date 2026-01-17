'use client';

import { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PortfolioTrackerProps {
	address: string;
}

interface PortfolioSnapshot {
	totalBridged: number;
	currentValue: number;
	pnl: number;
	pnlPercent: number;
}

const INITIAL_SNAPSHOT: PortfolioSnapshot = {
	totalBridged: 0,
	currentValue: 0,
	pnl: 0,
	pnlPercent: 0,
};

export function PortfolioTracker({ address }: PortfolioTrackerProps) {
	const [portfolio, setPortfolio] = useState<PortfolioSnapshot>(INITIAL_SNAPSHOT);

	useEffect(() => {
		if (!address) {
			setPortfolio(INITIAL_SNAPSHOT);
			return;
		}

		let cancelled = false;

		const calculatePortfolio = async () => {
			// TODO: Replace mock data with aggregated transaction history and market pricing.
			const snapshot: PortfolioSnapshot = {
				totalBridged: 5_420,
				currentValue: 5_680,
				pnl: 260,
				pnlPercent: 4.8,
			};
			if (!cancelled) {
				setPortfolio(snapshot);
			}
		};

		void calculatePortfolio();

		return () => {
			cancelled = true;
		};
	}, [address]);

	const isUp = portfolio.pnl >= 0;

	return (
		<div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50 p-4">
			<h3 className="mb-3 font-bold text-gray-900">Your Hyperliquid Portfolio</h3>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<p className="text-xs text-gray-600">Total Bridged</p>
					<p className="text-xl font-bold">${portfolio.totalBridged.toLocaleString()}</p>
				</div>
				<div>
					<p className="text-xs text-gray-600">Current Value</p>
					<div className="flex items-center gap-1">
						<p className="text-xl font-bold">${portfolio.currentValue.toLocaleString()}</p>
						{isUp ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
					</div>
				</div>
			</div>

			<div className={`mt-3 rounded-lg p-2 text-center text-sm font-bold ${isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
				{isUp ? '+' : '-'}${Math.abs(portfolio.pnl).toFixed(2)} ({Math.abs(portfolio.pnlPercent).toFixed(2)}%)
			</div>
		</div>
	);
}
