import { createPublicClient, createWalletClient, http, defineChain } from "viem";
import vestingContractInfo from "@/constants/vestingContract.json";

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? "56", 10);
const isTestnet = chainId !== 56;

const bscMainnet = defineChain({
  id: 56,
  chainNamespace: "eip155",
  name: "BNB Smart Chain",
  caipNetworkId: "eip155:56",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
    },
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BSC_RPC_URL ?? "https://bsc-dataseed.binance.org/"],
    },
  },
});

const bscTestnet = defineChain({
  id: 97,
  chainNamespace: "eip155",
  name: "BNB Smart Chain Testnet",
  caipNetworkId: "eip155:97",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
    },
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ?? "https://bsc-testnet.publicnode.com/"],
    },
  },
});

const bsc = isTestnet ? bscTestnet : bscMainnet;

const vestingAddress = process.env.NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS ?? "";
const snackTokenAddress = process.env.NEXT_PUBLIC_SNACK_TOKEN_ADDRESS ?? "";

export const publicClient = createPublicClient({
  chain: bsc,
  transport: http(isTestnet
    ? (process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ?? "https://bsc-testnet.publicnode.com/")
    : (process.env.NEXT_PUBLIC_BSC_RPC_URL ?? "https://bsc-dataseed.binance.org/")),
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
