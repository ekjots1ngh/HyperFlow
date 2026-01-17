'use client';

import { Award, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '@/lib/achievements';

export function Achievements() {
	return (
		<div className="grid gap-4">
			{ACHIEVEMENTS.map((achievement) => {
				const completion = Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100));
				const formattedProgress = `${achievement.progress} / ${achievement.maxProgress}`;
				return (
					<div
						key={achievement.id}
						className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200"
					>
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-base font-semibold text-gray-900">{achievement.name}</h3>
								<p className="mt-1 text-sm text-gray-500">{achievement.description}</p>
							</div>
							<span
								className={`flex h-9 w-9 items-center justify-center rounded-full ${
									achievement.unlocked ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
								}`}
							>
								{achievement.unlocked ? <Award className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
							</span>
						</div>
						<div className="mt-4">
							<div className="h-2 w-full rounded-full bg-gray-200">
								<div
									className={`h-full rounded-full ${achievement.unlocked ? 'bg-blue-600' : 'bg-blue-300'}`}
									style={{ width: `${completion}%` }}
								/>
							</div>
							<div className="mt-2 flex items-center justify-between text-xs text-gray-500">
								<span>{formattedProgress}</span>
								<span>{achievement.unlocked ? 'Unlocked' : `${completion}%`}</span>
							</div>
							{achievement.reward ? (
								<p className="mt-3 text-xs font-medium text-blue-600">{achievement.reward}</p>
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
}
