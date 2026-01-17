"use client";

import { ComparisonTool } from "@/components/ComparisonTool";
import { FAQ } from "@/components/FAQ";
import { Leaderboard } from "@/components/Leaderboard";
import { StatsBanner } from "@/components/StatsBanner";
import { Testimonials } from "@/components/Testimonials";
import { Tutorial } from "@/components/Tutorial";
import { ClientHome } from "./ClientHome";

export default function Home() {
  return (
    <>
      <Tutorial onComplete={() => {}} />

      <main id="top" className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="py-12">
          <ClientHome />
        </div>
      </main>

      <StatsBanner />

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <ComparisonTool />
        </div>
      </section>

      <Testimonials />

      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <Leaderboard />
        </div>
      </section>

      <FAQ />

      <footer className="bg-gray-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="mb-4 text-2xl font-bold">Ready to Bridge?</h3>
          <p className="mb-6 text-gray-400">Join thousands bridging to Hyperliquid with HyperFlow</p>

          <a
            href="#top"
            className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold transition-shadow hover:shadow-lg"
          >
            Get Started Now →
          </a>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <a href="https://docs.li.fi" className="hover:text-white">
                LI.FI Docs
              </a>
              <a href="https://hyperliquid.xyz" className="hover:text-white">
                Hyperliquid
              </a>
              <a href="https://github.com/yourusername/hyperflow" className="hover:text-white">
                GitHub
              </a>
              <a href="https://twitter.com/yourhandle" className="hover:text-white">
                Twitter
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              © 2026 HyperFlow. Built with ❤️ for the LI.FI x Hyperliquid Hackathon
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
