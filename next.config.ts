import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.reown.com https://*.walletconnect.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://fonts.reown.com",
      "img-src 'self' data: blob: https://cryptosnack.com https://cdn.reown.com https://*.walletconnect.com",
      "connect-src 'self' wss://relay.walletconnect.org wss://rpc.walletconnect.com https://rpc.walletconnect.org https://bsc-dataseed.binance.org/ https://*.web3modal.org https://*.walletconnect.com https://*.coinbase.com https://cca-lite.coinbase.com https://api.web3modal.org https://api.dappicons.com https://pulse.walletconnect.org https://fonts.reown.com",
      "frame-src 'self' https://components.reown.com https://*.walletconnect.com https://*.walletconnect.org https://*.reown.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers(): Promise<Array<{ source: string; headers: typeof securityHeaders }>> {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
