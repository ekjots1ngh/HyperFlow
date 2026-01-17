"use client";

import { getChains, getRoutes } from "@lifi/sdk";
import type { Chain, RoutesRequest } from "@lifi/types";

export type TestStatus = "pending" | "success" | "error";

export interface TestResult {
	test: string;
	status: TestStatus;
	message: string;
	data?: unknown;
}

const HYPER_EVM_CHAIN_IDS = [999, 998];
const ETHEREUM_CHAIN_ID = 1;
const USDC_ADDRESSES = {
	[ETHEREUM_CHAIN_ID]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
	999: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
	998: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
} as const;

let cachedChains: Chain[] | null = null;

async function loadChains(): Promise<Chain[]> {
	if (cachedChains) {
		return cachedChains;
	}

	cachedChains = await getChains();
	return cachedChains;
}

async function tryGetChains(): Promise<TestResult> {
	try {
		const chains = await loadChains();
		return {
			test: "Fetch Chains",
			status: "success",
			message: `Fetched ${chains.length} chains from LI.FI`,
			data: { count: chains.length },
		};
	} catch (error) {
		return {
			test: "Fetch Chains",
			status: "error",
			message: error instanceof Error ? error.message : "Unknown error while fetching chains",
			data: { error },
		};
	}
}

async function tryFindHyperEVM(): Promise<TestResult> {
	try {
		const chains = await loadChains();
		const match = chains.find((chain) => HYPER_EVM_CHAIN_IDS.includes(Number(chain.id)));

		if (match) {
			return {
				test: "HyperEVM Availability",
				status: "success",
				message: `HyperEVM chain (${match.id}) is available in LI.FI`,
				data: { chain: match },
			};
		}

		return {
			test: "HyperEVM Availability",
			status: "error",
			message: "HyperEVM chain not found in LI.FI chains",
			data: { checkedIds: HYPER_EVM_CHAIN_IDS },
		};
	} catch (error) {
		return {
			test: "HyperEVM Availability",
			status: "error",
			message: error instanceof Error ? error.message : "Unknown error while locating HyperEVM",
			data: { error },
		};
	}
}

async function tryFetchRoute(): Promise<TestResult> {
	try {
		const chains = await loadChains();
		const targetChainId = HYPER_EVM_CHAIN_IDS.find((id) => chains.some((chain) => Number(chain.id) === id));

		if (!targetChainId) {
			return {
				test: "Fetch Routes",
				status: "error",
				message: "No HyperEVM chain available for route test",
				data: { checkedIds: HYPER_EVM_CHAIN_IDS },
			};
		}

		const request: RoutesRequest = {
			fromChainId: ETHEREUM_CHAIN_ID,
			toChainId: targetChainId,
			fromTokenAddress: USDC_ADDRESSES[ETHEREUM_CHAIN_ID],
			toTokenAddress: USDC_ADDRESSES[targetChainId as 999 | 998],
			fromAmount: "1000000",
			options: {
				allowSwitchChain: false,
				slippage: 0.005,
			},
		};

		const response = await getRoutes(request);
		const routes = response.routes ?? [];

		if (routes.length > 0) {
			return {
				test: "Fetch Routes",
				status: "success",
				message: `Received ${routes.length} route(s) to HyperEVM`,
				data: { firstRoute: routes[0] },
			};
		}

		return {
			test: "Fetch Routes",
			status: "error",
			message: "No routes returned for the test request",
			data: { request },
		};
	} catch (error) {
		return {
			test: "Fetch Routes",
			status: "error",
			message: error instanceof Error ? error.message : "Unknown error while fetching routes",
			data: { error },
		};
	}
}

export async function testLiFiIntegration(): Promise<TestResult[]> {
	cachedChains = null; // force fresh data each run to reflect current status

	const tests: TestResult[] = [];

	tests.push(await tryGetChains());
	tests.push(await tryFindHyperEVM());
	tests.push(await tryFetchRoute());

	return tests;
}
