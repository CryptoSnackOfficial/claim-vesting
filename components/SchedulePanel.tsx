"use client";

import { ProgressBar } from "./ProgressBar";
import { useVestingSchedule } from "@/hooks/useVestingSchedule";
import { useMemo } from "react";

interface SchedulePanelProps {
  address?: `0x${string}`;
}

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

function timestampToDate(ts: bigint): Date | null {
  if (ts === 0n) return null;
  return new Date(Number(ts) * 1000);
}

export function SchedulePanel({ address }: SchedulePanelProps) {
  const { schedule, isLoadingSchedule, errorSchedule } = useVestingSchedule(address);

  const vestingData = useMemo(() => {
    const totalAllocated = schedule?.tokensAmount ?? 0n;
    const totalReleased = schedule?.tokensAlreadyReleased ?? 0n;
    const claimablePercent = totalAllocated > 0n
      ? Number((totalReleased * 10000n) / totalAllocated) / 100
      : 0;

    return {
      totalAllocated,
      totalReleased,
      claimablePercent,
      cliffDate: schedule ? timestampToDate(schedule.cliffEndTimestamp) : null,
      startDate: schedule ? timestampToDate(schedule.startTimestamp) : null,
      endDate: schedule
        ? timestampToDate(schedule.startTimestamp + schedule.vestingDuration)
        : null,
    };
  }, [schedule]);

  if (isLoadingSchedule) {
    return (
      <div className="bg-surface-container p-6 md:p-8 rounded-lg space-y-6 border border-outline-variant/5 animate-pulse">
        <h2 className="font-headline font-bold text-lg border-b border-outline-variant/10 pb-4">Vesting Progress</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-surface-container-highest rounded w-full" />
            <div className="h-3 bg-surface-container-highest rounded w-2/3" />
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div className="h-4 bg-surface-container-highest rounded w-24" />
                <div className="h-4 bg-surface-container-highest rounded w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (errorSchedule && schedule === null) {
    return (
      <div className="bg-surface-container p-6 md:p-8 rounded-lg space-y-6 border border-outline-variant/5">
        <h2 className="font-headline font-bold text-lg border-b border-outline-variant/10 pb-4">Vesting Progress</h2>
        <div className="text-center py-4">
          <p className="text-error text-sm">Unable to load vesting schedule</p>
          <p className="text-on-surface/40 text-xs mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!schedule || (schedule.tokensAmount === 0n && schedule.tokensAlreadyReleased === 0n)) {
    return (
      <div className="bg-surface-container p-6 md:p-8 rounded-lg space-y-6 border border-outline-variant/5">
        <h2 className="font-headline font-bold text-lg border-b border-outline-variant/10 pb-4">Vesting Progress</h2>
        <div className="text-center py-4">
          <p className="text-on-surface/60 text-sm">There is no Crypto Snack vesting schedule for this wallet address.</p>
          <p className="text-on-surface/40 text-xs mt-1">Or all tokens have already been claimed.</p>
        </div>
      </div>
    );
  }

  const totalFormatted = formatTokens(vestingData.totalAllocated);
  const releasedFormatted = formatTokens(vestingData.totalReleased);

  return (
    <div className="bg-surface-container p-6 md:p-8 rounded-lg space-y-6 border border-outline-variant/5">
      <h2 className="font-headline font-bold text-lg border-b border-outline-variant/10 pb-4">Vesting Progress</h2>
      <div className="space-y-6">
        <ProgressBar
          percent={vestingData.claimablePercent}
          totalFormatted={totalFormatted}
          claimedFormatted={releasedFormatted}
        />
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-on-surface/60 text-sm font-medium">Vesting Started</span>
            <span className="text-on-surface font-bold text-sm">{formatDate(vestingData.startDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-on-surface/60 text-sm font-medium">Cliff End</span>
            <span className="text-on-surface font-bold text-sm">{formatDate(vestingData.cliffDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-on-surface/60 text-sm font-medium">Fully Vested</span>
            <span className="text-on-surface font-bold text-sm">{formatDate(vestingData.endDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-on-surface/60 text-sm font-medium">Tokens Already Claimed</span>
            <span className="text-on-surface font-bold text-sm">{releasedFormatted} SNACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}