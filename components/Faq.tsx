"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Hoe lang duurt een project?",
    a: "Een website is binnen een week klaar. Een app of SaaS duurt gemiddeld 4 tot 8 weken.",
  },
  {
    q: "Werken jullie ook met kleine bedrijven?",
    a: "Ja, juist. We passen onze aanpak altijd aan op de situatie.",
  },
  {
    q: "Wat als ik niet weet wat ik nodig heb?",
    a: "Dat is waarvoor het gratis gesprek bedoeld is. We helpen je het probleem helder te krijgen.",
  },
  {
    q: "Kunnen jullie bestaande software uitbreiden?",
    a: "Ja. We bouwen nieuw maar werken ook aan bestaande software.",
  },
  {
    q: "Hoe zit het met onderhoud na oplevering?",
    a: "We bieden maandelijkse onderhoudscontracten aan voor updates en bugfixes.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-center font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
          Veelgestelde vragen
        </h2>

        <div className="mt-12 divide-y divide-[#ECEBEF] border-y border-[#ECEBEF]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                    {f.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E3E1E8] text-ink-muted transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[600px] text-[15.5px] leading-[1.6] text-ink-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
