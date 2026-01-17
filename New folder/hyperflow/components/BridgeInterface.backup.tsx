// @ts-nocheck
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Info, Zap } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { RoutesRequest } from '@lifi/sdk';
import type { Address } from 'viem';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useRoutes } from '@/lib/hooks/useRoutes';
import { useExecuteBridge } from '@/lib/hooks/useExecuteBridge';
import { useHyperliquidDeposit } from '@/lib/hooks/useHyperliquidDeposit';
import { useTransactionStore } from '@/lib/store/transactions';
import { triggerHaptic, useIsMobile } from '@/lib/utils/mobile';
import { RouteCard } from './bridge/RouteCard';
import { SmartSuggestions } from './bridge/SmartSuggestions';
import { TransactionStatus } from './bridge/TransactionStatus';
import { BottomSheet } from './mobile/BottomSheet';
import { MobileHeader } from './mobile/MobileHeader';

const HYPER_EVM_CHAIN_ID = 999;
const ETHEREUM_USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as Address;
const HYPER_EVM_USDC_ADDRESS = '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34' as Address;
const HYPERLIQUID_USDC_SYSTEM_ADDRESS = '0x20000000000000000000000000000000000003e9' as Address;
const USDC_DECIMALS = 6;

export function BridgeInterface() {
  const { address, isConnected } = useAccount();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  const [fromChain, setFromChain] = useState<number>(1);
  const [amount, setAmount] = useState<string>('');
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [showRoutes, setShowRoutes] = useState<boolean>(false);
  const [autoDeposit, setAutoDeposit] = useState<boolean>(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mark hydration readiness after mount
    setIsMounted(true);
  }, []);

  const routeRequest = useMemo<RoutesRequest | null>(() => {
    if (!isConnected || !address) {
      return null;
    }

    const parsed = Number.parseFloat(amount);
    if (!amount || Number.isNaN(parsed) || parsed <= 0) {
      return null;
    }

    try {
      const fromAmount = parseUnits(amount, USDC_DECIMALS).toString();
      return {
        fromChainId: fromChain,
        toChainId: HYPER_EVM_CHAIN_ID,
        fromTokenAddress: ETHEREUM_USDC_ADDRESS,
        toTokenAddress: HYPER_EVM_USDC_ADDRESS,
        fromAmount,
        fromAddress: address,
      } satisfies RoutesRequest;
    } catch (error) {
      console.warn('Invalid amount for route request:', error);
      return null;
    }
  }, [address, amount, fromChain, isConnected]);

  const { routes, isLoading, error } = useRoutes(routeRequest);
  const { state: bridgeState, execute, reset: resetBridge } = useExecuteBridge();
  const { state: depositState, depositToHyperliquid, reset: resetDeposit } = useHyperliquidDeposit();
  const { addTransaction, updateTransaction } = useTransactionStore();

  const [activeTransactionContext, setActiveTransactionContext] = useState<{
    id: string;
    amount: string;
    autoDeposit: boolean;
  } | null>(null);

  const effectiveSelectedIndex = routes.length > 0 ? Math.min(selectedRouteIndex, routes.length - 1) : -1;
  const selectedRoute = effectiveSelectedIndex >= 0 ? routes[effectiveSelectedIndex] : undefined;

  const handleBridge = async () => {
    if (!selectedRoute || !address) {
      return;
    }

    const parsedAmount = Number.parseFloat(amount);
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    triggerHaptic('medium');
    resetDeposit();

    const txId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const transaction = {
      id: txId,
      timestamp: Date.now(),
      fromChain,
      toChain: HYPER_EVM_CHAIN_ID,
      fromAmount: (parsedAmount * 1e6).toString(),
      toAmount: selectedRoute.toAmount ?? '0',
      fromToken: 'USDC',
      toToken: 'USDC',
      status: 'pending' as const,
      route: {
        tool: selectedRoute.steps?.[0]?.tool ?? 'LI.FI',
        estimatedTime: selectedRoute.estimatedTime ?? 0,
        gasCost: selectedRoute.gasCost ?? '0',
      },
      autoDeposited: autoDeposit,
    };

    try {
      await addTransaction(transaction);
      setActiveTransactionContext({ id: txId, amount, autoDeposit });
      await execute(selectedRoute, address);
    } catch (bridgeError) {
      console.error('Bridge execution failed:', bridgeError);
      await updateTransaction(txId, { status: 'failed' });
      setActiveTransactionContext(null);
    }
  };

  const handleRouteSelect = (index: number) => {
    setSelectedRouteIndex(index);
    triggerHaptic('light');
    if (isMobile) {
      setShowRoutes(false);
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const parsed = Number.parseFloat(value);
    if (value && !Number.isNaN(parsed) && parsed > 0) {
      triggerHaptic('light');
    }
  };

  useEffect(() => {
    if (!activeTransactionContext) {
      return;
    }

    const { id: txId, amount: txAmount, autoDeposit: shouldAutoDeposit } = activeTransactionContext;

    if (bridgeState.status === 'success') {
      const txHash = bridgeState.txHash;
      void (async () => {
        await updateTransaction(txId, {
          status: 'success',
          txHash,
        });

        if (shouldAutoDeposit) {
          try {
            const depositHash = await depositToHyperliquid({
              amount: txAmount,
              tokenAddress: HYPER_EVM_USDC_ADDRESS,
              bridgeAddress: HYPERLIQUID_USDC_SYSTEM_ADDRESS,
              tokenDecimals: USDC_DECIMALS,
            });

            if (depositHash) {
              await updateTransaction(txId, { depositTxHash: depositHash });
            }
          } catch (depositError) {
            console.error('Auto deposit failed:', depositError);
          }
        }

        setActiveTransactionContext(null);
      })();
    } else if (bridgeState.status === 'error') {
      void updateTransaction(txId, { status: 'failed' }).finally(() => {
        setActiveTransactionContext(null);
      });
    }
  }, [activeTransactionContext, bridgeState.status, bridgeState.txHash, depositToHyperliquid, updateTransaction]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isMobile ? <MobileHeader /> : null}

      <div className={isMobile ? 'space-y-6 px-4 py-6' : 'mx-auto max-w-2xl space-y-6 p-6'}>
        {!isMobile ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                  HyperFlow
                </h1>
                <p className="text-gray-600">Bridge to Hyperliquid in one click</p>
              </div>
              <ConnectButton chainStatus="icon" showBalance={false} />
            </div>
          </div>
        ) : null}

        {isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 rounded-3xl bg-white p-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-600">From</label>
                <button
                  onClick={() => {
                    triggerHaptic('light');
                  }}
                  className="text-xs font-medium text-blue-600"
                  type="button"
                >
                  Max
                </button>
              </div>

              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="0.0"
                  value={amount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-6 py-6 text-3xl font-bold outline-none focus:border-blue-500"
                />
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="text-xl font-bold text-gray-400">USDC</span>
                </div>
              </div>

              <select
                value={fromChain}
                onChange={(event) => {
                  setFromChain(Number(event.target.value));
                  triggerHaptic('light');
                }}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium outline-none focus:border-blue-500"
              >
                <option value={1}>Ethereum</option>
                <option value={42161}>Arbitrum</option>
                <option value={10}>Optimism</option>
                <option value={137}>Polygon</option>
                <option value={8453}>Base</option>
              </select>
            </div>

            <div className="-my-2 flex justify-center">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-3 shadow-lg"
              >
                <ArrowDown className="h-6 w-6 text-white" />
              </motion.div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600">To HyperEVM</label>
              <div className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-6">
                <div className="text-3xl font-bold text-gray-900">
                  {isLoading ? (
                    <span className="text-gray-400">...</span>
                  ) : selectedRoute ? (
                    <span>{(Number.parseFloat(selectedRoute.toAmount ?? '0') / 1e6).toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-400">0.0</span>
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-600">USDC</div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border-2 border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Auto-deposit to Hyperliquid</p>
                  <p className="text-xs text-gray-600">Funds arrive ready to trade</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAutoDeposit((current) => !current);
                  triggerHaptic('light');
                }}
                className={
                  autoDeposit
                    ? 'relative h-7 w-12 rounded-full bg-blue-600 transition-colors'
                    : 'relative h-7 w-12 rounded-full bg-gray-300 transition-colors'
                }
                type="button"
              >
                <motion.div
                  animate={{ x: autoDeposit ? 20 : 2 }}
                  className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
                />
              </button>
            </div>

            {isMobile && routes.length > 0 ? (
              <button
                onClick={() => {
                  setShowRoutes(true);
                  triggerHaptic('light');
                }}
                className="w-full rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-blue-300"
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-600">Selected Route</p>
                    <p className="text-sm">
                      ~{selectedRoute ? Math.round((selectedRoute.estimatedTime ?? 0) / 60) : 0} min • $
                      {selectedRoute ? Number.parseFloat(selectedRoute.gasCost ?? '0').toFixed(2) : '0.00'} gas
                    </p>
                  </div>
                  <Info className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            ) : null}

            {!isMobile && routes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Routes ({routes.length})</p>
                <div className="space-y-2">
                  {routes.map((route, index) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      isSelected={effectiveSelectedIndex === index}
                      onSelect={() => handleRouteSelect(index)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
            ) : null}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBridge}
              disabled={!selectedRoute || isLoading || bridgeState.status === 'executing'}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-5 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
              type="button"
            >
              {isLoading
                ? 'Finding Routes...'
                : bridgeState.status === 'executing'
                ? 'Bridging...'
                : 'Bridge to Hyperliquid'}
            </motion.button>
          </motion.div>
        ) : (
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 p-12 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Connect your wallet</h2>
              <p className="text-gray-600">Use the connect button in the header to link a wallet before configuring routes.</p>
            </div>
          </div>
        )}
      </div>

      {isMobile ? (
        <BottomSheet isOpen={showRoutes} onClose={() => setShowRoutes(false)} title="Choose Route">
          <div className="space-y-3 p-6">
            {routes.map((route, index) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={effectiveSelectedIndex === index}
                onSelect={() => handleRouteSelect(index)}
              />
            ))}
          </div>
        </BottomSheet>
      ) : null}

      <TransactionStatus
        state={depositState.status !== 'idle' ? depositState : bridgeState}
        onReset={() => {
          resetBridge();
          resetDeposit();
        }}
      />
    </>
  );
}
