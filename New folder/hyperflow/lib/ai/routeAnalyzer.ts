import type { RouteOption } from '@/lib/types';

export interface RouteInsights {
	recommendation: 'fastest' | 'cheapest' | 'balanced';
	reasoning: string;
	risks: string[];
	opportunities: string[];
	estimatedSavings?: string;
	confidenceScore: number;
}

export async function analyzeRoutes(
	routes: RouteOption[],
	amount: string,
): Promise<RouteInsights> {
	if (!routes || routes.length === 0) {
		return {
			recommendation: 'balanced',
			reasoning: 'No routes available',
			risks: [],
			opportunities: [],
			confidenceScore: 0,
		};
	}

	const gasCosts = routes.map((route) => {
		const parsed = Number.parseFloat(route.gasCost ?? '0');
		return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
	});

	const times = routes.map((route) => {
		const value = Number(route.estimatedTime ?? Number.POSITIVE_INFINITY);
		return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
	});

	const cheapestIndex = gasCosts.indexOf(Math.min(...gasCosts));
	const fastestIndex = times.indexOf(Math.min(...times));

	const finiteGasCosts = gasCosts.filter((value) => Number.isFinite(value));
	const averageGas = finiteGasCosts.length > 0
		? finiteGasCosts.reduce((sum, value) => sum + value, 0) / finiteGasCosts.length
		: 0;

	const savingsValue = Number.isFinite(averageGas) && Number.isFinite(gasCosts[cheapestIndex])
		? averageGas - gasCosts[cheapestIndex]
		: 0;
	const savings = savingsValue.toFixed(2);

	const parsedAmount = Number.parseFloat(amount ?? '0');
	const bridgeAmount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0;
	const gasToValueRatio = bridgeAmount > 0 && Number.isFinite(gasCosts[cheapestIndex])
		? (gasCosts[cheapestIndex] / bridgeAmount) * 100
		: 0;

	let recommendation: 'fastest' | 'cheapest' | 'balanced' = 'cheapest';
	let reasoning = '';
	let confidenceScore = 0.85;

	if (bridgeAmount > 5000 && Number.isFinite(times[fastestIndex])) {
		const minutes = Math.round((times[fastestIndex] ?? 0) / 60) || 1;
		recommendation = 'fastest';
		reasoning = `For $${bridgeAmount.toLocaleString()}, speed is critical. This route completes in ${minutes} minutes, perfect for catching market opportunities on Hyperliquid.`;
		confidenceScore = 0.92;
	} else if (gasToValueRatio > 2) {
		recommendation = 'cheapest';
		reasoning = `Gas represents ${gasToValueRatio.toFixed(1)}% of your transfer. The cheapest route saves you $${savings}, which is significant for this amount.`;
		confidenceScore = 0.88;
	} else if (
		Number.isFinite(times[fastestIndex]) &&
		times[fastestIndex] < 120 &&
		Number.isFinite(gasCosts[fastestIndex]) &&
		Number.isFinite(gasCosts[cheapestIndex]) &&
		gasCosts[fastestIndex] < gasCosts[cheapestIndex] * 1.3
	) {
		recommendation = 'fastest';
		reasoning = `Best of both worlds: only ${Math.round(times[fastestIndex] / 60)} minutes with minimal gas premium. Get to trading faster.`;
		confidenceScore = 0.95;
	} else {
		recommendation = 'balanced';
		const minutes = Number.isFinite(times[cheapestIndex])
			? Math.round(times[cheapestIndex] / 60)
			: Math.round(times[fastestIndex] / 60);
		const gasCost = Number.isFinite(gasCosts[cheapestIndex])
			? gasCosts[cheapestIndex].toFixed(2)
			: '0.00';
		reasoning = `Balanced route offers good speed (${minutes} min) at the lowest cost ($${gasCost}).`;
		confidenceScore = 0.9;
	}

	const risks: string[] = [];

	if (Number.isFinite(gasCosts[cheapestIndex]) && gasCosts[cheapestIndex] > 5) {
		risks.push('⚠️ High gas costs - consider bridging a larger amount to reduce gas-to-value ratio');
	}
	if (Number.isFinite(times[cheapestIndex]) && times[cheapestIndex] > 600) {
		risks.push('⏰ Extended wait time - route may take 10+ minutes during congestion');
	}
	if (routes[cheapestIndex]?.steps?.length > 2) {
		risks.push('🔄 Multi-step route - more transactions means more points of failure');
	}

	const opportunities: string[] = [];

	if (gasToValueRatio > 0 && gasToValueRatio < 0.5) {
		opportunities.push('💰 Ultra-low gas (<0.5% of transfer) - ideal for frequent bridging');
	}
	if (Number.isFinite(times[cheapestIndex]) && times[cheapestIndex] < 180) {
		opportunities.push('⚡ Fast settlement - funds ready for Hyperliquid trading in under 3 minutes');
	}
	if (Number.parseFloat(savings) > 1) {
		opportunities.push(`💎 Save $${savings} vs average route - enough for gas on several trades`);
	}
	opportunities.push('🚀 Hyperliquid supports 200k orders/sec - perfect for high-frequency strategies');

	return {
		recommendation,
		reasoning,
		risks: risks.slice(0, 2),
		opportunities: opportunities.slice(0, 2),
		estimatedSavings: savings,
		confidenceScore,
	};
}
