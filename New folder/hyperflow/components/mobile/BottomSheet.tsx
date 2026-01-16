'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { triggerHaptic } from '@/lib/utils/mobile';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			triggerHaptic('light');
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen ? (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-40 bg-black/50"
					/>
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-hidden rounded-t-3xl bg-white"
					>
						<div className="flex justify-center pb-2 pt-3">
							<div className="h-1.5 w-12 rounded-full bg-gray-300" />
						</div>

						{title ? (
							<div className="flex items-center justify-between border-b px-6 py-3">
								<h2 className="text-lg font-bold">{title}</h2>
								<button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" type="button">
									<X className="h-5 w-5" />
								</button>
							</div>
						) : null}

						<div className="max-h-[calc(90vh-80px)] overflow-y-auto overscroll-contain">
							{children}
						</div>
					</motion.div>
				</>
			) : null}
		</AnimatePresence>
	);
}
