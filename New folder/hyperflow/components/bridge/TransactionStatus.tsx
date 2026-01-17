'use client';

import type { BridgeState } from '@/lib/types';
import { CheckCircle2, ExternalLink, XCircle } from 'lucide-react';
import { LiveProgress } from './LiveProgress';
import { ShareButton } from '../ShareButton';
import { SuccessConfetti } from './SuccessConfetti';

interface TransactionStatusProps {
	state: BridgeState;
	onReset: () => void;
	shareDetails?: {
		amount: string;
		estimatedTime?: number;
		gasCost?: string;
	} | null;
}

export function TransactionStatus({ state, onReset, shareDetails }: TransactionStatusProps) {
	if (state.status === 'idle' || state.status === 'fetching-routes' || state.status === 'ready') {
		return null;
	}

	const parsedShareAmount = shareDetails?.amount ? Number.parseFloat(shareDetails.amount) : undefined;
	const normalizedShareAmount = typeof parsedShareAmount === 'number' && Number.isFinite(parsedShareAmount)
		? parsedShareAmount.toFixed(2)
		: undefined;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6">
				{state.status === 'executing' ? (
					<div className="text-center">
						<h3 className="mb-6 text-xl font-bold">Bridge in Progress</h3>
						<LiveProgress txHash={state.txHash} />
						<p className="mt-6 text-sm text-gray-600">Please keep this window open...</p>
					</div>
				) : null}

				{state.status === 'success' ? (
					<>
						<SuccessConfetti />
						<div className="text-center">
							<CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
							<h3 className="mb-2 text-xl font-bold">Bridge Successful! 🎉</h3>
							<p className="mb-4 text-gray-600">
								Your funds are now on HyperEVM and ready to trade on Hyperliquid
							</p>
							{state.txHash ? (
								<a
									href={`https://explorer.hyperliquid.xyz/tx/${state.txHash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="mb-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
								>
									View transaction
									<ExternalLink className="h-4 w-4" />
								</a>
							) : null}
              {shareDetails ? (
                <div className="mb-4 flex justify-center">
                  <ShareButton
                    amount={normalizedShareAmount}
                    time={shareDetails.estimatedTime}
                    gasSaved={shareDetails.gasCost}
                  />
                </div>
              ) : null}
							<button
								onClick={onReset}
								className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
							>
								Bridge More
							</button>
						</div>
					</>
				) : null}

				{state.status === 'error' ? (
					<div className="text-center">
						<XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
						<h3 className="mb-2 text-xl font-bold">Transaction Failed</h3>
						<p className="mb-4 text-gray-600">{state.error ?? 'Unknown error'}</p>
						<div className="space-y-2">
							<button
								onClick={onReset}
								className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
							>
								Try Again
							</button>
							<button
								onClick={onReset}
								className="w-full rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50"
							>
								Cancel
							</button>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
