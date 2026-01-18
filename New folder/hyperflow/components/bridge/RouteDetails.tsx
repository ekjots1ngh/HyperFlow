"use client";

import { motion } from 'framer-motion';
import { X, ExternalLink, AlertCircle } from 'lucide-react';

interface RouteDetailsProps {
	route: any;
	isOpen: boolean;
	onClose: () => void;
}

export function RouteDetails({ route, isOpen, onClose }: RouteDetailsProps) {
	if (!isOpen) return null;

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				onClick={onClose}
				className="fixed inset-0 bg-black/50 z-50"
			/>
      
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
			>
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-xl font-bold">Route Details</h3>
						<button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="space-y-4">
						{route.steps.map((step: any, i: number) => (
							<div key={i} className="p-4 bg-gray-50 rounded-xl">
								<div className="flex items-center justify-between mb-2">
									<span className="font-bold">Step {i + 1}: {step.type}</span>
									<span className="text-xs text-gray-600">{step.tool}</span>
								</div>
								<div className="text-sm space-y-1">
									<p>From: {step.fromToken.symbol}</p>
									<p>To: {step.toToken.symbol}</p>
									<p className="text-gray-600">
										Time: ~{Math.round((step.estimate?.executionDuration || 60) / 60)} min
									</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 p-4 bg-blue-50 rounded-xl">
						<div className="flex items-start gap-2">
							<AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
							<div className="text-sm text-blue-900">
								<p className="font-semibold mb-1">Security Note</p>
								<p>All bridges are secured by LI.FI's battle-tested infrastructure. Your funds never leave your control.</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
