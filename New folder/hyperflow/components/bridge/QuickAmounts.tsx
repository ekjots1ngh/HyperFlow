'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PRESETS: Array<{ label: string; value: string; popular: boolean }> = [
	{ label: '$100', value: '100', popular: false },
	{ label: '$500', value: '500', popular: true },
	{ label: '$1K', value: '1000', popular: false },
	{ label: '$5K', value: '5000', popular: false },
];

interface QuickAmountsProps {
	onSelect: (amount: string) => void;
}

export function QuickAmounts({ onSelect }: QuickAmountsProps) {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<Zap className="h-4 w-4 text-gray-600" />
				<p className="text-xs font-medium text-gray-600">Quick amounts:</p>
			</div>
			<div className="flex flex-wrap gap-2">
				{PRESETS.map((preset, index) => (
					<motion.button
						key={preset.value}
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => onSelect(preset.value)}
						className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
							preset.popular
								? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
						}`}
					>
						{preset.label}
						{preset.popular ? (
							<span className="absolute -right-2 -top-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900">
								⭐
							</span>
						) : null}
					</motion.button>
				))}
			</div>
		</div>
	);
}
