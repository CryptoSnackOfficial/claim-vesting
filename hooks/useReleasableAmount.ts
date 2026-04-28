"use client";

import { useReadContract } from "wagmi";
import { vestingContract } from "@/lib/contract";

const RETRY_CONFIG = {
  retry: 5,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
};

export function useReleasableAmount(address?: `0x${string}`) {
  const {
    data: rawReleasable,
    isLoading: isLoadingReleasable,
    error: errorReleasable,
    refetch: refetchReleasable,
  } = useReadContract({
    address: vestingContract.address,
    abi: vestingContract.abi,
    functionName: "getReleasableAmount",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      retry: RETRY_CONFIG.retry,
      retryDelay: RETRY_CONFIG.retryDelay,
    },
  });

  return {
    releasableAmount: (rawReleasable as bigint) ?? 0n,
    isLoadingReleasable,
    errorReleasable,
    refetchReleasable,
  };
}