"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialEntry {
	name: string;
	role: string;
	avatar: string;
	text: string;
	rating: number;
}

const testimonials: TestimonialEntry[] = [
	{
		name: "Alex Chen",
		role: "DeFi Trader",
		avatar: "👨‍💼",
		text: "HyperFlow cut my onboarding time from 20 minutes to under 2. Game changer for active trading.",
		rating: 5,
	},
	{
		name: "Sarah Lopez",
		role: "Crypto Investor",
		avatar: "👩‍💻",
		text: "The AI route recommendations saved me $50 in gas last month. So smart!",
		rating: 5,
	},
	{
		name: "Mike Johnson",
		role: "Protocol Builder",
		avatar: "🧑‍🔬",
		text: "Integrated the SDK in 5 minutes. Our users love the seamless experience.",
		rating: 5,
	},
];

export function Testimonials() {
	return (
		<div className="bg-gray-50 px-4 py-16">
			<div className="mx-auto max-w-6xl">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
					<h2 className="mb-2 text-3xl font-bold">Loved by Traders</h2>
					<p className="text-gray-600">See what users are saying</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="rounded-2xl bg-white p-6 shadow-lg"
						>
							<div className="mb-4 flex gap-1">
								{Array.from({ length: testimonial.rating }).map((_, i) => (
									<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								))}
							</div>

							<p className="mb-4 italic text-gray-700">"{testimonial.text}"</p>

							<div className="flex items-center gap-3">
								<div className="text-3xl">{testimonial.avatar}</div>
								<div>
									<p className="font-bold text-gray-900">{testimonial.name}</p>
									<p className="text-sm text-gray-600">{testimonial.role}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
