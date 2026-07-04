/* eslint-disable @next/next/no-img-element */

type CaseItem = {
  image: string;
  label: string;
  name: string;
  body: string;
  tags: string[];
  linkText?: string;
  linkHref?: string;
  note?: string;
};

const cases: CaseItem[] = [
  {
    image: "/drivedesk-mockup.png",
    label: "SaaS · Automotive",
    name: "Drivedesk",
    body: "Een complete SaaS voor Nederlandse garages. RDW-koppeling, werkorders, facturatie en klantbeheer in één platform.",
    tags: ["Next.js", "Supabase", "SaaS"],
    linkText: "Bekijk project →",
    linkHref: "https://app.drivedesk.nl",
  },
  {
    image: "/opazorg-mockup.png",
    label: "Web App · Zorg",
    name: "Zorgapp",
    body: "Een installeerbare familie-app voor dagelijkse zorgregistratie. Suikerwaarden, medicijnen, afspraken en berichten realtime zichtbaar.",
    tags: ["Next.js", "PWA", "Realtime"],
    note: "Privé project — details op aanvraag",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="bg-white px-6 py-24 text-center md:py-28">
      <h2 className="mx-auto max-w-[640px] font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
        Wat we hebben gebouwd
      </h2>
      <p className="mx-auto mt-4 max-w-[480px] text-[17px] leading-[1.5] text-ink-muted">
        Van idee tot werkend product.
      </p>

      <div className="mx-auto mt-14 grid max-w-[960px] grid-cols-1 gap-[22px] text-left md:grid-cols-2">
        {cases.map((c) => (
          <article
            key={c.name}
            className="flex flex-col overflow-hidden rounded-[20px] border border-[#ECEBEF] bg-white"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#F4F4F6]">
              <img
                src={c.image}
                alt={`${c.name} mockup`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-green-dark">
                {c.label}
              </span>
              <h3 className="mt-2 font-display text-[24px] font-bold tracking-[-0.02em]">
                {c.name}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-muted">
                {c.body}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#F3F3F5] px-3 py-1 text-[12.5px] font-medium text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-1">
                {c.linkHref ? (
                  <a
                    href={c.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand-green-dark hover:text-brand-green"
                  >
                    {c.linkText}
                  </a>
                ) : (
                  <span className="text-[14px] italic text-ink-faint">
                    {c.note}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
