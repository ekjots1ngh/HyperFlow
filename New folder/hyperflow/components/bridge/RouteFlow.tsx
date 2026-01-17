'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import type { RouteOption } from '@/lib/types';

interface RouteFlowProps {
	route?: RouteOption;
}

export function RouteFlow({ route }: RouteFlowProps) {
	if (!route || !route.steps) {
		return null;
	}

	return (
		<div className="relative px-4 py-6">
			<div className="relative flex items-center justify-between">
				<div className="absolute left-0 right-0 top-6 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" style={{ zIndex: 0 }} />
				{route.steps.map((step, index) => (
					<motion.div
						key={`${step.tool}-${index}`}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: index * 0.2, type: 'spring' }}
						className="relative z-10 flex flex-1 flex-col items-center"
					>
						<motion.div
							whileHover={{ scale: 1.1 }}
							className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
						>
							{index === 0 ? '🚀' : index === route.steps.length - 1 ? '🎯' : <Zap className="h-5 w-5" />}
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 + 0.1 }}
							className="mt-3 text-center"
						>
							<p className="text-xs font-bold text-gray-900">{step.tool}</p>
							<p className="mt-0.5 text-xs text-gray-500">{step.type === 'swap' ? '🔄 Swap' : '🌉 Bridge'}</p>
						</motion.div>
						{index < route.steps.length - 1 ? (
							<motion.div
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.2 + 0.3 }}
								className="absolute left-full top-6 -translate-x-1/2 -translate-y-1/2"
							>
								<ArrowRight className="h-4 w-4 text-purple-400" />
							</motion.div>
						) : null}
					</motion.div>
				))}
			</div>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="mt-6 rounded-lg bg-gray-50 p-3 text-center"
			>
				<p className="text-xs text-gray-600">{route.steps.length}-step route • Powered by LI.FI</p>
			</motion.div>
		</div>
	);
}
