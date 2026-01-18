"use client";

import { CheckCircle2 } from 'lucide-react';

export function BridgeGuide() {
  const steps = [
    'Confirm transaction in your wallet',
    'Wait for bridge confirmation (~2-5 min)',
    'Funds appear on HyperEVM',
    'Auto-deposit to Hyperliquid (if enabled)',
    'Start trading!',
  ];

  return (
    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
      <p className="font-semibold text-blue-900 mb-3">What happens next:</p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-blue-800">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{i + 1}. {step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
