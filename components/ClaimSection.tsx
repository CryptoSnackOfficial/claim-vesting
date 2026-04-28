"use client";

import { useWriteContract } from "wagmi";
import { vestingContract } from "@/lib/contract";
import { useReleasableAmount } from "@/hooks/useReleasableAmount";
import { useRef, useState, useEffect } from "react";

interface ClaimSectionProps {
  address?: `0x${string}`;
}

function formatTokens(raw: bigint, decimals = 18): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const fractionStr = fraction.toString().padStart(decimals, "0").slice(0, 2);
  return `${whole.toLocaleString()}.${fractionStr}`;
}

export function ClaimSection({ address }: ClaimSectionProps) {
  const { releasableAmount, isLoadingReleasable, errorReleasable, refetchReleasable } = useReleasableAmount(address);
  const { writeContract, isPending: isClaiming, error: claimError } = useWriteContract();
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

  const handleClaim = async () => {
    if (!address) return;

    try {
      await writeContract({
        address: vestingContract.address,
        abi: vestingContract.abi,
        functionName: "release",
        args: undefined,
      });

      setTimeout(async () => {
        await refetchReleasable();
      }, 1500);
    } catch (err) {
      console.error("Claim failed:", err);
      throw err;
    }
  };

  if (isLoadingReleasable) {
    return (
      <div className="space-y-4 animate-pulse">
        <div>
          <h1 className="text-on-surface/60 font-label text-xs uppercase tracking-[0.2em] mb-2">Available for Claim</h1>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface/30">—.—</span>
            <span className="text-2xl font-headline font-bold text-secondary-container">SNACK</span>
          </div>
        </div>
        <div className="w-full py-5 rounded-full bg-surface-container-highest" />
      </div>
    );
  }

  if (errorReleasable && releasableAmount === 0n) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-on-surface/60 font-label text-xs uppercase tracking-[0.2em] mb-2">Available for Claim</h1>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-error">—.—</span>
            <span className="text-2xl font-headline font-bold text-secondary-container">SNACK</span>
          </div>
        </div>
        <p className="text-error text-xs">Unable to load claimable amount. Please refresh to try again.</p>
      </div>
    );
  }

  const releasableFormatted = formatTokens(releasableAmount);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-on-surface/60 font-label text-xs uppercase tracking-[0.2em] mb-2">Available for Claim</h1>
        <div className="flex items-baseline gap-3">
          <span className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter">{releasableFormatted}</span>
          <span className="text-2xl font-headline font-bold text-secondary-container">SNACK</span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleClaim}
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
  );
}