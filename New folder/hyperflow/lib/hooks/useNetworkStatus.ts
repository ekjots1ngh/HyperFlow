'use client';

import { useEffect, useState } from 'react';

interface NetworkStatus {
	congestion: 'low' | 'medium' | 'high';
	gasPrice: number;
	blockTime: number;
	isOptimal: boolean;
}

const chainNames: Record<number, string> = {
	1: 'Ethereum',
	42161: 'Arbitrum',
	10: 'Optimism',
	137: 'Polygon',
	8453: 'Base',
};

export function useNetworkStatus(chainId: number) {
	const [status, setStatus] = useState<NetworkStatus>({
		congestion: 'low',
		gasPrice: 0,
		blockTime: 12,
		isOptimal: true,
	});

	useEffect(() => {
		const checkNetwork = () => {
			const random = Math.random();
			const congestion = random > 0.8 ? 'high' : random > 0.5 ? 'medium' : 'low';

			setStatus({
				congestion,
				gasPrice: congestion === 'high' ? 50 : congestion === 'medium' ? 25 : 15,
				blockTime: chainId === 1 ? 12 : 2,
				isOptimal: congestion === 'low',
			});
		};

		checkNetwork();
		const interval = setInterval(checkNetwork, 15_000);

		return () => {
			clearInterval(interval);
		};
	}, [chainId]);

	return { status, chainName: chainNames[chainId] ?? 'Unknown' };
}
