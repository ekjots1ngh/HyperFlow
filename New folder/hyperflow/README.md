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

- **HyperEVM Bridge**: Currently bridges to Arbitrum via LI.FI. The Arbitrum → HyperEVM bridge integration is in progress as HyperEVM chain (998) is not yet supported in LI.FI's routing.
- **Workaround**: Users bridge to Arbitrum, then use Hyperliquid's native bridge UI for the final step.
- **Future**: Direct integration with Hyperliquid's bridge contract for seamless Arbitrum → HyperEVM flow.

---

Built with ❤️ for the LI.FI x Hyperliquid Hackathon
