"use client";

import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

interface SpeedEstimateProps {
	estimatedTime: number;
}

export function SpeedEstimate({ estimatedTime }: SpeedEstimateProps) {
	const minutes = Math.max(1, Math.ceil(estimatedTime / 60));
	const isFast = minutes <= 3;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
				isFast ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
			}`}
		>
			{isFast ? <Zap className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
			<div>
				<p className="text-xs font-medium">{isFast ? "⚡ Lightning Fast" : "🚀 Standard Speed"}</p>
				<p className="text-xs opacity-80">
					~{minutes} {minutes === 1 ? "minute" : "minutes"}
				</p>
			</div>

			{isFast ? (
				<div className="ml-auto">
					<span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">FAST</span>
				</div>
			) : null}
		</motion.div>
	);
}
