export function SecurityBanner() {
  return (
    <div className="bg-amber-900/20 text-amber-200 p-4 rounded-lg flex items-start gap-4 shadow-lg border border-amber-700/30">
      <span className="material-symbols-outlined filled shrink-0">security</span>
      <div className="text-sm font-label font-semibold tracking-wide">
        Please verify you are using a trustworthy site when connecting your wallet.{" "}
        <span className="underline decoration-2 underline-offset-4">vesting.cryptosnack.com</span> and{" "}
        <span className="underline decoration-2 underline-offset-4">bscscan.com</span> are the only two sites we recommend.
      </div>
    </div>
  );
}
