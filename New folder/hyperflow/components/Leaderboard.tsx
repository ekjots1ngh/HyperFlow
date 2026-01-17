"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";

const topBridgers = [
	{ rank: 1, address: "0x742d...4e89", volume: 125000, bridges: 234, badge: "🐋" },
	{ rank: 2, address: "0x8f3c...2b91", volume: 98000, bridges: 189, badge: "🦈" },
	{ rank: 3, address: "0x1a4f...7c23", volume: 76000, bridges: 156, badge: "🐬" },
	{ rank: 4, address: "0x6d2e...9f41", volume: 54000, bridges: 98, badge: "🐠" },
	{ rank: 5, address: "0x9b7a...3d12", volume: 42000, bridges: 87, badge: "🦐" },
];

export function Leaderboard() {
	return (
		<div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<Trophy className="w-6 h-6 text-yellow-600" />
					<h2 className="text-2xl font-bold">Top Bridgers</h2>
				</div>
				<span className="text-xs text-gray-500">Last 7 days</span>
			</div>

			<div className="space-y-3">
				{topBridgers.map((bridger, index) => (
					<motion.div
						key={bridger.address}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
						className={`flex items-center gap-4 p-4 rounded-xl ${
							bridger.rank === 1
								? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300"
								: bridger.rank === 2
										? "bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300"
										: bridger.rank === 3
												? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300"
												: "bg-gray-50 border-2 border-gray-200"
						}`}
					>
						<div className="flex-shrink-0 w-8 text-center">
							{bridger.rank <= 3 ? (
								<span className="text-2xl">{bridger.rank === 1 ? "🥇" : bridger.rank === 2 ? "🥈" : "🥉"}</span>
							) : (
								<span className="text-xl font-bold text-gray-400">#{bridger.rank}</span>
							)}
						</div>

						<div className="text-3xl">{bridger.badge}</div>

						<div className="flex-1">
							<p className="font-mono text-sm font-medium text-gray-900">{bridger.address}</p>
							<div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
								<span className="flex items-center gap-1">
									<TrendingUp className="w-3 h-3" />
									{bridger.bridges} bridges
								</span>
								<span>•</span>
								<span className="font-bold text-green-600">${bridger.volume.toLocaleString()}</span>
							</div>
						</div>

						{bridger.rank === 1 && (
							<div className="flex-shrink-0">
								<span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
									👑 WHALE
								</span>
							</div>
						)}
					</motion.div>
				))}
			</div>

			<div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
				<p className="text-sm font-medium text-blue-900">
					🏆 Bridge more to climb the leaderboard and earn exclusive badges!
				</p>
			</div>
		</div>
	);
}
