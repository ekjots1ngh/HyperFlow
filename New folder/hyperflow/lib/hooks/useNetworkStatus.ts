'use client';

import { useEffect, useMemo, useState } from 'react';

type CongestionLevel = 'low' | 'medium' | 'high';

interface NetworkStatus {
	congestion: CongestionLevel;
	avgWaitTime: number;
	isOptimal: boolean;
}

const DEFAULT_STATUS: NetworkStatus = {
	congestion: 'low',
	avgWaitTime: 45,
	isOptimal: true,
};

export function useNetworkStatus(chainId: number) {
	const [status, setStatus] = useState<NetworkStatus>(DEFAULT_STATUS);

	const seededRandom = useMemo(() => {
		let seed = chainId || Date.now();
		return () => {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280;
		};
	}, [chainId]);

	useEffect(() => {
		let cancelled = false;

		const evaluateNetwork = () => {
			const random = seededRandom();
			let congestion: CongestionLevel = 'low';
			if (random > 0.85) {
				congestion = 'high';
			} else if (random > 0.6) {
				congestion = 'medium';
			}

			const avgWaitTime = congestion === 'high' ? 180 : congestion === 'medium' ? 90 : 45;
			const isOptimal = congestion === 'low';

			if (!cancelled) {
				setStatus({ congestion, avgWaitTime, isOptimal });
			}
		};

		evaluateNetwork();
		const intervalId = setInterval(evaluateNetwork, 30_000);

		return () => {
			cancelled = true;
			clearInterval(intervalId);
		};
	}, [seededRandom]);

	return status;
}
