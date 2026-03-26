import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SNACK | Secure Token Vesting & Claim",
  description: "Claim your SNACK tokens from the secure vesting contract.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/icon.png" />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <div className="viewport-container">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
