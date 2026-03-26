const VESTING_CONTRACT = process.env.NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS ?? "0x...";

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-10 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface">
            © 2026 CRYPTO SNACK. ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className="flex gap-8">
          <a
            className="font-body text-xs uppercase tracking-widest text-on-surface/60 hover:text-on-surface transition-colors"
            href={`https://bscscan.com/address/${VESTING_CONTRACT}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            BSCSCAN
          </a>
          <a
            className="font-body text-xs uppercase tracking-widest text-on-surface/60 hover:text-on-surface transition-colors"
            href="https://cryptosnack.com/how-to-add-the-snack-token-to-your-wallet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ADD TO WALLET
          </a>
          <a
            className="font-body text-xs uppercase tracking-widest text-on-surface/60 hover:text-on-surface transition-colors"
            href="https://skynet.certik.com/projects/crypto-snack#code-security"
            target="_blank"
            rel="noopener noreferrer"
          >
            SECURITY AUDIT
          </a>
        </div>
        <div className="flex gap-4">
          <a
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-all group"
            href="https://cryptosnack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icon.png" alt="CryptoSnack" className="w-8 h-8 object-contain" />
          </a>
          <a
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 transition-all group"
            href="https://x.com/CryptoSnack_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
