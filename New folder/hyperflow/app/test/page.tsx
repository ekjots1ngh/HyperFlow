"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { testLiFiIntegration, type TestResult } from "@/lib/test/lifiTest";
import Link from "next/link";

export default function TestPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    const testResults = await testLiFiIntegration();
    setResults(testResults);
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pending":
        return <Loader2 className="h-5 w-5 animate-spin text-gray-400" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "pending":
        return "border-gray-200 bg-gray-50";
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const successCount = results.filter((result) => result.status === "success").length;
  const errorCount = results.filter((result) => result.status === "error").length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">LI.FI Integration Test</h1>
          <p className="text-gray-600">Testing HyperFlow's connection to LI.FI SDK</p>
        </header>

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isRunning ? "Running Tests..." : "Run Tests"}
          </button>

          {results.length > 0 && !isRunning ? (
            <div className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white px-4 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-semibold">{successCount} Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="font-semibold">{errorCount} Failed</span>
              </div>
            </div>
          ) : null}
        </div>

        <section className="space-y-4">
          {results.map((result, index) => (
            <motion.div
              key={result.test}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border-2 p-6 ${getStatusColor(result.status)}`}
            >
              <div className="flex items-start gap-4">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{result.test}</h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-medium uppercase">
                      {result.status}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-gray-700">{result.message}</p>
                  {result.data ? (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-medium text-gray-600 hover:text-gray-900">
                        View Details
                      </summary>
                      <pre className="mt-2 max-h-64 overflow-auto rounded-lg border border-gray-200 bg-white p-3 text-xs">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {results.length > 0 && !isRunning ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 font-bold text-blue-900">Analysis</h3>
                {errorCount === 0 ? (
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>✅ All tests passed! LI.FI integration is working correctly.</p>
                    <p>✅ HyperEVM chain is supported</p>
                    <p>✅ Routes are available for bridging</p>
                    <p className="mt-3 font-semibold text-green-700">🎉 You're ready to deploy and demo!</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-blue-800">
                    <p className="font-semibold text-red-700">⚠️ {errorCount} test(s) failed</p>
                    {results.some((result) => result.test.includes("Fetch Chains") && result.status === "error") ? (
                      <p>❌ Cannot connect to LI.FI API - check network/SDK version</p>
                    ) : null}
                    {results.some((result) => result.test.includes("HyperEVM") && result.status === "error") ? (
                      <p>❌ HyperEVM not found in LI.FI chains - may need to use alternative chain</p>
                    ) : null}
                    {results.some((result) => result.test.includes("Routes") && result.status === "error") ? (
                      <p>❌ No routes available - HyperEVM might not be fully integrated yet</p>
                    ) : null}
                    <div className="mt-4 rounded-lg bg-white p-3">
                      <p className="mb-2 font-semibold text-gray-900">Suggested Fixes:</p>
                      <ol className="list-inside list-decimal space-y-1 text-gray-700">
                        <li>
                          Update LI.FI SDK: <code className="rounded bg-gray-100 px-1">npm install @lifi/sdk@latest</code>
                        </li>
                        <li>Try alternative chain IDs (998 vs 999 for HyperEVM)</li>
                        <li>Use Arbitrum as intermediate chain if direct routes unavailable</li>
                        <li>Check LI.FI documentation for HyperEVM status</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ) : null}

        {results.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
            >
              ← Back to App
            </Link>
            <a
              href="https://docs.li.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
            >
              LI.FI Docs ↗
            </a>
            <a
              href="https://hyperliquid.gitbook.io/hyperliquid-docs/hyperevm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold transition-colors hover:bg-gray-50"
            >
              HyperEVM Docs ↗
            </a>
          </div>
        ) : null}
      </div>
    </main>
  );
}
