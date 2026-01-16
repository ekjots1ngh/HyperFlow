'use client';

import { useEffect, useState } from 'react';
import type { Route, Step } from '@lifi/sdk';
import { getRoutes, RoutesRequest } from '@lifi/sdk';
import type { RouteOption } from '../types';

export function useRoutes(request: RoutesRequest | null) {
	const [routes, setRoutes] = useState<RouteOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!request) {
			return;
		}

		const fetchRoutes = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await getRoutes(request);

				const mappedRoutes = result.routes.slice(0, 3).map((route: Route) => ({
					id: route.id,
					fromAmount: route.fromAmount,
					toAmount: route.toAmount,
					estimatedTime: route.steps.reduce(
						(acc: number, step: Step) => acc + (step.estimate?.executionDuration || 0),
						0,
					),
					gasCost: route.gasCostUSD ?? '0',
					steps: route.steps.map((step: Step) => ({
						type: step.type,
						tool: step.tool,
						fromToken: step.action.fromToken,
						toToken: step.action.toToken,
						fromAmount: step.action.fromAmount,
						toAmount: step.estimate?.toAmount ?? '0',
					})),
				}));

				setRoutes(mappedRoutes);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch routes');
				console.error('Route fetch error:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchRoutes();
	}, [request]);

	return { routes, isLoading, error };
}
