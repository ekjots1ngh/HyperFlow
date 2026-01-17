'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Lightbulb, Sparkles, TrendingDown, Zap } from 'lucide-react';
import type { RouteInsights } from '@/lib/ai/routeAnalyzer';

interface RouteInsightsProps {
	insights: RouteInsights;
}

export function RouteInsightsCard({ insights }: RouteInsightsProps) {
	const getIcon = () => {
		switch (insights.recommendation) {
			case 'fastest':
				return <Clock className="h-5 w-5" />;
			case 'cheapest':
				return <TrendingDown className="h-5 w-5" />;
			case 'balanced':
				return <Zap className="h-5 w-5" />;
			default:
				return null;
		}
	};

	const getGradient = () => {
		switch (insights.recommendation) {
			case 'fastest':
				return {
					badge: 'from-blue-500 to-cyan-500',
					background: 'from-blue-50 to-cyan-50',
				};
			case 'cheapest':
				return {
					badge: 'from-green-500 to-emerald-500',
					background: 'from-green-50 to-emerald-50',
				};
			case 'balanced':
				return {
					badge: 'from-purple-500 to-pink-500',
					background: 'from-purple-50 to-pink-50',
				};
			default:
				return {
					badge: 'from-slate-500 to-slate-700',
					background: 'from-slate-50 to-slate-100',
				};
		}
	};

	const gradients = getGradient();
	const confidencePercent = `${Math.round(Math.max(0, Math.min(1, insights.confidenceScore)) * 100)}%`;

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			className={`rounded-2xl border-2 border-opacity-20 bg-gradient-to-br ${gradients.background} p-5 shadow-lg`}
		>
			<div className="mb-4 flex items-start gap-3">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', delay: 0.1 }}
					className={`rounded-xl bg-gradient-to-br ${gradients.badge} p-2.5 text-white shadow-md`}
				>
					<Sparkles className="h-6 w-6" />
				</motion.div>
				<div className="flex-1">
					<div className="mb-1 flex items-center gap-2">
						{getIcon()}
						<h3 className="text-lg font-bold capitalize text-gray-900">
							{insights.recommendation} route
						</h3>
						<div className="ml-auto rounded-full bg-white/70 px-2 py-1 text-xs font-semibold text-gray-700">
							{confidencePercent} match
						</div>
					</div>
					<p className="text-sm leading-relaxed text-gray-700">{insights.reasoning}</p>
				</div>
			</div>

			{insights.estimatedSavings && Number.parseFloat(insights.estimatedSavings) > 0.5 ? (
				<motion.div
					initial={{ scale: 0.85, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.15 }}
					className="mb-3 flex items-center gap-2 rounded-xl border border-green-200 bg-white/70 p-3"
				>
					<TrendingDown className="h-5 w-5 text-green-600" />
					<div>
						<p className="text-xs text-gray-600">Estimated savings</p>
						<p className="text-lg font-bold text-green-700">${insights.estimatedSavings}</p>
					</div>
				</motion.div>
			) : null}

			<div className="space-y-2">
				{insights.risks.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, x: -12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.25 }}
						className="rounded-xl border border-amber-200 bg-amber-50/80 p-3"
					>
						<div className="flex items-start gap-2">
							<AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-600" />
							<div>
								<p className="mb-1 text-xs font-semibold text-amber-900">Watch out</p>
								<p className="text-xs text-amber-800">{insights.risks[0]}</p>
							</div>
						</div>
					</motion.div>
				) : null}

				{insights.opportunities.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, x: -12 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className="rounded-xl border border-blue-200 bg-blue-50/80 p-3"
					>
						<div className="flex items-start gap-2">
							<Lightbulb className="h-4 w-4 flex-shrink-0 text-blue-600" />
							<div>
								<p className="mb-1 text-xs font-semibold text-blue-900">Pro tip</p>
								<p className="text-xs text-blue-800">{insights.opportunities[0]}</p>
							</div>
						</div>
					</motion.div>
				) : null}
			</div>
		</motion.div>
	);
}
