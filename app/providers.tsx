"use client";

import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, defineChain } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";

const metadata = {
  name: "Crypto Snack",
  description: "Claim your SNACK tokens from the secure vesting contract",
  url: appUrl,
  icons: [`${appUrl}/images/cs_logo.png`],
};

const bsc = defineChain({
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

const networks = [bsc, mainnet];

const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
