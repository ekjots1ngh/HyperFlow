'use client';

import { motion } from 'framer-motion';
import type { RouteOption } from '@/lib/types';

interface RouteFlowProps {
	route: RouteOption;
}

export function RouteFlow({ route }: RouteFlowProps) {
	return (
		<div className="relative py-8">
			<svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
				<motion.path
					d="M 50 50 Q 200 50 200 100 T 350 100"
					stroke="url(#route-flow-gradient)"
					strokeWidth="3"
					fill="none"
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 2, ease: 'easeInOut' }}
				/>
				<defs>
					<linearGradient id="route-flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="100%" stopColor="#8b5cf6" />
					</linearGradient>
				</defs>
			</svg>

			<div className="relative flex items-center justify-between px-4">
				{route.steps.map((step, index) => (
					<motion.div
						key={`${step.tool}-${index}`}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: index * 0.3 }}
						className="flex flex-col items-center"
					>
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white shadow-lg">
							{index + 1}
						</div>
						<span className="mt-2 text-xs font-medium text-gray-700">{step.tool}</span>
					</motion.div>
				))}
			</div>
		</div>
	);
}
