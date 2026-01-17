"use client";

import { motion } from "framer-motion";
import { Twitter } from "lucide-react";

interface ShareButtonProps {
	amount?: string;
	time?: number;
	gasSaved?: string;
}

export function ShareButton({ amount, time, gasSaved }: ShareButtonProps) {
	const handleShare = () => {
		const minutes = Math.max(1, Math.round(((time ?? 120) || 120) / 60));
		const saved = gasSaved ?? "15";
		const baseMessage = amount
			? `Just bridged $${amount} to @HyperliquidX in ${minutes} minutes using @HyperFlowApp 🚀\n\nSaved $${saved} in gas fees with AI-powered routing!\n\n`
			: `Check out @HyperFlowApp - the fastest way to bridge to @HyperliquidX! 🚀\n\n`;

		const url = "https://hyperflow.xyz";
		const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(baseMessage)}&url=${encodeURIComponent(url)}`;

		window.open(tweetUrl, "_blank", "width=550,height=420");
	};

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleShare}
			className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
		>
			<Twitter className="h-4 w-4" />
			Share on Twitter
		</motion.button>
	);
}
