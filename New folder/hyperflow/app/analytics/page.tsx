"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { TrendingUp, DollarSign, Zap, Award } from "lucide-react";
import { StatsCard } from "@/components/analytics/StatsCard";
import { Leaderboard } from "@/components/Leaderboard";
import { useTransactionStore } from "@/lib/store/transactions";

const STATUS_BADGE_CLASSES: Record<"success" | "pending" | "failed", string> = {
  success: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  failed: "bg-rose-50 text-rose-600",
};

const asNumber = (value: string | undefined | null) => {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function AnalyticsPage() {
  const { transactions } = useTransactionStore();

  const successfulTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.status === "success"),
    [transactions],
  );

  const totalVolume = useMemo(
    () => successfulTransactions.reduce((sum, tx) => sum + asNumber(tx.fromAmount) / 1e6, 0),
    [successfulTransactions],
  );

  const totalGasSpent = useMemo(
    () => transactions.reduce((sum, tx) => sum + asNumber(tx.route?.gasCost), 0),
    [transactions],
  );

  const averageTimeSeconds = useMemo(
    () => successfulTransactions.reduce((sum, tx) => sum + (tx.route?.estimatedTime ?? 0), 0),
    [successfulTransactions],
  );

  const averageTimeMinutes = successfulTransactions.length
    ? averageTimeSeconds / successfulTransactions.length / 60
    : 0;

  const averageTimeLabel = averageTimeMinutes === 0
    ? "—"
    : averageTimeMinutes < 1
      ? "<1m"
      : `${Math.round(averageTimeMinutes)}m`;

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Link href="/" className="text-blue-600 transition-colors hover:text-blue-700">
          ← Back to Bridge
        </Link>

        <header>
          <h1 className="text-4xl font-bold text-gray-900">Your HyperFlow Analytics</h1>
          <p className="mt-2 text-gray-600">Track your bridging performance</p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={<DollarSign className="h-6 w-6" />}
            title="Total Volume"
            value={currencyFormatter.format(totalVolume)}
            change={transactions.length ? "+12.5%" : "—"}
            color="blue"
          />
          <StatsCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Transactions"
            value={transactions.length}
            change={transactions.length ? `${successfulTransactions.length} successful` : "—"}
            color="green"
          />
          <StatsCard
            icon={<Zap className="h-6 w-6" />}
            title="Avg Time"
            value={averageTimeLabel}
            change={successfulTransactions.length ? "2m faster" : "—"}
            color="purple"
          />
          <StatsCard
            icon={<Award className="h-6 w-6" />}
            title="Gas Spent"
            value={currencyFormatter.format(totalGasSpent)}
            change={transactions.length ? "Optimized" : "—"}
            color="orange"
          />
        </section>

        <div className="mb-8">
          <Leaderboard />
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          {transactions.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No transactions yet</p>
          ) : (
            <div className="mt-4 space-y-3">
              {transactions.slice(0, 10).map((transaction) => {
                const statusClass = STATUS_BADGE_CLASSES[transaction.status];
                const amount = asNumber(transaction.fromAmount) / 1e6;

                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                  >
                    <div>
                      <p className="text-base font-semibold text-gray-900">{currencyFormatter.format(amount)}</p>
                      <p className="text-xs text-gray-500">{dateFormatter.format(new Date(transaction.timestamp))}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusClass}`}>
                        {transaction.status}
                      </span>
                      <p className="mt-1 text-xs text-gray-500">{transaction.route?.tool ?? "Unknown tool"}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </motion.main>
  );
}
