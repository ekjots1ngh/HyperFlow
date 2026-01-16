'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export interface HyperFlowWidgetProps {
  defaultChain?: number;
  defaultAmount?: string;
  onComplete?: (txHash: string) => void;
  onError?: (error: string) => void;
  autoDeposit?: boolean;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

export function HyperFlowWidget({
  defaultChain = 1,
  defaultAmount = '',
  onComplete,
  onError,
  autoDeposit = true,
  theme = 'light',
  compact = false,
}: HyperFlowWidgetProps) {
  useAccount();
  const [amount, setAmount] = useState(defaultAmount);

  return (
    <div
      className={`hyperflow-widget ${theme} ${compact ? 'compact' : ''}`.trim()}
      data-chain={defaultChain}
      data-auto-deposit={autoDeposit}
    >
      <div className="rounded-lg bg-white p-4 shadow">
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
          className="w-full rounded border p-2"
        />
        <button
          onClick={() => {
            try {
              onComplete?.('0x...');
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Bridge failed';
              onError?.(message);
            }
          }}
          className="mt-2 w-full rounded bg-blue-600 p-2 text-white"
          type="button"
        >
          Bridge to Hyperliquid
        </button>
      </div>
    </div>
  );
}
