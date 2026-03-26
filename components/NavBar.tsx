"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export function NavBar() {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  if (!isMounted) {
    return (
      <div className="navbar">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Crypto Snack" className="h-12 w-auto flex-shrink-0" />
          </div>
          <div className="h-8 w-20 bg-surface-container-highest animate-pulse rounded-full flex-shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Crypto Snack" className="h-12 w-auto flex-shrink-0" />
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => disconnect()} className="px-2 py-1.5 rounded-full bg-surface-bright text-on-surface font-label font-bold text-xs hover:bg-surface-container-highest transition-colors whitespace-nowrap">
              {shortAddress}
            </button>
          </div>
        ) : (
          <button onClick={() => open()} className="px-3 py-1.5 rounded-full primary-gradient-bg text-on-primary-container font-headline font-bold text-xs hover:opacity-80 transition-all active:scale-95 duration-200 flex-shrink-0 whitespace-nowrap">
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
