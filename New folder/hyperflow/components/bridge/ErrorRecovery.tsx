
"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, ExternalLink } from "lucide-react";

interface ErrorRecoveryProps {
	error: string;
	onRetry: () => void;
	txHash?: string;
}

const DEFAULT_SUGGESTION = {
	title: "Transaction Failed",
	suggestion: "Check network status and try again",
	action: "Reach out to support if the issue persists",
};

const HINTS: Array<{ keyword: RegExp; title: string; suggestion: string; action: string }> = [
	{
		keyword: /insufficient/i,
		title: "Insufficient Balance",
		suggestion: "Make sure you have enough tokens and ETH for gas",
		action: "Add funds to your wallet",
	},
	{
		keyword: /rejected|denied|declined/i,
		title: "Transaction Rejected",
		suggestion: "You declined the transaction in your wallet",
		action: "Try again and approve the transaction",
	},
	{
		keyword: /slippage/i,
		title: "Slippage Too High",
		suggestion: "Price moved too much during the transaction",
		action: "Try a smaller amount or wait for lower congestion",
	},
];

function resolveSuggestion(message: string) {
	const match = HINTS.find((hint) => hint.keyword.test(message));
	if (!match) {
		return {
			...DEFAULT_SUGGESTION,
			suggestion: message || DEFAULT_SUGGESTION.suggestion,
		};
	}
	return match;
}

export function ErrorRecovery({ error, onRetry, txHash }: ErrorRecoveryProps) {
	const { title, suggestion, action } = resolveSuggestion(error);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="rounded-2xl border-2 border-red-200 bg-red-50 p-6"
		>
			<div className="mb-4 flex items-start gap-3">
				<div className="rounded-lg bg-red-100 p-2">
					<AlertTriangle className="h-6 w-6 text-red-600" />
				</div>
				<div className="flex-1">
					<h3 className="mb-1 font-bold text-red-900">{title}</h3>
					<p className="mb-2 text-sm text-red-700">{suggestion}</p>
					<p className="text-xs italic text-red-600">💡 {action}</p>
				</div>
			</div>

			<div className="flex gap-2">
				<button
					type="button"
					onClick={onRetry}
					className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
				>
					<RefreshCw className="h-4 w-4" />
					Try Again
				</button>

				{txHash ? (
					<a
						href={`https://etherscan.io/tx/${txHash}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-300 bg-white px-4 py-3 font-semibold text-red-700 transition-colors hover:bg-red-50"
					>
						<ExternalLink className="h-4 w-4" />
						View
					</a>
				) : null}
			</div>

			<div className="mt-4 rounded-lg bg-white p-3">
				<p className="mb-2 text-xs font-medium text-gray-600">Need help?</p>
				<div className="flex gap-2 text-xs">
					<a href="https://discord.gg/hyperliquid" className="text-blue-600 hover:underline">
						Join Discord
					</a>
					<span className="text-gray-300">•</span>
					<a href="https://docs.li.fi" className="text-blue-600 hover:underline">
						LI.FI Docs
					</a>
				</div>
			</div>
		</motion.div>
	);
}
