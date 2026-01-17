"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FaqEntry = {
	q: string;
	a: string;
};

const faqs: FaqEntry[] = [
	{
		q: "How long does bridging take?",
		a: "Most bridges complete in 2-5 minutes. The exact time depends on network congestion and the route selected.",
	},
	{
		q: "Is HyperFlow safe?",
		a: "Yes! HyperFlow uses LI.FI, a battle-tested bridge aggregator trusted by thousands. All transactions are non-custodial and secure.",
	},
	{
		q: "What are the fees?",
		a: "Fees include network gas (varies by chain) and bridge protocol fees. HyperFlow itself takes no additional fees. Our AI helps you find the cheapest route.",
	},
	{
		q: "Can I bridge from any chain?",
		a: "HyperFlow supports Ethereum, Arbitrum, Optimism, Polygon, and Base. More chains coming soon!",
	},
	{
		q: "What if my transaction fails?",
		a: "HyperFlow includes automatic retry logic and clear error messages. If a bridge fails, your funds remain safe on the origin chain.",
	},
	{
		q: "Do I need ETH for gas?",
		a: "Yes, you need the native gas token of your origin chain (ETH for Ethereum, MATIC for Polygon, etc.). HyperFlow shows you exactly how much gas you need.",
	},
];

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="bg-white px-4 py-16">
			<div className="mx-auto max-w-3xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h2>
					<p className="text-gray-600">Everything you need to know about HyperFlow</p>
				</motion.div>

				<div className="space-y-3">
					{faqs.map((faq, index) => (
						<motion.div
							key={faq.q}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="overflow-hidden rounded-xl border-2 border-gray-200"
						>
							<button
								type="button"
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
							>
								<span className="text-left font-semibold">{faq.q}</span>
								<motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
									<ChevronDown className="h-5 w-5 text-gray-400" />
								</motion.div>
							</button>

							<AnimatePresence initial={false}>
								{openIndex === index ? (
									<motion.div
										key="answer"
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<p className="px-6 pb-4 text-sm leading-relaxed text-gray-600">{faq.a}</p>
									</motion.div>
								) : null}
							</AnimatePresence>
						</motion.div>
					))}
				</div>

				<div className="mt-8 text-center">
					<p className="mb-3 text-sm text-gray-600">Still have questions?</p>
					<a
						href="https://discord.gg/hyperliquid"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
					>
						Join our Discord
					</a>
				</div>
			</div>
		</div>
	);
}
