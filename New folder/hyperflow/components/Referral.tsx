'use client';

import { useState } from 'react';
import { Check, Copy, Gift } from 'lucide-react';

interface ReferralCardProps {
	address: string;
}

export function ReferralCard({ address }: ReferralCardProps) {
	const [copied, setCopied] = useState(false);
	const referralLink = `https://hyperflow.xyz?ref=${address?.slice(0, 8)}`;

	const copyLink = () => {
		navigator.clipboard.writeText(referralLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
			<div className="mb-2 flex items-center gap-2">
				<Gift className="h-5 w-5" />
				<h3 className="font-bold">Earn Rewards</h3>
			</div>
			<p className="mb-3 text-sm opacity-90">
				Share HyperFlow and earn 0.1% of your referrals' bridge volume
			</p>
			<button
				onClick={copyLink}
				className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 font-medium text-purple-600 transition hover:bg-gray-100"
			>
				{copied ? (
					<>
						<Check className="h-4 w-4" />
						Copied!
					</>
				) : (
					<>
						<Copy className="h-4 w-4" />
						Copy Referral Link
					</>
				)}
			</button>
		</div>
	);
}
