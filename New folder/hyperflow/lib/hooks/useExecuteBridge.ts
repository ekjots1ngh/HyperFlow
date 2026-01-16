'use client';

import { useState } from 'react';
import { executeRoute } from '@lifi/sdk';
import type { Route } from '@lifi/sdk';
import type { BridgeState } from '../types';

export function useExecuteBridge() {
	const [state, setState] = useState<BridgeState>({ status: 'idle' });

	const execute = async (route: Route, fromAddress?: string) => {
		setState({ status: 'executing' });

		try {
			if (fromAddress) {
				console.debug('Executing bridge for wallet:', fromAddress);
			}
			const execution = await executeRoute(route, {
				updateRouteHook: (updatedRoute) => {
					console.log('Route updated:', updatedRoute);
				},
				switchChainHook: async (requiredChainId) => {
					console.log('Switch to chain:', requiredChainId);
					await switchChain(requiredChainId);
				},
				acceptSlippageUpdateHook: async (oldSlippage, newSlippage) => {
					console.log('Slippage update:', { oldSlippage, newSlippage });
					return true;
				},
			});

			for await (const step of execution) {
				if (step.status === 'DONE') {
					setState({
						status: 'success',
						txHash: step.txHash,
					});
				} else if (step.status === 'FAILED') {
					setState({
						status: 'error',
						error: step.error?.message ?? 'Transaction failed',
					});
				}
			}
		} catch (error) {
			setState({
				status: 'error',
				error: error instanceof Error ? error.message : 'Execution failed',
			});
			console.error('Bridge execution error:', error);
		}
	};

	const reset = () => {
		setState({ status: 'idle' });
	};

	return { state, execute, reset };
}

async function switchChain(chainId: number): Promise<void> {
	if (typeof window !== 'undefined' && window.ethereum) {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: `0x${chainId.toString(16)}` }],
			});
		} catch (error: unknown) {
			if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 4902) {
				throw new Error('Please add this network to your wallet');
			}
			throw error;
		}
	}
}
