"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface GasAlertProps {
	gasPrice: number;
	threshold?: number;
	averageGas?: number;
}

export function GasAlert({ gasPrice, threshold = 50, averageGas = 25 }: GasAlertProps) {
	const isHigh = gasPrice > threshold;

	if (!isHigh) {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
				exit={{ opacity: 0, height: 0 }}
				className="mb-4 rounded-xl border-2 border-orange-200 bg-orange-50 p-4"
			>
				<div className="flex items-start gap-3">
					<AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
					<div className="flex-1">
						<p className="mb-1 font-bold text-orange-900">⚠️ High Gas Alert</p>
						<p className="mb-2 text-sm text-orange-800">
							Network gas is currently <strong>{gasPrice} gwei</strong>. Consider waiting for lower fees or bridging a
							larger amount.
						</p>
						<div className="flex items-center gap-2 text-xs text-orange-700">
							<TrendingUp className="h-3 w-3" />
							<span>Average gas: ~{averageGas} gwei</span>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
