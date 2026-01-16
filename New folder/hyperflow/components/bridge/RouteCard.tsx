'use client';

import { Clock, Fuel, TrendingUp } from 'lucide-react';
import type { RouteOption } from '@/lib/types';

interface RouteCardProps {
	route: RouteOption;
	isSelected: boolean;
	onSelect: () => void;
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
	const estimatedMinutes = Math.round(route.estimatedTime / 60);
	const gasCost = Number.parseFloat(route.gasCost);
	const toAmount = Number.parseFloat(route.toAmount) / 1e6;

	return (
		<button
			onClick={onSelect}
			className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
				isSelected
					? 'border-blue-500 bg-blue-50'
					: 'border-gray-200 hover:border-gray-300 bg-white'
			}`}
		>
			<div className="flex justify-between items-start mb-3">
				<div className="flex items-center gap-2">
					{route.steps.map((step, index) => (
						<div key={step.tool + index} className="flex items-center gap-1">
							<span className="text-xs font-medium text-gray-600">
								{step.tool}
							</span>
							{index < route.steps.length - 1 ? (
								<span className="text-gray-400">→</span>
							) : null}
						</div>
					))}
				</div>
				{isSelected ? (
					<div className="flex items-center gap-1 text-blue-600 text-sm">
						<TrendingUp className="w-4 h-4" />
						<span className="font-medium">Best</span>
					</div>
				) : null}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-center gap-2">
					<Clock className="w-4 h-4 text-gray-400" />
					<div>
						<p className="text-xs text-gray-500">Time</p>
						<p className="text-sm font-medium">~{estimatedMinutes} min</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Fuel className="w-4 h-4 text-gray-400" />
					<div>
						<p className="text-xs text-gray-500">Gas Cost</p>
						<p className="text-sm font-medium">${Number.isFinite(gasCost) ? gasCost.toFixed(2) : '0.00'}</p>
					</div>
				</div>
			</div>

			<div className="mt-3 pt-3 border-t">
				<div className="flex justify-between items-center">
					  <span className="text-xs text-gray-500">You&apos;ll receive</span>
					<span className="text-lg font-bold">
						{Number.isFinite(toAmount) ? toAmount.toFixed(2) : '0.00'} USDC
					</span>
				</div>
			</div>
		</button>
	);
}
