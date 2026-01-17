"use client";

import { useState } from "react";
import { Copy, Check, Gift, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function ReferralCard({ address }: { address?: string }) {
	const [copied, setCopied] = useState(false);
	const referralLink = `https://hyperflow.xyz?ref=${address?.slice(0, 8) || "demo"}`;
	const earnings = 12.5;
	const referrals = 5;

	const copyLink = () => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 text-white shadow-2xl"
		>
			<div className="mb-4 flex items-center gap-3">
				<div className="rounded-xl bg-white/20 p-3 backdrop-blur">
					<Gift className="h-6 w-6" />
				</div>
				<div>
					<h3 className="text-lg font-bold">Earn with HyperFlow</h3>
					<p className="text-sm opacity-90">Get 0.1% of referral volume</p>
				</div>
			</div>

			<div className="mb-4 grid grid-cols-2 gap-4">
				<div className="rounded-xl bg-white/10 p-3 backdrop-blur">
					<div className="mb-1 flex items-center gap-2">
						<Users className="h-4 w-4" />
						<p className="text-xs opacity-80">Referrals</p>
					</div>
					<p className="text-2xl font-bold">{referrals}</p>
				</div>
				<div className="rounded-xl bg-white/10 p-3 backdrop-blur">
					<div className="mb-1 flex items-center gap-2">
						<DollarSign className="h-4 w-4" />
						<p className="text-xs opacity-80">Earned</p>
					</div>
					<p className="text-2xl font-bold">${earnings.toFixed(2)}</p>
				</div>
			</div>

			<button
				onClick={copyLink}
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-purple-600 transition-colors hover:bg-gray-100"
			>
				{copied ? (
					<>
						<Check className="h-5 w-5" />
						Link Copied!
					</>
				) : (
					<>
						<Copy className="h-5 w-5" />
						Copy Referral Link
					</>
				)}
			</button>

			<p className="mt-3 text-center text-xs opacity-75">Share with friends and earn on every bridge 🚀</p>
		</motion.div>
	);
}
