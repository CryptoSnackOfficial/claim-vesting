"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { vestingContract, snackToken } from "@/lib/contract";
import type { VestingData, VestingSchedule } from "@/types/vesting";
import { useMemo, useCallback } from "react";

function timestampToDate(ts: bigint): Date | null {
  if (ts === 0n) return null;
  return new Date(Number(ts) * 1000);
}

export function useVestingData(): VestingData & {
  isLoading: boolean;
  error: Error | null;
  claim: () => Promise<void>;
  isClaiming: boolean;
  claimError: Error | null;
  refetch: () => Promise<void>;
  tokenBalance: bigint | undefined;
} {
  const { address: walletAddress } = useAccount();
  const queryClient = useQueryClient();

  const contractAddress = vestingContract.address;

   const {
     data: rawReleasable,
     isLoading: isLoadingReleasable,
     error: errorReleasable,
     refetch: refetchReleasable,
   } = useReadContract({
     address: contractAddress,
     abi: vestingContract.abi,
     functionName: "getReleasableAmount",
     args: walletAddress ? [walletAddress] : undefined,
     query: { enabled: !!walletAddress },
   });

   const {
     data: rawSchedule,
     isLoading: isLoadingSchedule,
     error: errorSchedule,
     refetch: refetchSchedule,
   } = useReadContract({
     address: contractAddress,
     abi: vestingContract.abi,
     functionName: "getVestingSchedule",
     args: walletAddress ? [walletAddress] : undefined,
     query: { enabled: !!walletAddress },
   });

   const {
     data: rawTokenBalance,
     isLoading: isLoadingBalance,
     error: errorBalance,
     refetch: refetchBalance,
   } = useReadContract({
     address: snackToken.address,
     abi: snackToken.abi,
     functionName: "balanceOf",
     args: walletAddress ? [walletAddress] : undefined,
     query: { enabled: !!walletAddress },
   });

  const {
    writeContract,
    isPending: isClaiming,
    error: claimError,
  } = useWriteContract();

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

  const vestingData = useMemo((): VestingData => {
    const releasableAmount = (rawReleasable as bigint) ?? 0n;
    const totalAllocated = schedule?.tokensAmount ?? 0n;
    const totalReleased = schedule?.tokensAlreadyReleased ?? 0n;
    const claimablePercent = totalAllocated > 0n
      ? Number((totalReleased * 10000n) / totalAllocated) / 100
      : 0;

    return {
      releasableAmount,
      schedule,
      totalAllocated,
      totalReleased,
      claimablePercent,
      cliffDate: schedule ? timestampToDate(schedule.cliffEndTimestamp) : null,
      startDate: schedule ? timestampToDate(schedule.startTimestamp) : null,
      endDate: schedule
        ? timestampToDate(schedule.startTimestamp + schedule.vestingDuration)
        : null,
    };
  }, [rawReleasable, schedule]);

  const tokenBalance = rawTokenBalance as bigint | undefined;

  const claim = useCallback(async () => {
    if (!walletAddress) return;
    
    try {
      await writeContract({
        address: contractAddress,
        abi: vestingContract.abi,
        functionName: "release",
        args: undefined,
      });
      
      // Wait a block then refetch to update UI
      setTimeout(async () => {
        await Promise.all([
          refetchReleasable(),
          refetchSchedule(),
          refetchBalance?.(),
        ]);
      }, 1500);
    } catch (err) {
      console.error("Claim failed:", err);
      throw err;
    }
  }, [walletAddress, contractAddress, writeContract, refetchReleasable, refetchSchedule]);

  const refetch = useCallback(async () => {
    await Promise.all([
      refetchReleasable(),
      refetchSchedule(),
      refetchBalance?.(),
    ]);
  }, [refetchReleasable, refetchSchedule, refetchBalance]);

  return {
    ...vestingData,
    tokenBalance,
    isLoading: isLoadingReleasable || isLoadingSchedule || isLoadingBalance,
    error: errorReleasable ?? errorSchedule ?? errorBalance,
    claim,
    isClaiming,
    claimError,
    refetch,
  };
}
