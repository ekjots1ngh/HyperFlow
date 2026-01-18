'use client';

import { useEffect } from 'react';

export type KeyboardShortcutHandlers = {
	focusAmount?: () => void;
	executeBridge?: () => void;
	closeModals?: () => void;
};

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				handlers.focusAmount?.();
				return;
			}

			if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
				event.preventDefault();
				handlers.executeBridge?.();
				return;
			}

			if (event.key === 'Escape') {
				handlers.closeModals?.();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [handlers]);
}
