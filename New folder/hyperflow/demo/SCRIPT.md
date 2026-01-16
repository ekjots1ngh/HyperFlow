# HyperFlow Demo Video Script (3 minutes)

## Setup
- **Device**: iPhone (for mobile demo) + MacBook (for code)
- **Screen recording**: QuickTime for mobile, OBS for desktop
- **Background music**: Subtle, upbeat (epidemic sound)

---

## 0:00-0:20 | Hook + Problem (20s)

**Visual**: Screen recording of traditional bridging
- Open 3 different tabs (bridge site, swap site, Hyperliquid)
- Show confusion, multiple transactions

**Voiceover**:
"Getting funds to Hyperliquid today? You need three different sites, five transactions, and way too much patience. There has to be a better way."

---

## 0:20-1:30 | Mobile Demo - The Solution (70s)

**Visual**: iPhone screen recording
1. Open HyperFlow PWA from home screen (0:20-0:25)
2. Connect wallet with one tap (0:25-0:30)
3. Enter amount: "100 USDC" (0:30-0:35)
4. Select Arbitrum as source chain (0:35-0:38)
5. Tap to see route options (0:38-0:45)
	 - Show 3 routes with time/cost
	 - Highlight best route selection
6. Enable auto-deposit toggle (0:45-0:48)
7. Hit "Bridge to Hyperliquid" (0:48-0:52)
8. Show beautiful progress UI (0:52-1:05)
	 - Swapping animation
	 - Bridging animation
	 - Depositing animation
9. Success screen - "Ready to trade!" (1:05-1:10)
10. Pull up transaction history (1:10-1:20)
		- Show saved transaction
		- Click to view on explorer
11. Quick "Add to Home Screen" demo (1:20-1:30)

**Voiceover**:
"HyperFlow changes everything. Open the app, connect your wallet, choose your amount. Pick your starting chain - Ethereum, Arbitrum, any major network. HyperFlow finds the best route automatically, comparing time and cost. Enable auto-deposit, and you're one tap away from trading. Watch as it swaps, bridges, and deposits - all in one flow. Thirty seconds later, your funds are on Hyperliquid, ready to trade. Your history syncs across devices and works offline. Install it like any app."

---

## 1:30-2:15 | Developer Integration (45s)

**Visual**: VS Code screen recording
1. Show terminal: `npm install hyperflow-kit` (1:30-1:35)
2. Show component code (1:35-1:50):
```tsx
import { HyperFlowWidget } from 'hyperflow-kit';

function MyApp() {
	return (
		<HyperFlowWidget
			defaultChain={1}
			autoDeposit={true}
			onComplete={(txHash) => {
				console.log('User ready to trade!', txHash);
			}}
		/>
	);
}
```
3. Show live preview with widget working (1:50-2:00)
4. Quick tour of customization options (2:00-2:10)
	 - Theme switcher
	 - Compact mode
	 - Custom callbacks

**Voiceover**:
"For developers? Five lines of code. Install the package, drop in the widget, handle the callback. That's it. Your users get the same seamless experience. Customize the theme, use compact mode, or build your own UI with our hooks. Everything just works."

---

## 2:15-2:45 | Technical Highlights (30s)

**Visual**: Split screen showing:
- Error handling demo (disconnect wallet mid-transaction)
- Route optimization (show 3 routes side-by-side)
- Mobile responsiveness
- PWA capabilities

**Voiceover**:
"Under the hood, HyperFlow uses LI.FI to find optimal routes across all major bridges. Error handling is built in - if something fails, users get clear guidance, not cryptic errors. It's mobile-first, works offline, and installs like a native app. Every detail designed to make onboarding effortless."

---

## 2:45-3:00 | Call to Action (15s)

**Visual**: 
- Show hyperflow.xyz in browser
- GitHub repo with stars
- Quick montage of UI highlights

**Text overlay**:
- hyperflow.xyz
- github.com/yourname/hyperflow
- "Try it now"

**Voiceover**:
"HyperFlow is live at hyperflow dot xyz. The code is open source on GitHub. One click to Hyperliquid - that's the future of DeFi onboarding."

**End card**: Logo + "HyperFlow" + social links

---

## Recording Tips
- Record in 4K, export in 1080p
- Keep cuts tight - no dead air
- Use smooth transitions (cross-dissolve max 0.3s)
- Mobile demo: clean iPhone, dark mode, full brightness
- Code demo: use a clean VS Code theme (One Dark Pro)
- Background music: 20% volume, fade out for voiceover
- Export settings: 1080p, 30fps, H.264, High bitrate
