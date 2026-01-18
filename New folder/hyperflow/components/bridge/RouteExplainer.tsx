'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DollarSign, Info, Shield, X, Zap } from 'lucide-react';
import type { RouteOption } from '@/lib/types';

type RecommendationKey = 'fastest' | 'cheapest' | 'balanced';

interface RouteExplainerProps {
	route: RouteOption;
	recommendation: RecommendationKey;
}

const THEME_CLASSES: Record<RecommendationKey, { badge: string; icon: string; title: string }> = {
	fastest: { badge: 'bg-blue-100', icon: 'text-blue-600', title: 'text-blue-900' },
	cheapest: { badge: 'bg-green-100', icon: 'text-green-600', title: 'text-green-900' },
	balanced: { badge: 'bg-purple-100', icon: 'text-purple-600', title: 'text-purple-900' },
};

const EXPLANATIONS: Record<RecommendationKey, { title: string; reasons: string[]; icon: typeof Zap }> = {
	fastest: {
		title: 'Why this is the fastest route',
		reasons: [
			'Uses Stargate bridge with under two-minute confirmations',
			'Single hop keeps you from waiting on multiple fills',
			'Runs through HyperEVM high-throughput infrastructure',
		],
		icon: Zap,
	},
	cheapest: {
		title: 'Why this is the cheapest route',
		reasons: [
			'Optimises gas spend by batching transactions',
			'Leverages cost-efficient Layer 2 settlement',
			'No intermediate swap fees layered into the path',
		],
		icon: DollarSign,
	},
	balanced: {
		title: 'Why this is the balanced route',
		reasons: [
			'Blends speed and cost for the current bridge size',
			'Historically reliable route with high success rates',
			'Sized for your transfer to avoid unnecessary slippage',
		],
		icon: Shield,
	},
};

export function RouteExplainer({ route, recommendation }: RouteExplainerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const config = EXPLANATIONS[recommendation];
	const theme = THEME_CLASSES[recommendation];
	const Icon = config.icon;
	const stepSequence = route.steps.map((step) => step.tool).join(' → ') || 'Direct transfer';

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-700"
			>
				<Info className="h-3 w-3" />
				Why this route?
			</button>

			<AnimatePresence>
				{isOpen ? (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="fixed inset-0 z-50 bg-black/50"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl"
						>
							<div className="space-y-6 p-6">
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-center gap-3">
										<div className={`rounded-lg p-2 ${theme.badge}`}>
											<Icon className={`h-6 w-6 ${theme.icon}`} />
										</div>
										<h3 className={`text-lg font-bold ${theme.title}`}>{config.title}</h3>
									</div>
									<button
										onClick={() => setIsOpen(false)}
										className="rounded-lg p-1 transition hover:bg-gray-100"
										aria-label="Close route explainer"
									>
										<X className="h-5 w-5" />
									</button>
								</div>

								<div className="space-y-3">
									{config.reasons.map((reason, index) => (
										<motion.div
											key={reason}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											className="flex items-start gap-3"
										>
											<div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
												<span className="text-xs text-green-600">✓</span>
											</div>
											<p className="text-sm text-gray-700">{reason}</p>
										</motion.div>
									))}
								</div>

								<div className="rounded-lg bg-blue-50 p-3">
									<p className="text-xs text-blue-900">
										<strong>How it works:</strong> {stepSequence}
									</p>
								</div>
							</div>
						</motion.div>
					</>
				) : null}
			</AnimatePresence>
		</>
	);
}
