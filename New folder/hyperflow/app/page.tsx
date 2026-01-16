import { BridgeInterface } from '@/components/BridgeInterface';
import { TransactionHistory } from '@/components/history/TransactionHistory';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <BridgeInterface />
      <TransactionHistory />
    </main>
  );
}
