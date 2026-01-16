# HyperFlow Kit

Reusable React components for bridging to Hyperliquid from any chain using LI.FI.

## Installation
```bash
npm install hyperflow-kit
```

## Quick Start
```tsx
import { HyperFlowWidget } from 'hyperflow-kit';

function App() {
  return (
    <HyperFlowWidget
      defaultChain={1}
      autoDeposit={true}
      onComplete={(txHash) => console.log('Bridge complete:', txHash)}
    />
  );
}
```

## Features

- 🚀 One-click bridging from any chain to HyperEVM
- 💼 Auto-deposit to Hyperliquid trading account
- 📱 Mobile-optimized with haptic feedback
- 💾 Offline transaction history
- 🎨 Customizable themes
- ⚡ Built with LI.FI for best routes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultChain` | `number` | `1` | Starting chain ID |
| `autoDeposit` | `boolean` | `true` | Auto-deposit to Hyperliquid |
| `onComplete` | `(txHash: string) => void` | - | Callback on success |
| `onError` | `(error: string) => void` | - | Callback on error |
| `theme` | `'light' \| 'dark'` | `'light'` | Widget theme |
| `compact` | `boolean` | `false` | Compact mode |

## License

MIT

```
npm install @hyperflow/hyperflow-kit
```

```tsx
import { HyperFlowWidget } from '@hyperflow/hyperflow-kit';

export function App() {
  return <HyperFlowWidget />;
}
```
