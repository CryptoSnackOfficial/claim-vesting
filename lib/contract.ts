import { createPublicClient, createWalletClient, http } from "viem";
import { bsc } from "viem/chains";
import vestingContractInfo from "@/constants/vestingContract.json";

const vestingAddress = process.env.NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS ?? "";
const snackTokenAddress = process.env.NEXT_PUBLIC_SNACK_TOKEN_ADDRESS ?? "";

export const publicClient = createPublicClient({
  chain: bsc,
  transport: http(process.env.NEXT_PUBLIC_BSC_RPC_URL ?? "https://bsc-dataseed.binance.org/"),
});

export function getWalletClient(account: `0x${string}`) {
  return createWalletClient({ account, chain: bsc, transport: http() });
}

export const vestingContract = {
  address: vestingAddress as `0x${string}`,
  abi: vestingContractInfo.abi,
} as const;

export const snackToken = {
  address: snackTokenAddress as `0x${string}`,
  abi: [
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenAddress", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
  ],
} as const;
