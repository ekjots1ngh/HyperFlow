"use client";

import { Tutorial } from '@/components/Tutorial';
import { ClientHome } from './ClientHome';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <Tutorial onComplete={() => {}} />
      <ClientHome />
    </main>
  );
}
