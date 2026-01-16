'use client';

import { useEffect, useState } from 'react';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
}

export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light') {
	if ('vibrate' in navigator) {
		const patterns: Record<'light' | 'medium' | 'heavy', number> = {
			light: 10,
			medium: 20,
			heavy: 30,
		};
		navigator.vibrate(patterns[type]);
	}
}

export function isStandalone() {
	if (typeof window === 'undefined') {
		return false;
	}
	return window.matchMedia('(display-mode: standalone)').matches;
}
