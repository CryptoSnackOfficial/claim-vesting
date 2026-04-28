"use client";

import { useReadContract } from "wagmi";
import { snackToken } from "@/lib/contract";

const RETRY_CONFIG = {
  retry: 5,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
};

export function useTokenBalance(address?: `0x${string}`) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: snackToken.address,
    abi: snackToken.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      retry: RETRY_CONFIG.retry,
      retryDelay: RETRY_CONFIG.retryDelay,
    },
  });

  return {
    tokenBalance: data as bigint | undefined,
    isLoadingBalance: isLoading,
    errorBalance: error,
    refetchBalance: refetch,
  };
}