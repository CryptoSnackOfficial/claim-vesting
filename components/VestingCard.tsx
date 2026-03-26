"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { ProgressBar } from "./ProgressBar";
import { useVestingData } from "@/hooks/useVestingData";
import { useState, useEffect, useRef } from "react";

function formatTokens(raw: bigint, decimals = 18): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const fractionStr = fraction.toString().padStart(decimals, "0").slice(0, 2);
  return `${whole.toLocaleString()}.${fractionStr}`;
}

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function VestingCard() {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
   const { isLoading, error, releasableAmount, totalAllocated, totalReleased, claimablePercent, startDate, cliffDate, endDate, claim, isClaiming, claimError, tokenBalance } = useVestingData();
  const [showBalance, setShowBalance] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isClaiming) {
      setIsRefreshing(true);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(() => {
        setIsRefreshing(false);
      }, 31500);
    }
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [isClaiming]);

  if (!isConnected) {
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
          <button
            onClick={() => open()}
            className="px-8 py-4 rounded-full primary-gradient-bg text-on-primary-container font-headline font-extrabold text-lg shadow-[var(--shadow-card)] hover:scale-[1.02] transition-transform active:scale-95 flex items-center gap-3"
          >
            <span className="material-symbols-outlined">wallet</span>
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-surface-container-low rounded-lg p-8 md:p-12 shadow-2xl border border-outline-variant/5">
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-surface-container-highest border-t-primary-container animate-spin" />
          <p className="text-on-surface/60 font-body text-sm">Loading your vesting data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-container text-on-error-container p-6 rounded-lg border border-outline-variant/10">
        <p className="font-label font-bold text-sm">Failed to load vesting data. Please try again.</p>
      </div>
    );
  }

  const releasableFormatted = formatTokens(releasableAmount);
  const totalFormatted = formatTokens(totalAllocated);
  const releasedFormatted = formatTokens(totalReleased);

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
            <div>
              <h1 className="text-on-surface/60 font-label text-xs uppercase tracking-[0.2em] mb-2">Available for Claim</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter">{releasableFormatted}</span>
                <span className="text-2xl font-headline font-bold text-secondary-container">SNACK</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={claim}
                disabled={isClaiming || releasableAmount === 0n}
                className="w-full py-5 rounded-full primary-gradient-bg text-on-primary-container font-headline font-extrabold text-xl shadow-[var(--shadow-card)] hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isClaiming ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-on-primary-container/30 border-t-on-primary-container animate-spin" />
                    Confirming...
                  </>
                ) : isRefreshing ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-on-primary-container/30 border-t-on-primary-container animate-spin" />
                    Refreshing Data...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Claim Your Tokens
                  </>
                )}
              </button>
              {claimError && (
                <p className="text-error text-xs font-label text-center">Transaction failed. Please try again.</p>
              )}
              <a
                href="https://cryptosnack.com/how-to-add-the-snack-token-to-your-wallet/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full bg-surface-bright text-on-surface font-headline font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">help</span>
                Guide: Add SNACK to your Wallet
              </a>
            </div>
          </div>

          <div className="bg-surface-container p-6 md:p-8 rounded-lg space-y-6 border border-outline-variant/5">
            <h2 className="font-headline font-bold text-lg border-b border-outline-variant/10 pb-4">Vesting Progress</h2>
            <div className="space-y-6">
              <ProgressBar
                percent={claimablePercent}
                totalFormatted={totalFormatted}
                claimedFormatted={releasedFormatted}
              />
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-on-surface/60 text-sm font-medium">Vesting Started</span>
                  <span className="text-on-surface font-bold text-sm">{formatDate(startDate)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-on-surface/60 text-sm font-medium">Cliff End</span>
                  <span className="text-on-surface font-bold text-sm">{formatDate(cliffDate)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-on-surface/60 text-sm font-medium">Fully Vested</span>
                  <span className="text-on-surface font-bold text-sm">{formatDate(endDate)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-on-surface/60 text-sm font-medium">Tokens Already Claimed</span>
                  <span className="text-on-surface font-bold text-sm">{releasedFormatted} SNACK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
       {isConnected && tokenBalance !== undefined && (
         <div className="bg-surface-container-low/50 rounded-lg p-4 border border-outline-variant/10 mt-4">
           <div className="flex items-center justify-between">
             <div className="flex items-baseline gap-2">
               <span className="text-on-surface/60 text-sm font-label">Wallet Balance</span>
               <span className="text-sm font-body font-bold text-on-surface">
                 {showBalance ? `${formatTokens(tokenBalance)} SNACK` : "••••••• SNACK"}
               </span>
             </div>
             <button
               onClick={() => setShowBalance(!showBalance)}
               className="p-2 rounded-full hover:bg-surface-container-highest transition-colors"
               aria-label={showBalance ? "Hide balance" : "Show balance"}
             >
               <span className="material-symbols-outlined text-on-surface-variant text-sm">
                 {showBalance ? "visibility" : "visibility_off"}
               </span>
             </button>
           </div>
         </div>
)}
    </>
  );
}
