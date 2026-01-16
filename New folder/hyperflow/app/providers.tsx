'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { mainnet, arbitrum, optimism, polygon, base } from 'wagmi/chains';

const hyperEVM: Chain = {
  id: 998,
  name: 'HyperEVM',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz'] },
    public: { http: ['https://rpc.hyperliquid.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.hyperliquid.xyz' },
  },
};

const config = getDefaultConfig({
	appName: 'HyperFlow',
	projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with WalletConnect project ID
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
