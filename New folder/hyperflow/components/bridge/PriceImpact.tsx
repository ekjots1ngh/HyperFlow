'use client';

import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { usePriceImpact } from '@/lib/hooks/usePriceImpact';

interface PriceImpactProps {
	fromAmount: string;
	toAmount: string;
}

export function PriceImpact({ fromAmount, toAmount }: PriceImpactProps) {
	const impact = usePriceImpact(fromAmount, toAmount);

	if (!fromAmount || !toAmount || impact.percentage === 0) {
		return null;
	}

	const severityClasses = (() => {
		switch (impact.severity) {
			case 'low':
				return 'bg-green-50 border-green-200 text-green-700';
			case 'medium':
				return 'bg-yellow-50 border-yellow-200 text-yellow-700';
			case 'high':
				return 'bg-red-50 border-red-200 text-red-700';
		}
	})();

	const renderIcon = () => {
		switch (impact.severity) {
			case 'low':
				return <TrendingDown className="h-4 w-4 text-green-600" />;
			case 'medium':
				return <AlertCircle className="h-4 w-4 text-yellow-600" />;
			case 'high':
				return <TrendingUp className="h-4 w-4 text-red-600" />;
		}
	};

	return (
		<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className={`rounded-xl border-2 p-3 ${severityClasses}`}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					{renderIcon()}
					<div>
						<p className="text-xs font-medium">Price Impact</p>
						<p className="text-sm font-bold">{impact.percentage.toFixed(3)}%</p>
					</div>
				</div>
				<div className="text-right">
					<p className="text-xs">Loss</p>
					<p className="text-sm font-bold">${impact.usdLoss.toFixed(2)}</p>
				</div>
			</div>
			{impact.severity === 'high' ? (
				<p className="mt-2 text-xs opacity-80">⚠️ High slippage detected. Consider splitting into smaller amounts.</p>
			) : null}
		</motion.div>
	);
}
