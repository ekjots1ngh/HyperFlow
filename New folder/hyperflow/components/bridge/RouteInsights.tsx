'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, Clock, Shield } from 'lucide-react';
import type { RouteInsights } from '@/lib/ai/routeAnalyzer';

interface RouteInsightsProps {
	insights: RouteInsights;
}

export function RouteInsightsCard({ insights }: RouteInsightsProps) {
	const renderRecommendationIcon = () => {
		switch (insights.recommendation) {
			case 'fastest':
				return <Clock className="h-5 w-5" />;
			case 'cheapest':
				return <TrendingDown className="h-5 w-5" />;
			case 'safest':
				return <Shield className="h-5 w-5" />;
			default:
				return null;
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-4"
		>
			<div className="flex items-start gap-3">
				<div className="rounded-lg bg-purple-600 p-2 text-white">
					<Sparkles className="h-5 w-5" />
				</div>
				<div className="flex-1">
					<div className="mb-2 flex items-center gap-2">
						{renderRecommendationIcon()}
						<h3 className="capitalize font-bold text-purple-900">
							{insights.recommendation} route recommended
						</h3>
					</div>
					<p className="mb-3 text-sm text-purple-800">{insights.reasoning}</p>

					{insights.estimatedSavings && Number.parseFloat(insights.estimatedSavings) > 0 ? (
						<div className="mb-2 flex items-center gap-2 text-sm text-green-700">
							<TrendingDown className="h-4 w-4" />
							<span className="font-medium">
								Save ${Number.parseFloat(insights.estimatedSavings).toFixed(2)} vs average
							</span>
						</div>
					) : null}

					{insights.opportunities.length > 0 ? (
						<div className="mt-3 rounded-lg bg-white/60 p-2">
							<p className="mb-1 text-xs font-medium text-purple-900">💡 Pro Tip:</p>
							<p className="text-xs text-purple-700">{insights.opportunities[0]}</p>
						</div>
					) : null}
				</div>
			</div>
		</motion.div>
	);
}
