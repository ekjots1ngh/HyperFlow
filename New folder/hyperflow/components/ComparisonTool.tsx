"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, TrendingDown, Zap } from "lucide-react";

type CompetitorTier = "red" | "yellow" | "green";

interface CompetitorStat {
	name: string;
	time: string;
	steps: number;
	gasWaste: string;
	risk: "High" | "Medium" | "Low";
	color: CompetitorTier;
}

const competitors: CompetitorStat[] = [
	{
		name: "Manual Bridging",
		time: "15-30 min",
		steps: 5,
		gasWaste: "$5-10",
		risk: "High",
		color: "red",
	},
	{
		name: "Other Aggregators",
		time: "5-10 min",
		steps: 3,
		gasWaste: "$2-5",
		risk: "Medium",
		color: "yellow",
	},
	{
		name: "HyperFlow + LI.FI",
		time: "2-3 min",
		steps: 1,
		gasWaste: "$0.50",
		risk: "Low",
		color: "green",
	},
];

const greenTier = competitors.find(entry => entry.color === "green");

export function ComparisonTool() {
	const [amount] = useState("1000");

	return (
		<div className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-xl">
			<div className="mb-6 text-center">
				<h2 className="mb-2 text-2xl font-bold">Why HyperFlow?</h2>
				<p className="text-gray-600">Bridging ${amount} USDC comparison</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{competitors.map((comp, index) => (
					<motion.div
						key={comp.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className={`rounded-xl border-2 p-4 ${
							comp.color === "green"
								? "border-green-300 bg-green-50 ring-4 ring-green-100"
								: comp.color === "yellow"
									? "border-yellow-300 bg-yellow-50"
									: "border-red-300 bg-red-50"
						}`}
					>
						{comp.color === "green" ? (
							<div className="mb-2 text-center">
								<span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
									⭐ RECOMMENDED
								</span>
							</div>
						) : null}

						<h3 className="mb-4 text-center font-bold">{comp.name}</h3>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4 text-gray-600" />
									<span className="text-sm">Time</span>
								</div>
								<span className="font-bold">{comp.time}</span>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Zap className="h-4 w-4 text-gray-600" />
									<span className="text-sm">Steps</span>
								</div>
								<span className="font-bold">{comp.steps}</span>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<TrendingDown className="h-4 w-4 text-gray-600" />
									<span className="text-sm">Gas Waste</span>
								</div>
								<span className="font-bold">{comp.gasWaste}</span>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Shield className="h-4 w-4 text-gray-600" />
									<span className="text-sm">Risk</span>
								</div>
								<span
									className={`font-bold ${
										comp.risk === "Low"
											? "text-green-600"
											: comp.risk === "Medium"
												? "text-yellow-600"
												: "text-red-600"
									}`}
								>
									{comp.risk}
								</span>
							</div>
						</div>

						{comp.color === "green" && greenTier ? (
							<div className="mt-4 rounded-lg bg-white p-2">
								<p className="text-center text-xs font-medium text-green-700">
									💰 Save ${
										parseFloat(
											competitors[0].gasWaste
												.split("-")[0]
												.replace("$", ""),
										) - parseFloat(greenTier.gasWaste.replace("$", ""))
									}
									+ in gas
								</p>
							</div>
						) : null}
					</motion.div>
				))}
			</div>

			<div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
				<p className="text-center text-sm text-blue-900">
					<strong>HyperFlow saves you 85% in time</strong> and <strong>90% in gas</strong> compared to manual
					bridging
				</p>
			</div>
		</div>
	);
}
