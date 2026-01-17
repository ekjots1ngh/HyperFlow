"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, TrendingUp, Zap } from "lucide-react";

interface SmartSuggestionsProps {
	amount: string;
	fromChain: number;
	onSuggest: (amount: string, reason: string) => void;
}

type SuggestionTier = "blue" | "purple" | "green";

interface SuggestionEntry {
	amount: string;
	reason: string;
	icon: typeof Zap;
	color: SuggestionTier;
	show: boolean;
	benefit: string;
}

export function SmartSuggestions({ amount, fromChain, onSuggest }: SmartSuggestionsProps) {
	const currentAmount = parseFloat(amount) || 0;
	const isLayer2Origin = fromChain !== 1;

	const suggestions = (
		[
		{
			amount: "500",
			reason: "Optimal gas efficiency",
			icon: Zap,
			color: "blue",
			show: currentAmount < 500,
			benefit: isLayer2Origin ? "Fast exits with minimal fees" : "Gas under 1% of transfer",
		},
		{
			amount: "1000",
			reason: "Popular for day trading",
			icon: TrendingUp,
			color: "purple",
			show: currentAmount < 1000,
			benefit: "Most common amount",
		},
		{
			amount: "5000",
			reason: "Whale tier - VIP routing",
			icon: Shield,
			color: "green",
			show: currentAmount < 5000,
			benefit: "Priority bridge execution",
		},
	] satisfies SuggestionEntry[]
	).filter(suggestion => suggestion.show);

	if (suggestions.length === 0) {
		return null;
	}

	return (
		<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
			<div className="mb-2 flex items-center gap-2">
				<Lightbulb className="h-4 w-4 text-yellow-600" />
				<p className="text-xs font-medium text-gray-600">Smart Suggestions:</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{suggestions.map(suggestion => (
					<motion.button
						key={suggestion.amount}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => onSuggest(suggestion.amount, suggestion.reason)}
						className={`group relative rounded-lg border-2 bg-gradient-to-br px-3 py-2 transition-all ${
							suggestion.color === "blue"
								? "from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-400"
								: suggestion.color === "purple"
									? "from-purple-50 to-pink-50 border-purple-200 hover:border-purple-400"
									: "from-green-50 to-emerald-50 border-green-200 hover:border-green-400"
						}`}
					>
						<div className="flex items-center gap-2">
							<suggestion.icon className="h-4 w-4 text-gray-700" />
							<div className="text-left">
								<p className="text-sm font-bold">${suggestion.amount}</p>
								<p className="text-xs text-gray-600">{suggestion.reason}</p>
							</div>
						</div>

						<div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
							💡 {suggestion.benefit}
							<div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
						</div>
					</motion.button>
				))}
			</div>
		</motion.div>
	);
}
