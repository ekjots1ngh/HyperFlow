'use client';

import { motion } from 'framer-motion';

const PRESET_AMOUNTS: Array<{ label: string; value: string }> = [
	{ label: '$100', value: '100' },
	{ label: '$500', value: '500' },
	{ label: '$1K', value: '1000' },
	{ label: '$5K', value: '5000' },
];

interface QuickAmountsProps {
	onSelect: (amount: string) => void;
}

export function QuickAmounts({ onSelect }: QuickAmountsProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{PRESET_AMOUNTS.map((preset) => (
				<motion.button
					key={preset.value}
					whileTap={{ scale: 0.95 }}
					onClick={() => onSelect(preset.value)}
					className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-blue-100"
				>
					{preset.label}
				</motion.button>
			))}
		</div>
	);
}
