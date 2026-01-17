import type { RouteOption } from '@/lib/types';

export interface RouteInsights {
	recommendation: 'fastest' | 'cheapest' | 'safest';
	reasoning: string;
	risks: string[];
	opportunities: string[];
	estimatedSavings?: string;
}

export async function analyzeRoutes(routes: RouteOption[]): Promise<RouteInsights> {
	if (!routes || routes.length === 0) {
		return {
			recommendation: 'cheapest',
			reasoning: 'No LI.FI routes available yet. Retry shortly or adjust your parameters.',
			risks: [],
			opportunities: [],
		};
	}

	const gasCosts = routes.map((route) => {
		const parsed = Number.parseFloat(route.gasCost ?? '0');
		return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
	});

	const times = routes.map((route) => {
		const value = Number(route.estimatedTime);
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
		: undefined;

	let recommendation: 'fastest' | 'cheapest' | 'safest' = 'cheapest';
	let reasoning = 'Optimized for lower gas spend without materially increasing completion time.';

	if (Number.isFinite(gasCosts[cheapestIndex]) && gasCosts[cheapestIndex] < 1) {
		recommendation = 'cheapest';
		reasoning = `Save $${(savingsValue ?? 0).toFixed(2)} in gas fees. For sub-$1000 transfers, cost efficiency matters most.`;
	} else if (Number.isFinite(times[fastestIndex]) && times[fastestIndex] < 120) {
		recommendation = 'fastest';
		reasoning = `Only ${Math.round(times[fastestIndex] / 60)} minute(s) end-to-end, ideal when reacting to market moves.`;
	}

	const risks = [
		Number.isFinite(gasCosts[0]) && gasCosts[0] > 5 ? 'Primary route relies on Ethereum L1 with elevated gas costs.' : null,
		Number.isFinite(times[0]) && times[0] > 600 ? 'Expect longer settlement windows during peak congestion.' : null,
	].filter((value): value is string => Boolean(value));

	const opportunities = [
		'Hyperliquid executes up to 200k orders per second, keeping latency low for active strategies.',
		Number.isFinite(gasCosts[cheapestIndex]) && gasCosts[cheapestIndex] < 0.5
			? 'Ultra-low swap fees make micro-arbitrage and scaling strategies viable.'
			: null,
	].filter((value): value is string => Boolean(value));

	const estimatedSavings = savingsValue !== undefined ? (savingsValue >= 0 ? savingsValue.toFixed(2) : undefined) : undefined;

	return {
		recommendation,
		reasoning,
		risks,
		opportunities,
		estimatedSavings,
	};
}
