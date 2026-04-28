"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { BalancePanel } from "./BalancePanel";
import { SchedulePanel } from "./SchedulePanel";
import { ClaimSection } from "./ClaimSection";
import { useVestingData } from "@/hooks/useVestingData";
import { useState, useEffect } from "react";

export function VestingCard() {
  const { isConnected } = useAppKitAccount();
  const { address: walletAddress } = useAccount();
  const { open } = useAppKit();
  const [isMounted, setIsMounted] = useState(false);
  const [debugAddress, setDebugAddress] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      setShowDebug(true);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      setDebugAddress("");
    }
  }, [isConnected]);

  const effectiveAddress: `0x${string}` | undefined = (debugAddress || walletAddress) as `0x${string}` | undefined;

  if (!isConnected && !debugAddress) {
    return (
      <div className="bg-surface-container-low rounded-lg p-8 md:p-12 shadow-2xl border border-outline-variant/5">
        <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant">account_balance_wallet</span>
          </div>
          <div className="space-y-2">
            <h2 className="font-headline font-bold text-xl text-on-surface">Connect Your Wallet</h2>
            <p className="text-on-surface/60 text-sm font-body max-w-sm">
              Connect your wallet that has a vesting schedule to view your vesting schedule and claim available tokens.
            </p>
          </div>
          {!isMounted ? (
            <div className="w-[186px] h-[60px] rounded-full bg-surface-container-highest animate-pulse" />
          ) : (
            <button
              onClick={() => open()}
              className="px-8 py-4 rounded-full primary-gradient-bg text-on-primary-container font-headline font-extrabold text-lg shadow-[var(--shadow-card)] hover:scale-[1.02] transition-transform active:scale-95 flex items-center gap-3"
            >
              <span className="material-symbols-outlined">wallet</span>
              Connect Wallet
            </button>
          )}
          {showDebug && (
            <div className="mt-4 pt-4 border-t border-outline-variant/20 w-full max-w-xs">
              <p className="text-on-surface/40 text-xs font-label mb-2">DEBUG: Lookup any wallet (localhost only)</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={debugAddress}
                  onChange={(e) => setDebugAddress(e.target.value)}
                  placeholder="0x..."
                  className="flex-1 px-3 py-2 text-xs font-mono bg-surface-container-highest text-on-surface rounded border border-outline-variant/20 focus:border-primary-container focus:outline-none"
                />
                <button
                  onClick={() => {}}
                  className="px-3 py-2 text-xs font-label bg-surface-bright text-on-surface hover:bg-surface-container-highest rounded transition-colors"
                >
                  Lookup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isConnected && debugAddress) {
  }

  if (!isMounted) {
    return (
      <div className="bg-surface-container-low rounded-lg p-8 md:p-12 shadow-2xl border border-outline-variant/5">
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest border-t-primary-container animate-spin" />
          <p className="text-on-surface/60 font-body text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface-container-low rounded-lg p-8 md:p-12 shadow-2xl border border-outline-variant/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <ClaimSection address={effectiveAddress} />
          </div>

          <SchedulePanel address={effectiveAddress} />
        </div>
      </div>
      <BalancePanel address={effectiveAddress} />
    </>
  );
}