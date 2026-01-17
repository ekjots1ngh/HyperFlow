"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { BridgeInterface } from "@/components/BridgeInterface";
import { TransactionHistory } from "@/components/history/TransactionHistory";
import { ReferralCard } from "@/components/Referral";

export function ClientHome() {
	const { address, isConnected } = useAccount();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []);

	if (!isReady) {
		return null;
	}

	return (
		<>
			<BridgeInterface />

			{isConnected ? (
				<div className="mx-auto mt-6 max-w-2xl px-6">
					<ReferralCard address={address} />
				</div>
			) : null}

			<TransactionHistory />
		</>
	);
}
