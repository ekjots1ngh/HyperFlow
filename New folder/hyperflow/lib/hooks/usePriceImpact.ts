'use client';

import { useEffect, useState } from 'react';

type ImpactSeverity = 'low' | 'medium' | 'high';

interface PriceImpact {
	percentage: number;
	usdLoss: number;
	severity: ImpactSeverity;
}

const EXPECTED_RATE = 1; // Treat stablecoin swaps as 1:1 baseline.

export function usePriceImpact(fromAmount: string, toAmount: string) {
	const [impact, setImpact] = useState<PriceImpact>({
		percentage: 0,
		usdLoss: 0,
		severity: 'low',
	});

	useEffect(() => {
		if (!fromAmount || !toAmount) {
			setImpact({ percentage: 0, usdLoss: 0, severity: 'low' });
			return;
		}

		const from = Number.parseFloat(fromAmount);
		const to = Number.parseFloat(toAmount);

		if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) {
			setImpact({ percentage: 0, usdLoss: 0, severity: 'low' });
			return;
		}

		const actualRate = to / from;
		const impactPct = ((EXPECTED_RATE - actualRate) / EXPECTED_RATE) * 100;
		const loss = from - to;

		let severity: ImpactSeverity = 'low';
		if (Math.abs(impactPct) > 1) {
			severity = 'high';
		} else if (Math.abs(impactPct) > 0.3) {
			severity = 'medium';
		}

		setImpact({
			percentage: Math.abs(impactPct),
			usdLoss: Math.abs(loss),
			severity,
		});
	}, [fromAmount, toAmount]);

	return impact;
}
