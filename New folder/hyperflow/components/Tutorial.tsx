"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const STEPS = [
	{
		title: "Welcome to HyperFlow! 👋",
		description: "Bridge to Hyperliquid in seconds with AI-powered routing",
		image: "🚀",
	},
	{
		title: "Smart Route Selection",
		description: "Our AI analyzes all routes and recommends the best one for your amount",
		image: "🤖",
	},
	{
		title: "Auto-Deposit to Trading",
		description: "Enable auto-deposit to have funds ready to trade on Hyperliquid instantly",
		image: "⚡",
	},
	{
		title: "You're Ready!",
		description: "Connect your wallet and start bridging to Hyperliquid",
		image: "🎯",
	},
] as const;

export function Tutorial({ onComplete }: { onComplete: () => void }) {
	const [step, setStep] = useState(0);
	const [show, setShow] = useState(
		typeof window !== "undefined" && !localStorage.getItem("hyperflow_tutorial_done"),
	);

	const handleComplete = () => {
		localStorage.setItem("hyperflow_tutorial_done", "true");
		setShow(false);
		onComplete();
	};

	if (!show) return null;

	const currentStep = STEPS[step];

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
				>
					<div className="relative">
						<button
							onClick={handleComplete}
							className="absolute right-4 top-4 z-10 rounded-lg p-2 transition-colors hover:bg-gray-100"
						>
							<X className="h-5 w-5" />
						</button>

						<div className="p-8 text-center">
							<motion.div key={step} initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6 text-8xl">
								{currentStep.image}
							</motion.div>

							<motion.div key={`content-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
								<h2 className="mb-3 text-2xl font-bold">{currentStep.title}</h2>
								<p className="mb-6 text-gray-600">{currentStep.description}</p>
							</motion.div>

							<div className="mb-6 flex justify-center gap-1">
								{STEPS.map((_, index) => (
									<div
										key={index}
										className={`h-2 rounded-full transition-all ${index === step ? "w-8 bg-blue-600" : "w-2 bg-gray-300"}`}
									/>
								))}
							</div>

							{step < STEPS.length - 1 ? (
								<button
									onClick={() => setStep(step + 1)}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-bold text-white transition-shadow hover:shadow-lg"
								>
									Next
									<ArrowRight className="h-5 w-5" />
								</button>
							) : (
								<button
									onClick={handleComplete}
									className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 font-bold text-white transition-shadow hover:shadow-lg"
								>
									Let's Go! 🚀
								</button>
							)}

							<button onClick={handleComplete} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
								Skip tutorial
							</button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
