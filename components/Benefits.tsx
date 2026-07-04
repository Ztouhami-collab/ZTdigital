import { Icon } from "./icons";

const items = [
  {
    icon: "euro" as const,
    title: "Vaste prijzen",
    body: "Geen uurtarieven of verrassingen. Vooraf weet je exact wat het kost.",
  },
  {
    icon: "bolt" as const,
    title: "Snel opgeleverd",
    body: "Van eerste gesprek tot werkend product in gemiddeld 4 weken.",
  },
  {
    icon: "chat" as const,
    title: "Direct contact",
    body: "Je spreekt altijd met de bouwer zelf. Geen account managers.",
  },
  {
    icon: "bulb" as const,
    title: "Wij denken mee",
    body: "Niet zomaar een leverancier. Wij begrijpen jouw bedrijf en denken actief mee.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-white px-6 py-24 text-center md:py-28">
      <h2 className="mx-auto max-w-[640px] font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
        Waarom bedrijven kiezen voor ZT Digital
      </h2>
      <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-[1.5] text-ink-muted">
        Geen groot bureau, geen grote rekening. Wel grote resultaten.
      </p>

      <div className="mx-auto mt-14 grid max-w-content grid-cols-1 gap-[22px] text-left sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-[18px] border border-[#ECEBEF] bg-white p-8"
          >
            <div className="mb-5 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-brand-green/15">
              <Icon name={it.icon} className="h-[22px] w-[22px] text-brand-green-dark" />
            </div>
            <h3 className="mb-2 font-display text-[20px] font-bold tracking-[-0.01em]">
              {it.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-ink-muted">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
