"use client";

import { ReferralCard } from "./Referral";
import { useAccount } from "wagmi";

export function ClientReferralCard() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return <ReferralCard address={address} />;
}
