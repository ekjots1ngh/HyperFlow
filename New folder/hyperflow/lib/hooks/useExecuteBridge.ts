'use client';

import { useState } from 'react';
import { executeRoute } from '@lifi/sdk';
import type { Route, SwitchChainHook } from '@lifi/sdk';
import type { BridgeState } from '../types';

export function useExecuteBridge() {
	const [state, setState] = useState<BridgeState>({ status: 'idle' });

	const handleSwitchChain: SwitchChainHook = async (requiredChainId) => {
		console.log('Switch to chain:', requiredChainId);
		await switchChain(requiredChainId);
		return undefined;
	};

	const execute = async (route: Route, fromAddress?: string) => {
		setState({ status: 'executing' });

		try {
			if (fromAddress) {
				console.debug('Executing bridge for wallet:', fromAddress);
			}
			await executeRoute(route, {
				updateRouteHook: (updatedRoute) => {
					console.log('Route updated:', updatedRoute);
				},
				switchChainHook: handleSwitchChain,
			});
			setState({
				status: 'success',
			});
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
