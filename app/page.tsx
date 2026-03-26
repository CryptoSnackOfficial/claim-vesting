import { NavBar } from "@/components/NavBar";
import { SecurityBanner } from "@/components/SecurityBanner";
import { VestingCard } from "@/components/VestingCard";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SecurityBanner />

          <section className="text-center space-y-4 py-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-on-surface">
              SNACK Token Vesting
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto font-body">
              This site shows your SNACK token vesting schedule. Connect your wallet to see how many tokens are available to claim. When tokens are ready, click "Claim" to transfer them to your wallet.
            </p>
            <p className="text-center text-on-surface/40 text-sm font-body max-w-md mx-auto">
              Please Note: This app does not hold your tokens or private keys, or record any transactions or wallet addresses. All interactions are directly with the secure vesting smart contract on the BNB Smart Chain. 
            </p>
          </section>

          <section className="relative">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-[100px] -z-10" />
            <VestingCard />
          </section>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="flex items-center gap-2 px-6 py-3 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-full text-xs font-label font-bold transition-all border border-outline-variant/10"
              href={`https://bscscan.com/address/${process.env.NEXT_PUBLIC_VESTING_CONTRACT_ADDRESS ?? "#"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
              VIEW CONTRACT ON BSCSCAN
            </a>
            <a
              className="flex items-center gap-2 px-6 py-3 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-full text-xs font-label font-bold transition-all border border-outline-variant/10"
              href="https://cryptosnack.com/how-to-add-the-snack-token-to-your-wallet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              ADD SNACK TO WALLET
            </a>
          </div>

          <section className="py-12 flex flex-col items-center space-y-6">
            <div className="opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
              <div className="h-10 w-auto bg-surface-container-highest rounded-full flex items-center justify-center px-4 md:px-6 gap-3 md:gap-4">
                <img src="/images/chain-light.svg?v=26.3.2.0" alt="BNB Chain" className="h-6 md:h-7 w-auto" />
                <img src="/images/logo-dark.svg?v=26.3.2.0" alt="BscScan" className="h-6 md:h-7 w-auto" />
                <a href="https://skynet.certik.com/projects/crypto-snack"><img src="data:image/svg+xml,%3csvg%20width='2750'%20height='552'%20viewBox='0%200%202750%20552'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M259.998%200L75.6531%2061.5265Z'%20fill='white'/%3e%3cpath%20d='M259.998%200L444.342%2061.5265Z'%20fill='white'/%3e%3cpath%20d='M159.34%20301.235H360.656Z'%20fill='white'/%3e%3cpath%20d='M75.6531%2061.5265L93.9042%2095.4048Z'%20fill='white'/%3e%3cpath%20d='M137.805%20261.253H382.191Z'%20fill='white'/%3e%3cpath%20d='M426.092%2095.4048L444.342%2061.5265Z'%20fill='white'/%3e%3cpath%20d='M482.849%2074.3677L512.363%2084.2217Z'%20fill='white'/%3e%3cpath%20d='M259.999%2039.9717L426.092%2095.4048Z'%20fill='white'/%3e%3cpath%20d='M37.1479%2074.3677L7.63753%2084.2244Z'%20fill='white'/%3e%3cpath%20d='M93.9042%2095.4048L259.999%2039.9717Z'%20fill='white'/%3e%3cpath%20d='M259.998%200L75.6531%2061.5265L93.9042%2095.4048L259.999%2039.9717L426.092%2095.4048L444.342%2061.5265L259.998%200Z'%20fill='white'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M360.656%20301.235H159.34L259.998%20488.12L360.656%20301.235ZM137.805%20261.253H382.191L482.849%2074.3677L512.363%2084.2217C530.76%20179.32%20515.683%20277.851%20469.687%20363.108C423.692%20448.365%20349.609%20515.101%20259.999%20552C170.39%20515.101%2096.307%20448.365%2050.3114%20363.108C4.31582%20277.851%20-10.76%20179.323%207.63753%2084.2244L37.1479%2074.3677L137.805%20261.253ZM85.396%20343.908C55.6135%20288.614%2040.0155%20226.801%2039.9984%20164.004L210.656%20480.849C158.216%20446.254%20115.179%20399.203%2085.396%20343.908ZM479.999%20164.004L309.342%20480.849C361.782%20446.254%20404.819%20399.203%20434.602%20343.908C464.384%20288.614%20479.982%20226.801%20479.999%20164.004Z'%20fill='white'/%3e%3cpath%20d='M779%20414C769.4%20414%20760.6%20411.828%20752.6%20407.483C744.867%20402.883%20738.6%20396.878%20733.8%20389.467C729.267%20381.8%20727%20373.367%20727%20364.167V187.833C727%20178.633%20729.267%20170.328%20733.8%20162.917C738.6%20155.25%20744.867%20149.244%20752.6%20144.9C760.6%20140.3%20769.4%20138%20779%20138H1014.2V179.4H785C780.733%20179.4%20777.133%20180.806%20774.2%20183.617C771.533%20186.172%20770.2%20189.494%20770.2%20193.583V358.417C770.2%20362.506%20771.533%20365.956%20774.2%20368.767C777.133%20371.322%20780.733%20372.6%20785%20372.6H1014.2V414H779Z'%20fill='white'/%3e%3cpath%20d='M1134.2%20414V138H1398.2V179.4H1177.8V255.3H1355V296.7H1177.8V372.6H1398.2V414H1134.2Z'%20fill='white'/%3e%3cpath%20d='M1754.2%20413.809L1664.2%20310.692H1720.6L1804.6%20406.142V413.809H1754.2ZM1518.2%20413.809V138.192H1753.8C1763.4%20138.192%201772.2%20140.492%201780.2%20145.092C1788.2%20149.692%201794.47%20155.825%201799%20163.492C1803.8%20170.903%201806.2%20179.081%201806.2%20188.025V265.459C1806.2%20274.659%201803.8%20283.092%201799%20290.759C1794.47%20298.17%201788.2%20304.175%201780.2%20308.775C1772.2%20313.12%201763.4%20315.292%201753.8%20315.292L1561.4%20315.675V413.809H1518.2ZM1571.4%20273.509H1753C1755.67%20273.509%201757.93%20272.614%201759.8%20270.825C1761.67%20269.036%201762.6%20266.864%201762.6%20264.309V189.175C1762.6%20186.62%201761.67%20184.447%201759.8%20182.659C1757.93%20180.614%201755.67%20179.592%201753%20179.592H1571.4C1568.73%20179.592%201566.33%20180.614%201564.2%20182.659C1562.33%20184.447%201561.4%20186.62%201561.4%20189.175V264.309C1561.4%20266.864%201562.33%20269.036%201564.2%20270.825C1566.33%20272.614%201568.73%20273.509%201571.4%20273.509Z'%20fill='white'/%3e%3cpath%20d='M2036.6%20414V179.4H1914.2V138H2202.2V179.4H2079.8V414H2036.6Z'%20fill='white'/%3e%3cpath%20d='M2310.2%20414V138H2353.4V414H2310.2Z'%20fill='white'/%3e%3cpath%20d='M2473.4%20414V138H2517V255.3H2596.6L2699%20138H2749V145.667L2635%20276L2749.4%20406.333V414H2699L2596.6%20296.7H2517V414H2473.4Z'%20fill='white'/%3e%3c/svg%3e" alt="Certik" className="h-6 md:h-7 w-auto" /></a>
              </div>
            </div>
            <p className="text-center text-on-surface/40 text-sm font-body max-w-md mx-auto">
              The Crypto Snack vesting contract is designed to be secure and transparent, but always exercise caution when interacting with smart contracts. Ensure you are on the correct website and never share your private keys or seed phrases with anyone.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
