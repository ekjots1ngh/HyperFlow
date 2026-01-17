# HyperFlow

AI-assisted, one-click bridging into Hyperliquid with celebratory UX, analytics, and developer tooling.

![HyperFlow Bridge](./demo/screenshot.png)

---

## Table of Contents
- [Overview](#overview)
- [Highlights](#highlights)
- [Architecture](#architecture)
- [Key Screens](#key-screens)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Developer Utilities](#developer-utilities)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
HyperFlow removes the friction of funding a Hyperliquid trading account. Users choose any supported source chain, HyperFlow locates the best LI.FI route, performs optional auto-deposit, and celebrates the success with unlockable achievements. The app is optimized for both desktop and mobile with haptics, bottom sheets, skeleton loaders, and an onboarding tutorial.

## Highlights
- **Smart LI.FI Routing** – Fetches and executes optimal routes from chains like Ethereum, Arbitrum, Optimism, Base, and Polygon directly into HyperEVM (chain 999).
- **Auto-Deposit Workflow** – Sends bridged USDC to the HyperCore system address so funds land ready to trade.
- **Achievements + Celebrations** – Unlock badges, visual toasts, and confetti on milestone bridges.
- **Analytics Dashboard** – `/analytics` summarizes volume, speed, gas spend, and recent transactions.
- **Referral Engine** – Connected wallets receive a gradient referral card with earnings stats and copy-to-clipboard link.
- **Guided Tutorial** – First-time users see a modal walkthrough explaining the flow and auto-deposit option.
- **Transaction History** – Persistent, offline-ready log stored in IndexedDB with a mobile bottom sheet UI.
- **Developer Test Harness** – `/test` view runs live LI.FI integration checks (chains, routes, HyperEVM availability).

## Architecture
- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript.
- **Styling & Motion**: Tailwind CSS v4, Framer Motion, custom gradients.
- **Wallet & Chains**: Wagmi v2, RainbowKit, LI.FI SDK.
- **State & Storage**: Zustand stores with localforage-backed persistence.
- **Tooling**: ESLint 9, TypeScript 5, npm scripts.
- **Client Components**: `ClientHome`, `BridgeInterface`, analytics cards, tutorial modal.

## Key Screens
- `/` – Primary bridge interface with chain selectors, auto-deposit toggle, achievements, referral card, and transaction history button.
- `/analytics` – Stats cards (volume, count, average time, gas) and recent activity list.
- `/test` – LI.FI diagnostics (chains fetch, HyperEVM discovery, route retrieval) with animated result cards.
- Tutorial Modal – Rendered on `/` for new sessions; guides the user through key steps.

## Getting Started
```bash
# Clone and enter the project
git clone https://github.com/your-org/hyperflow.git
cd hyperflow

# Install dependencies
npm install

# Copy example env and fill in required values
cp .env.local.example .env.local
# Edit .env.local with your WalletConnect project ID, LI.FI API key (optional), etc.

# Run the development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Start the production build locally
npm run start
```

## Environment Variables
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_ID` | WalletConnect project ID for RainbowKit modal. |
| `NEXT_PUBLIC_ALCHEMY_KEY` (optional) | Provider API key for enhanced RPC performance. |
| `NEXT_PUBLIC_LIFI_API_KEY` (optional) | LI.FI API key for higher rate limits. |

Refer to `.env.local.example` for the latest list.

## Available Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server with Turbopack. |
| `npm run build` | Production build and static prerender. |
| `npm run start` | Serve the built app. |
| `npm run lint` | Run ESLint (configurable via `eslint.config.mjs`). |

## Developer Utilities
- **Analytics Preview**: `http://localhost:3000/analytics`
- **LI.FI Diagnostic Suite**: `http://localhost:3000/test`
	- Displays counts of chains fetched.
	- Confirms HyperEVM (id 999/998) availability.
	- Attempts sample routes (1 USDC).
- **Tutorial Reset**: Clear `hyperflow_tutorial_done` key in browser storage to re-open onboarding.
- **Transaction History**: Stored under `localforage` instance `hyperflow/transactions`; the floating history button is visible once entries exist.
- **Referral Card**: Appears in the primary flow after wallet connection.

## Project Structure
```
app/
	analytics/           # Analytics dashboard
	test/                # LI.FI diagnostic UI
	ClientHome.tsx       # Client wrapper for bridge + history + referral
	page.tsx             # Home entry point (client component)
components/
	analytics/           # Stats cards and chart scaffolding
	bridge/              # Bridge subcomponents (routes, status, error recovery)
	history/             # Transaction history UI
	mobile/              # BottomSheet and mobile header
	Referral.tsx         # Referral card
	Tutorial.tsx         # Onboarding modal
lib/
	hooks/               # Bridge, routes, and deposit hooks
	storage/             # Localforage persistence
	store/               # Zustand stores (transactions, etc.)
	test/                # LI.FI test routines (used by /test page)
```

## Contributing
Contributions are welcome. Please open an issue first to discuss major changes, then submit a pull request.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-update`).
3. Commit your changes with clear messages.
4. Run `npm run lint` and `npm run build` locally.
5. Open a PR describing the motivation, implementation, and testing.

## License
MIT © HyperFlow contributors.
# 🚀 HyperFlow

One-click bridge to Hyperliquid from any chain using LI.FI routing.

![HyperFlow Demo](./demo/screenshot.png)

## 🎯 What is HyperFlow?

HyperFlow eliminates the friction of getting funds onto Hyperliquid. Instead of juggling multiple sites and transactions, users bridge from any major chain in a single, beautiful flow.

**Live Demo**: [hyperflow.xyz](https://hyperflow.xyz)  
**Demo Video**: [3-minute walkthrough](https://youtube.com/...)

## ✨ Features

- **One-Click Onboarding**: Bridge from Ethereum, Arbitrum, Optimism, Polygon, or Base
- **Auto-Deposit**: Funds land directly in your Hyperliquid trading account
- **Smart Routing**: LI.FI finds the fastest, cheapest route every time
- **Mobile-First**: PWA with haptic feedback, works offline, installs like a native app
- **Transaction History**: All your bridges saved locally, synced across devices
- **Developer SDK**: 5 lines of code to add HyperFlow to your dApp

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Bridge**: LI.FI SDK for optimal routing
- **Wallet**: RainbowKit + Wagmi v2
- **Storage**: IndexedDB (localforage) for offline persistence
- **Animations**: Framer Motion
- **State**: Zustand

## 📦 Installation (for developers)
```bash
npm install hyperflow-kit
```
```tsx
import { HyperFlowWidget } from 'hyperflow-kit';

function App() {
	return (
		<HyperFlowWidget
			defaultChain={1}
			autoDeposit={true}
			onComplete={(txHash) => console.log('Ready to trade!', txHash)}
		/>
	);
}
```

## 🚦 Local Development
```bash
# Clone repo
# 🚀 HyperFlow

**One-click bridge to Hyperliquid from any chain with AI-powered route optimization**

[![Demo](https://img.shields.io/badge/Demo-Live-success)](https://hyperflow.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![HyperFlow Banner](./public/demo-screenshot.png)

---

## 🎯 What is HyperFlow?

HyperFlow eliminates the complexity of bridging to Hyperliquid. Using LI.FI's advanced routing and custom AI optimization, users can bridge from any major chain in a single, beautiful flow.

**🏆 Built for the LI.FI x Hyperliquid Hackathon**

### ✨ Key Features

- **🤖 AI Route Optimization** - Analyzes all available routes and recommends the best one based on your amount
- **⚡ One-Click Auto-Deposit** - Funds land directly in your Hyperliquid trading account
- **📱 Mobile-First PWA** - Install like a native app with offline support
- **💾 Persistent History** - All transactions saved locally with IndexedDB
- **🎨 Beautiful UX** - Success animations, haptic feedback, and smooth transitions
- **📊 Analytics Dashboard** - Track your bridging volume and performance
- **🎁 Referral System** - Earn rewards by sharing HyperFlow

---

## 🎥 Demo Video

[**Watch 3-minute demo →**](https://youtu.be/your-video-id)

Key timestamps:
- 0:00 - Problem statement
- 0:20 - Mobile demo walkthrough
- 1:30 - Developer integration
- 2:15 - Technical highlights

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

**Blockchain**
- LI.FI SDK (routing)
- Wagmi v2 + Viem
- RainbowKit

**State & Storage**
- Zustand (state management)
- IndexedDB via Localforage (offline persistence)

**Developer Tools**
- NPM package: `hyperflow-kit` (coming soon)

---

## 🚀 Quick Start

### For Users

**Live App**: [hyperflow.vercel.app](https://hyperflow.vercel.app)

1. Connect your wallet
2. Enter amount and select origin chain
3. Review AI-optimized route
4. Bridge to Hyperliquid in one click

### For Developers

**Install the SDK** (NPM package):
```bash
npm install hyperflow-kit
```

**Use the widget**:
```tsx
import { HyperFlowWidget } from 'hyperflow-kit';

function App() {
	return (
		<HyperFlowWidget
			defaultChain={1}
			autoDeposit={true}
			onComplete={(txHash) => console.log('Bridge complete!', txHash)}
		/>
	);
}
```

---

## 💻 Local Development
```bash
# Clone repo
git clone https://github.com/yourusername/hyperflow
cd hyperflow

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your WalletConnect Project ID

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture
```
User's Chain (ETH/ARB/OP/etc.)
		↓ (LI.FI handles routing)
HyperEVM (chain 998)
		↓ (Transfer to system address)
HyperCore Trading Account
		↓
Ready to trade on Hyperliquid! 🎉
```

**Key Components:**
- **AI Route Analyzer** - Compares routes and provides personalized recommendations
- **Price Impact Calculator** - Real-time slippage warnings
- **Gas Estimator** - Shows cost efficiency and break-even amounts
- **Transaction Manager** - Offline-first with IndexedDB persistence

---

## 📸 Screenshots

### Mobile Experience
![Mobile Demo](./docs/mobile-demo.png)

### AI Route Insights
![Route Insights](./docs/route-insights.png)

### Analytics Dashboard
![Analytics](./docs/analytics.png)

---

## 🎯 Hackathon Submission

**Categories**: Main Prize + UX Honorable Mention

**Why HyperFlow Wins:**

✅ **Creative LI.FI Use**
- Route comparison with AI analysis
- Multi-step optimization (bridge + auto-deposit)
- Gas efficiency recommendations

✅ **Clean UX**
- Sub-30 second user flow
- Clear error states with recovery suggestions
- Mobile-optimized with PWA support

✅ **Reliable**
- Comprehensive error handling
- Retry logic on all network calls
- Transaction persistence across sessions

✅ **Useful**
- Standalone app for users
- Reusable SDK for developers
- Analytics for power users

---

## 🧪 Testing

Run LI.FI integration tests:
```bash
npm run dev
# Navigate to /test
```

All tests should pass ✅

---

## 📦 Deployment

**Production**: Deployed on Vercel
```bash
# Deploy to production
vercel --prod
```

**Environment Variables Required:**
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

---

## 🗺️ Roadmap

- [ ] Multi-language support (Spanish, Chinese)
- [ ] Gas token swaps (pay gas in any token)
- [ ] Batch bridging for portfolio managers
- [ ] Mobile app (React Native)
- [ ] Chrome extension

---

## 🤝 Contributing

Pull requests welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

MIT © 2026 Ekjot

---

## 🙏 Acknowledgments

- **LI.FI** - For the amazing routing infrastructure
- **Hyperliquid** - For building the future of decentralized trading
- **Anthropic** - For Claude assistance during development

---

## 📞 Contact

- **Twitter**: [@ekjotsingh001](https://twitter.com/ekjotsingh001)
- **Discord**: ekjotsingh0671
- **Email**: singh.ekjot.se@gmail.com

---

**Built with ❤️ for the LI.FI x Hyperliquid Hackathon**
cd hyperflow

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your WalletConnect Project ID

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎬 Demo Video Timestamps

- 0:00 - Problem: Current onboarding friction
- 0:20 - Solution: Mobile demo (Arbitrum → HyperEVM)
- 1:30 - Developer SDK integration
- 2:15 - Technical highlights
- 2:45 - Live at hyperflow.xyz

## 🏆 Hackathon Categories

**Primary**: Main prize ($3,000)  
**Secondary**: UX Honorable Mention ($250)

**Why HyperFlow wins**:
- ✅ Creative LI.FI use (route comparison, optimization)
- ✅ Clean UX (mobile-first, sub-30s flow, clear error handling)
- ✅ Reliable (comprehensive error recovery, retry logic)
- ✅ Useful (standalone app + reusable SDK for builders)

## 📱 Mobile Features

- Bottom sheet UI for native feel
- Haptic feedback on interactions
- PWA installable to home screen
- Offline transaction history
- One-thumb usable interface
- Works with WalletConnect mobile wallets

## 🤝 Contributing

Pull requests welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT © [Your Name]

## ⚠️ Current Limitations

- **Auto-Deposit**: Transfers USDC to HyperCore's system address automatically; if Hyperliquid updates the address, be sure to update the constant before deploying.
- **Route Availability**: LI.FI routing to HyperEVM (999) is recently enabled. If LI.FI returns no route, users should retry or fall back to Hyperliquid's native bridge UI.

### The Complete Flow
```
User's Chain (ETH/ARB/OP/etc.)
	↓ (LI.FI handles this - one transaction)
HyperEVM (chain 999)
	↓ (HyperFlow transfers USDC to the HyperCore system address)
HyperCore (trading account)
	↓
Ready to trade on Hyperliquid! 🎉
```

### Quick Route Check
```ts
import { getRoutes } from '@lifi/sdk';

const routes = await getRoutes({
  fromChainId: 1,
	toChainId: 999,
  fromTokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  toTokenAddress: '0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34',
  fromAmount: '1000000',
  fromAddress: '0xYourAddress',
});

console.log('Routes found:', routes.routes.length);
```

---

Built with ❤️ for the LI.FI x Hyperliquid Hackathon
