export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const DEMO_ROUTES = [
	{
		id: 'demo-1',
		fromAmount: '1000000',
		toAmount: '998500',
		estimatedTime: 120,
		gasCost: '1.50',
		steps: [
			{
				type: 'swap',
				tool: 'Uniswap',
				fromToken: { symbol: 'USDC', decimals: 6 },
				toToken: { symbol: 'USDC', decimals: 6 },
				fromAmount: '1000000',
				toAmount: '999000',
			},
			{
				type: 'bridge',
				tool: 'Stargate',
				fromToken: { symbol: 'USDC', decimals: 6 },
				toToken: { symbol: 'USDC', decimals: 6 },
				fromAmount: '999000',
				toAmount: '998500',
			},
		],
	},
];
