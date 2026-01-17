'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { mainnet, arbitrum, optimism, polygon, base } from 'wagmi/chains';

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
	console.warn(
		'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Wallet connections will fail until a valid WalletConnect project ID is configured.',
	);
}

const hyperEVM: Chain = {
	id: 999,
	name: 'HyperEVM',
	nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://api.hyperliquid.xyz/evm'] },
		public: { http: ['https://api.hyperliquid.xyz/evm'] },
	},
	blockExplorers: {
		default: { name: 'HyperEVM Explorer', url: 'https://hyperevmscan.io' },
	},
	testnet: false,
};

const config = getDefaultConfig({
	appName: 'HyperFlow',
	projectId: walletConnectProjectId ?? 'invalid-walletconnect-project-id',
	chains: [mainnet, arbitrum, optimism, polygon, base, hyperEVM],
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http(),
		[optimism.id]: http(),
		[polygon.id]: http(),
		[base.id]: http(),
		[hyperEVM.id]: http(hyperEVM.rpcUrls.default.http[0]),
	},
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider modalSize="compact">
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
