"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

interface StatEntry {
	icon: typeof DollarSign;
	label: string;
	value: string;
	change: string;
}

const stats: StatEntry[] = [
	{ icon: DollarSign, label: "Total Volume", value: "$2.4M", change: "+156%" },
	{ icon: Users, label: "Active Users", value: "1,247", change: "+89%" },
	{ icon: Zap, label: "Bridges Completed", value: "5,832", change: "+234%" },
	{ icon: TrendingUp, label: "Avg Time Saved", value: "12 min", change: "85%" },
];

export function StatsBanner() {
	return (
		<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-12">
			<div className="mx-auto max-w-6xl">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
					<h2 className="mb-2 text-3xl font-bold text-white">Trusted by Thousands</h2>
					<p className="text-blue-100">The fastest way to bridge to Hyperliquid</p>
				</motion.div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-lg"
						>
							<stat.icon className="mx-auto mb-3 h-8 w-8 text-white" />
							<p className="mb-1 text-3xl font-bold text-white">{stat.value}</p>
							<p className="mb-2 text-sm text-blue-100">{stat.label}</p>
							<span className="text-xs font-semibold text-green-300">{stat.change} this week</span>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					className="mt-8 text-center"
				>
					<p className="text-sm text-white">⚡ Powered by LI.FI • 🏆 Winner of Innovation Award</p>
				</motion.div>
			</div>
		</div>
	);
}
