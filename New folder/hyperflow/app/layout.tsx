import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ExtensionErrorSilencer } from '@/components/ExtensionErrorSilencer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HyperFlow - Bridge to Hyperliquid',
  description: 'One-click onboarding to Hyperliquid from any chain using LI.FI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HyperFlow',
  },
  openGraph: {
    title: 'HyperFlow - Bridge to Hyperliquid',
    description: 'One-click onboarding to Hyperliquid from any chain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyperFlow',
    description: 'One-click bridge to Hyperliquid from any chain',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ExtensionErrorSilencer />
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
