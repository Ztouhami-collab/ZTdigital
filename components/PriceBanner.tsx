export default function PriceBanner() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-content overflow-hidden rounded-[24px] bg-brand-dark px-8 py-14 text-center md:px-16 md:py-16">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-[7px] text-[13px] font-semibold text-brand-green">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
          Ons verkoopargument
        </div>
        <p className="mx-auto max-w-[720px] font-display text-[26px] font-bold leading-[1.3] tracking-[-0.02em] text-white sm:text-[32px]">
          Wij werken altijd met{" "}
          <span className="text-brand-green">vaste prijzen.</span> Geen
          uurtarieven, geen verrassingen achteraf. Vooraf weet je exact wat het
          kost.
        </p>
      </div>
    </section>
  );
}
