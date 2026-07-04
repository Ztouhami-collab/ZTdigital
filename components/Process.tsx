const steps = [
  {
    n: "01",
    title: "Gesprek",
    body: "We bespreken je probleem en doelen. Gratis en vrijblijvend.",
  },
  {
    n: "02",
    title: "Plan",
    body: "Concreet plan met tijdlijn en prijs. Geen verrassingen achteraf.",
  },
  {
    n: "03",
    title: "Bouwen",
    body: "Snel bouwen met tussentijdse feedback.",
  },
  {
    n: "04",
    title: "Live",
    body: "Soepele oplevering en doorlopende beschikbaarheid.",
  },
];

export default function Process() {
  return (
    <section id="werkwijze" className="bg-[#F9FAFB] px-6 py-24 text-center md:py-28">
      <h2 className="mx-auto max-w-[640px] font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
        Hoe we werken
      </h2>
      <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-[1.5] text-ink-muted">
        Van eerste gesprek tot live product — helder, snel en zonder
        verrassingen.
      </p>

      <div className="relative mx-auto mt-16 grid max-w-content grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-4">
        {/* connecting line (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-[#E3E1E8] lg:block" />

        {steps.map((s) => (
          <div key={s.n} className="relative">
            <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E3E1E8] bg-white font-display text-[18px] font-bold text-brand-green-dark">
              {s.n}
            </div>
            <h3 className="mb-2 font-display text-[19px] font-bold tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-ink-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
