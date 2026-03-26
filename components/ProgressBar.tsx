"use client";

interface ProgressBarProps {
  percent: number;
  totalFormatted: string;
  claimedFormatted: string;
}

export function ProgressBar({ percent, totalFormatted, claimedFormatted }: ProgressBarProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-label font-bold text-on-surface-variant">
        <span>TOTAL VESTED: {totalFormatted}</span>
        <span>{clampedPercent.toFixed(1)}% CLAIMED</span>
      </div>
      <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full primary-gradient-bg rounded-full shadow-[var(--shadow-glow)] transition-all duration-500"
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
}
