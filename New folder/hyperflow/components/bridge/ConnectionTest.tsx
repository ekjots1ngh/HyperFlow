'use client';

import { useState } from 'react';
import { getChains } from '@lifi/sdk';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function ConnectionTest() {
	const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
	const [error, setError] = useState('');

	const testConnection = async () => {
		setStatus('testing');
		try {
			const chains = await getChains();
			const hasHyperEVM = chains.some((chain) => chain.id === 998);
			if (hasHyperEVM) {
				setStatus('success');
			} else {
				setStatus('error');
				setError('HyperEVM not found in LI.FI chains');
			}
		} catch (errorLike) {
			setStatus('error');
			setError(errorLike instanceof Error ? errorLike.message : 'Failed to fetch chains');
		}
	};

	if (process.env.NODE_ENV !== 'development') {
		return null;
	}

	return (
		<div className="fixed bottom-4 left-4 z-50">
			<button
				onClick={testConnection}
				disabled={status === 'testing'}
				className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white"
			>
				{status === 'testing' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
				{status === 'success' ? <CheckCircle className="h-4 w-4 text-green-400" /> : null}
				{status === 'error' ? <XCircle className="h-4 w-4 text-red-400" /> : null}
				{status === 'idle' ? 'Test LI.FI' : status === 'success' ? 'LI.FI OK' : 'LI.FI Error'}
			</button>
			{error ? <p className="mt-1 max-w-xs text-xs text-red-400">{error}</p> : null}
		</div>
	);
}
