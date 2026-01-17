'use client';

import { useEffect, useState } from 'react';

type ImpactSeverity = 'low' | 'medium' | 'high';

interface PriceImpact {
	percentage: number;
	usdLoss: number;
	severity: ImpactSeverity;
}

const EXPECTED_USDC_RATE = 1;

export function usePriceImpact(fromAmount: string, toAmount: string) {
	const [impact, setImpact] = useState<PriceImpact>({
		percentage: 0,
		usdLoss: 0,
		severity: 'low',
	});

	useEffect(() => {
		const from = Number.parseFloat(fromAmount ?? '');
		const to = Number.parseFloat(toAmount ?? '');

		if (!Number.isFinite(from) || !Number.isFinite(to) || from <= 0 || to <= 0) {
			setImpact({
				percentage: 0,
				usdLoss: 0,
				severity: 'low',
			});
			return;
		}

		const actualRate = to / from;
		const impactPercent = ((EXPECTED_USDC_RATE - actualRate) / EXPECTED_USDC_RATE) * 100;
		const usdLoss = from - to;
		const normalizedPercentage = Math.abs(Number.isFinite(impactPercent) ? impactPercent : 0);
		const normalizedLoss = Math.abs(Number.isFinite(usdLoss) ? usdLoss : 0);

		let severity: ImpactSeverity = 'low';
		if (normalizedPercentage > 1) {
			severity = 'high';
		} else if (normalizedPercentage > 0.3) {
			severity = 'medium';
		}

		setImpact({
			percentage: Number.parseFloat(normalizedPercentage.toFixed(2)),
			usdLoss: Number.parseFloat(normalizedLoss.toFixed(2)),
			severity,
		});
	}, [fromAmount, toAmount]);

	return impact;
}
