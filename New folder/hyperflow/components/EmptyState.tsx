'use client';

import { motion } from 'framer-motion';

interface EmptyStateProps {
	icon: string;
	title: string;
	description: string;
	action?: {
		label: string;
		onClick: () => void;
	};
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			className="px-6 py-12 text-center"
		>
			<motion.div
				animate={{
					y: [0, -10, 0],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="mb-4 text-6xl"
			>
				{icon}
			</motion.div>
			<h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
			<p className="mb-6 mx-auto max-w-sm text-gray-600">{description}</p>
			{action ? (
				<button
					onClick={action.onClick}
					className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
				>
					{action.label}
				</button>
			) : null}
		</motion.div>
	);
}
