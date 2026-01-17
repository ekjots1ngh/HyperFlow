"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StatsCardProps {
	icon: ReactNode;
	title: string;
	value: string | number;
	change: string;
	color: "blue" | "green" | "purple" | "orange";
}

const COLORS: Record<StatsCardProps["color"], string> = {
	blue: "from-blue-500 to-cyan-500",
	green: "from-green-500 to-emerald-500",
	purple: "from-purple-500 to-pink-500",
	orange: "from-orange-500 to-red-500",
};

export function StatsCard({ icon, title, value, change, color }: StatsCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -5 }}
			className="rounded-xl border-2 border-gray-100 bg-white p-6 shadow-lg"
		>
			<div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${COLORS[color]} text-white`}> 
				{icon}
			</div>
			<p className="mb-1 text-sm text-gray-600">{title}</p>
			<p className="mb-1 text-3xl font-bold text-gray-900">{value}</p>
			<p className="text-xs font-medium text-green-600">{change}</p>
		</motion.div>
	);
}

