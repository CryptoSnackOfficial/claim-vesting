"use client";

import { useReadContract } from "wagmi";
import { vestingContract } from "@/lib/contract";
import type { VestingSchedule } from "@/types/vesting";
import { useMemo } from "react";

const RETRY_CONFIG = {
  retry: 5,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
};

export function useVestingSchedule(address?: `0x${string}`) {
  const {
    data: rawSchedule,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
    refetch: refetchSchedule,
  } = useReadContract({
    address: vestingContract.address,
    abi: vestingContract.abi,
    functionName: "getVestingSchedule",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      retry: RETRY_CONFIG.retry,
      retryDelay: RETRY_CONFIG.retryDelay,
    },
  });

  const schedule: VestingSchedule | null = useMemo(() => {
    if (!rawSchedule) return null;

    if (Array.isArray(rawSchedule)) {
      const [
        totalAmount,
        startTime,
        cliff,
        duration,
        releasedAmount,
        revocable,
        revoked,
      ] = rawSchedule as [bigint, bigint, bigint, bigint, bigint, boolean, boolean];

      return {
        tokensAmount: totalAmount,
        startTimestamp: startTime,
        cliffEndTimestamp: cliff,
        vestingDuration: duration,
        tokensAlreadyReleased: releasedAmount,
        revocable,
        revoked,
      };
    }

    const raw = rawSchedule as {
      totalAmount: bigint;
      startTime: bigint;
      cliff: bigint;
      duration: bigint;
      releasedAmount: bigint;
      revocable: boolean;
      revoked: boolean;
    };

    return {
      tokensAmount: raw.totalAmount,
      startTimestamp: raw.startTime,
      cliffEndTimestamp: raw.cliff,
      vestingDuration: raw.duration,
      tokensAlreadyReleased: raw.releasedAmount,
      revocable: raw.revocable,
      revoked: raw.revoked,
    };
  }, [rawSchedule]);

  return {
    schedule,
    isLoadingSchedule,
    errorSchedule,
    refetchSchedule,
  };
}