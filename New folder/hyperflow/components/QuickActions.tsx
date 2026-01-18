'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, History, Settings, Share2, Zap } from 'lucide-react';

type QuickAction =
	| { icon: typeof History; label: string; href: string }
	| { icon: typeof Share2; label: string; action: 'share' | 'settings'; onClick?: () => void };

const QUICK_ACTIONS: QuickAction[] = [
	{ icon: History, label: 'History', href: '/analytics' },
	{ icon: Award, label: 'Leaderboard', href: '/leaderboard' },
	{ icon: Share2, label: 'Referrals', action: 'share' },
	{ icon: Settings, label: 'Settings', action: 'settings' },
];

export function QuickActions() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="fixed bottom-24 right-6 z-40">
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						className="absolute bottom-16 right-0 min-w-[180px] space-y-2 rounded-2xl border-2 border-gray-200 bg-white p-3 shadow-2xl"
					>
						{QUICK_ACTIONS.map((action, index) => {
							const Icon = action.icon;
							return (
								<motion.div
									key={action.label}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.05 }}
								>
									{inQuickLink(action) ? (
										<Link
											href={action.href}
											className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
										>
											<Icon className="h-5 w-5 text-gray-600" />
											<span>{action.label}</span>
										</Link>
									) : (
										<button
											type="button"
											onClick={action.onClick}
											className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
										>
											<Icon className="h-5 w-5 text-gray-600" />
											<span>{action.label}</span>
										</button>
									)}
								</motion.div>
							);
						})}
					</motion.div>
				) : null}
			</AnimatePresence>

			<motion.button
				whileTap={{ scale: 0.9 }}
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-xl transition-shadow hover:shadow-2xl"
				aria-label="Toggle quick actions"
			>
				<motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
					<Zap className="h-6 w-6" />
				</motion.div>
			</motion.button>
		</div>
	);
}

function inQuickLink(action: QuickAction): action is Extract<QuickAction, { href: string }> {
	return 'href' in action;
}
