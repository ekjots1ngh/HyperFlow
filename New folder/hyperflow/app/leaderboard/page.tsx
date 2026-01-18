"use client";

import Link from "next/link";
import { Leaderboard } from "@/components/Leaderboard";

export default function LeaderboardPage() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
			<div className="mx-auto max-w-4xl">
				<Link href="/" className="mb-6 inline-block text-blue-600 transition-colors hover:text-blue-700">
					← Back to Bridge
				</Link>

				<div className="mb-8 text-center">
					<h1 className="mb-2 text-4xl font-bold">HyperFlow Leaderboard</h1>
					<p className="text-gray-600">Top bridgers competing for glory 🏆</p>
				</div>

				<Leaderboard />

				<div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
					<h3 className="mb-2 text-2xl font-bold">Want to climb the ranks?</h3>
					<p className="mb-4 opacity-90">Bridge more volume to earn exclusive badges and rewards</p>
					<Link
						href="/"
						className="inline-block rounded-xl bg-white px-8 py-3 font-bold text-blue-600 transition-colors hover:bg-gray-100"
					>
						Start Bridging →
					</Link>
				</div>
			</div>
		</main>
	);
}
