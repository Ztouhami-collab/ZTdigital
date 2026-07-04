import UrlAnalyzer from "./UrlAnalyzer";
import Stats from "./Stats";

export default function Hero() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-20 text-center md:pt-24">
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/45 bg-brand-green/10 px-4 py-[7px] text-[13px] font-semibold text-brand-green-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          AI · Software · Automatisering
        </div>

        <h1 className="mt-6 max-w-[660px] font-display text-[40px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[52px] md:text-[58px]">
          Jouw bedrijf weet dat AI moet.
          <br />
          <span className="text-[#6BB82E]">
            Wij zorgen dat het ook echt werkt.
          </span>
        </h1>

        <p className="mt-5 max-w-[440px] text-[17px] leading-[1.55] text-ink-muted md:text-[18px]">
          Vaste prijzen. Concreet stappenplan. Resultaat dat je voelt — geen
          vaag advies.
        </p>

        <UrlAnalyzer />
        <Stats />
      </div>
    </section>
  );
}
