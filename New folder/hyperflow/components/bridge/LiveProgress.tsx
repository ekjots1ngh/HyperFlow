"use client";

import { useTransactionProgress } from "@/lib/hooks/useTransactionProgress";
import { CheckCircle, Circle, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type ProgressStatus = "pending" | "active" | "complete" | "error";

interface LiveProgressProps {
	txHash?: string;
}

export function LiveProgress({ txHash }: LiveProgressProps) {
	const steps = useTransactionProgress(txHash);

	const getIcon = (status: ProgressStatus) => {
		switch (status) {
			case "complete":
				return <CheckCircle className="h-5 w-5 text-green-600" />;
			case "active":
				return <Loader2 className="h-5 w-5 animate-spin text-blue-600" />;
			case "error":
				return <Circle className="h-5 w-5 text-red-500" />;
			default:
				return <Circle className="h-5 w-5 text-gray-300" />;
		}
	};

	const getElapsedTime = (timestamp?: number) => {
		if (!timestamp) return "";
		const elapsed = Math.floor((Date.now() - timestamp) / 1000);
		return `${elapsed}s`;
	};

	return (
		<div className="space-y-3">
			{steps.map((step, index) => (
				<motion.div
					key={step.name}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="flex items-center gap-3"
				>
					<div className="flex-shrink-0">{getIcon(step.status)}</div>

					<div className="flex-1">
						<div className="flex items-center justify-between">
							<p
								className={`font-medium ${
									step.status === "complete"
										? "text-green-700"
										: step.status === "active"
												? "text-blue-700"
												: step.status === "error"
														? "text-red-600"
														: "text-gray-500"
								}`}
							>
								{step.name}
							</p>

							{step.status === "active" && (
								<span className="text-xs font-medium text-blue-600">
									{getElapsedTime(step.timestamp)}
								</span>
							)}

							{step.status === "complete" && step.txHash && (
								<a
									href={`https://etherscan.io/tx/${step.txHash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
								>
									View <ExternalLink className="h-3 w-3" />
								</a>
							)}
						</div>

						{step.status === "active" && (
							<div className="mt-1 h-1 overflow-hidden rounded-full bg-gray-200">
								<motion.div
									className="h-full bg-blue-600"
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 2, ease: "linear" }}
								/>
							</div>
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
}
