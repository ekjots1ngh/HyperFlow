"use client";

import { useCallback, useState } from "react";
import { parseUnits } from "viem";
import type { Address, Hash } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

type DepositStatus = "idle" | "approving" | "depositing" | "success" | "error";

interface DepositState {
	status: DepositStatus;
	txHash?: Hash;
	error?: string;
}

interface DepositParams {
	amount: string;
	tokenAddress: Address;
	bridgeAddress: Address;
	tokenDecimals?: number;
}

const ERC20_APPROVE_ABI = [
	{
		type: "function",
		name: "approve",
		stateMutability: "nonpayable",
		inputs: [
			{ name: "spender", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		outputs: [{ name: "", type: "bool" }],
	},
] as const;

const HYPERLIQUID_DEPOSIT_ABI = [
	{
		type: "function",
		name: "deposit",
		stateMutability: "nonpayable",
		inputs: [
			{ name: "token", type: "address" },
			{ name: "amount", type: "uint256" },
		],
		outputs: [],
	},
] as const;

export function useHyperliquidDeposit() {
	const [state, setState] = useState<DepositState>({ status: "idle" });
	const { data: walletClient } = useWalletClient();
	const publicClient = usePublicClient();

	const depositToHyperliquid = useCallback(
		async ({ amount, tokenAddress, bridgeAddress, tokenDecimals = 6 }: DepositParams) => {
			if (!walletClient || !publicClient) {
				setState({ status: "error", error: "Wallet not connected" });
				return;
			}

			try {
				const normalizedAmount = amount.trim();
				if (!normalizedAmount) {
					throw new Error("Amount is required");
				}

				const amountWei = parseUnits(normalizedAmount, tokenDecimals);

				setState({ status: "approving" });

				const approveHash = await walletClient.writeContract({
					account: walletClient.account ?? undefined,
					address: tokenAddress,
					abi: ERC20_APPROVE_ABI,
					functionName: "approve",
					args: [bridgeAddress, amountWei],
				});

				await publicClient.waitForTransactionReceipt({ hash: approveHash });

				setState({ status: "depositing" });

				const depositHash = await walletClient.writeContract({
					account: walletClient.account ?? undefined,
					address: bridgeAddress,
					abi: HYPERLIQUID_DEPOSIT_ABI,
					functionName: "deposit",
					args: [tokenAddress, amountWei],
				});

				await publicClient.waitForTransactionReceipt({ hash: depositHash });

				setState({ status: "success", txHash: depositHash });

				return depositHash;
			} catch (error) {
				const message = error instanceof Error ? error.message : "Deposit failed";
				setState({ status: "error", error: message });
				console.error("Hyperliquid deposit error:", error);
				return undefined;
			}
		},
		[publicClient, walletClient],
	);

	const reset = useCallback(() => {
		setState({ status: "idle" });
	}, []);

	return { state, depositToHyperliquid, reset };
}
