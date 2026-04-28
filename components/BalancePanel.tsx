"use client";

import { useState } from "react";
import { useTokenBalance } from "@/hooks/useTokenBalance";

interface BalancePanelProps {
  address?: `0x${string}`;
}

function formatTokens(raw: bigint, decimals = 18): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const fractionStr = fraction.toString().padStart(decimals, "0").slice(0, 2);
  return `${whole.toLocaleString()}.${fractionStr}`;
}

export function BalancePanel({ address }: BalancePanelProps) {
  const { tokenBalance, isLoadingBalance, errorBalance } = useTokenBalance(address);
  const [showBalance, setShowBalance] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  if (isLoadingBalance) {
    return (
      <div className="bg-surface-container-low/50 rounded-lg p-4 border border-outline-variant/10 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-on-surface/60 text-sm font-label">Wallet Balance</span>
            <span className="text-sm font-body font-bold text-on-surface">Loading...</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest" />
        </div>
      </div>
    );
  }

  if (errorBalance && tokenBalance === undefined) {
    return (
      <div className="bg-surface-container-low/50 rounded-lg p-4 border border-outline-variant/10">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-on-surface/60 text-sm font-label">Wallet Balance</span>
            <span className="text-sm font-body text-error">Unable to load</span>
          </div>
          <button
            onClick={() => {
              setIsRetrying(true);
              setTimeout(() => setIsRetrying(false), 2000);
            }}
            disabled={isRetrying}
            className="p-2 rounded-full hover:bg-surface-container-highest transition-colors disabled:opacity-50"
            title="Retry loading balance"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm">refresh</span>
          </button>
        </div>
        <p className="text-on-surface/40 text-xs mt-1">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low/50 rounded-lg p-4 border border-outline-variant/10">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-on-surface/60 text-sm font-label">Wallet Balance</span>
          <span className="text-sm font-body font-bold text-on-surface">
            {showBalance ? `${formatTokens(tokenBalance ?? 0n)} SNACK` : "••••••• SNACK"}
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
  );
}