'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { RoutesRequest } from '@lifi/sdk';
import { useAccount } from 'wagmi';
import { ArrowDown, Settings } from 'lucide-react';
import { useRoutes } from '@/lib/hooks/useRoutes';
import { useExecuteBridge } from '@/lib/hooks/useExecuteBridge';
import { RouteCard } from './bridge/RouteCard';
import { TransactionStatus } from './bridge/TransactionStatus';

export function BridgeInterface() {
	const { address, isConnected } = useAccount();
	const [fromChain, setFromChain] = useState(1);
	const [toChain] = useState(998);
	const [amount, setAmount] = useState('');
	const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

	const fromTokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
	const toTokenAddress = '0x...';

	const routeRequest: RoutesRequest | null =
		isConnected && amount && Number.parseFloat(amount) > 0
			? {
					fromChainId: fromChain,
					toChainId: toChain,
					fromTokenAddress,
					toTokenAddress,
					fromAmount: (Number.parseFloat(amount) * 1e6).toString(),
					fromAddress: address!,
				}
			: null;

	const { routes, isLoading, error } = useRoutes(routeRequest);
	const { state, execute, reset } = useExecuteBridge();

	const handleBridge = async () => {
		if (!routes[selectedRouteIndex] || !address) {
			return;
		}
		await execute(routes[selectedRouteIndex], address);
	};

	return (
		<>
			<div className="mx-auto max-w-md space-y-6 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
							HyperFlow
						</h1>
						<p className="mt-1 text-sm text-gray-600">Bridge to Hyperliquid in one click</p>
					</div>
					<div className="flex gap-2">
						<button className="rounded-lg p-2 hover:bg-gray-100" aria-label="Open settings">
							<Settings className="h-5 w-5" />
						</button>
						<ConnectButton />
					</div>
				</div>

				{isConnected ? (
					<div className="space-y-4 rounded-2xl bg-white p-6 shadow-xl">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label className="text-sm font-medium text-gray-600">From</label>
								<span className="text-xs text-gray-500">Balance: 0.00</span>
							</div>
							<div className="flex gap-2">
								<input
									type="number"
									placeholder="0.0"
									value={amount}
									onChange={(event) => setAmount(event.target.value)}
									className="flex-1 rounded-xl border-2 px-4 py-4 text-2xl outline-none focus:border-blue-500"
								/>
								<button className="rounded-xl bg-gray-100 px-4 py-2 font-medium hover:bg-gray-200" type="button">
									USDC
								</button>
							</div>
							<select
								value={fromChain}
								onChange={(event) => setFromChain(Number(event.target.value))}
								className="w-full rounded-xl border-2 px-4 py-2 outline-none focus:border-blue-500"
							>
								<option value={1}>Ethereum</option>
								<option value={42161}>Arbitrum</option>
								<option value={10}>Optimism</option>
								<option value={137}>Polygon</option>
								<option value={8453}>Base</option>
							</select>
						</div>

						<div className="flex justify-center">
							<div className="rounded-full bg-gray-100 p-2">
								<ArrowDown className="h-5 w-5 text-gray-600" />
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-600">To HyperEVM</label>
							<div className="rounded-xl bg-gray-50 px-4 py-4">
								<div className="text-2xl font-medium">
									{isLoading ? (
										<span className="text-gray-400">Calculating...</span>
									) : routes[selectedRouteIndex] ? (
										<span>{(Number.parseFloat(routes[selectedRouteIndex].toAmount) / 1e6).toFixed(2)}</span>
									) : (
										<span className="text-gray-400">0.0</span>
									)}
								</div>
								<div className="mt-1 text-sm text-gray-500">USDC</div>
							</div>
						</div>

						{error ? (
							<div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-600">
								{error}
							</div>
						) : null}

						{routes.length > 0 ? (
							<div className="space-y-3">
								<p className="text-sm font-medium text-gray-600">Choose Route ({routes.length} available)</p>
								<div className="space-y-2">
									{routes.map((route, index) => (
										<RouteCard
											key={route.id}
											route={route}
											isSelected={selectedRouteIndex === index}
											onSelect={() => setSelectedRouteIndex(index)}
										/>
									))}
								</div>
							</div>
						) : null}

						<button
							onClick={handleBridge}
							disabled={!routes.length || isLoading || state.status === 'executing'}
							className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
							type="button"
						>
							{isLoading ? 'Finding Routes...' : state.status === 'executing' ? 'Bridging...' : 'Bridge to Hyperliquid'}
						</button>
					</div>
				) : (
					  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-16 text-center">
						<p className="mb-4 text-gray-600">Connect your wallet to start bridging</p>
						<ConnectButton />
					</div>
				)}
			</div>

			<TransactionStatus state={state} onReset={reset} />
		</>
	);
}
