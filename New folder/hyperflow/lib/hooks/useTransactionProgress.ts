"use client";

import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";

interface ProgressStep {
	name: string;
	status: "pending" | "active" | "complete" | "error";
	txHash?: string;
	timestamp?: number;
}

export function useTransactionProgress(txHash?: string) {
	const [steps, setSteps] = useState<ProgressStep[]>([
		{ name: "Initiating Bridge", status: "pending" },
		{ name: "Swapping on Origin Chain", status: "pending" },
		{ name: "Crossing Bridge", status: "pending" },
		{ name: "Receiving on HyperEVM", status: "pending" },
		{ name: "Depositing to HyperCore", status: "pending" },
	]);

	const publicClient = usePublicClient();

	useEffect(() => {
		if (!txHash) return;

		const trackProgress = async () => {
			setSteps(prev =>
				prev.map((step, i) =>
					i === 0
						? { ...step, status: "active", timestamp: Date.now() }
						: step,
				),
			);

			await new Promise(resolve => setTimeout(resolve, 2000));

			setSteps(prev =>
				prev.map((step, i) =>
					i === 0
						? { ...step, status: "complete", txHash }
						: i === 1
							? { ...step, status: "active", timestamp: Date.now() }
							: step,
				),
			);

			await new Promise(resolve => setTimeout(resolve, 3000));

			setSteps(prev =>
				prev.map((step, i) =>
					i === 1
						? { ...step, status: "complete" }
						: i === 2
							? { ...step, status: "active", timestamp: Date.now() }
							: step,
				),
			);

			await new Promise(resolve => setTimeout(resolve, 4000));

			setSteps(prev =>
				prev.map((step, i) =>
					i === 2
						? { ...step, status: "complete" }
						: i === 3
							? { ...step, status: "active", timestamp: Date.now() }
							: step,
				),
			);

			await new Promise(resolve => setTimeout(resolve, 2000));

			setSteps(prev =>
				prev.map((step, i) =>
					i === 3
						? { ...step, status: "complete" }
						: i === 4
							? { ...step, status: "active", timestamp: Date.now() }
							: step,
				),
			);

			await new Promise(resolve => setTimeout(resolve, 2000));

			setSteps(prev => prev.map(step => ({ ...step, status: "complete" })));
		};

		trackProgress();
	}, [txHash]);

	return steps;
}
