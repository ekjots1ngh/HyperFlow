export interface Token {
	address: string;
	symbol: string;
	name: string;
	decimals: number;
	chainId: number;
	logoURI?: string;
}

export interface Chain {
	id: number;
	name: string;
	logoURI?: string;
}

import type { Route } from '@lifi/sdk';

export interface RouteOption {
	id: string;
	fromAmount: string;
	toAmount: string;
	estimatedTime: number;
	gasCost: string;
	steps: RouteStep[];
	rawRoute: Route;
}

export interface RouteStep {
	type: string;
	tool: string;
	fromToken: Token;
	toToken: Token;
	fromAmount: string;
	toAmount: string;
}

export interface BridgeState {
	status: 'idle' | 'fetching-routes' | 'ready' | 'executing' | 'success' | 'error';
	txHash?: string;
	error?: string;
}
