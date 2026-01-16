'use client';

import type { MouseEventHandler } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
	onMenuClick?: MouseEventHandler<HTMLButtonElement>;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
	return (
		<div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-lg">
			<div className="flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-3">
					<button
						onClick={onMenuClick}
						className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
						type="button"
					>
						<Menu className="h-5 w-5" />
					</button>
					<h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
						HyperFlow
					</h1>
				</div>
				<ConnectButton chainStatus="icon" showBalance={false} />
			</div>
		</div>
	);
}
