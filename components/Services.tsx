import { Icon, IconName } from "./icons";

type Service = {
  icon: IconName;
  title: string;
  body: string;
  badge?: string;
};

const services: Service[] = [
  {
    icon: "spark",
    title: "AI Implementatie",
    body: "Van slimme chatbots tot geautomatiseerde workflows. Wij integreren AI direct in jouw dagelijkse bedrijfsvoering.",
  },
  {
    icon: "gear",
    title: "Procesautomatisering",
    body: "Herhalende processen kosten tijd en geld. Wij automatiseren ze zodat jij je focust op wat telt.",
  },
  {
    icon: "robot",
    title: "RPA — Robotic Process Automation",
    body: "Software die handmatige computerhandelingen automatisch uitvoert. Werkt ook met systemen zonder API.",
  },
  {
    icon: "code",
    title: "Maatwerk Software",
    body: "Een systeem dat precies doet wat jij nodig hebt. Gebouwd op jouw processen, niet andersom.",
  },
  {
    icon: "browser",
    title: "Websites & Webapps",
    body: "Van een professionele website tot een volledig platform. Modern, snel en mobielvriendelijk.",
    badge: "Vanaf €99",
  },
  {
    icon: "phone",
    title: "App ontwikkeling",
    body: "Progressive Web Apps en native apps die werken op elk apparaat.",
  },
  {
    icon: "compass",
    title: "Consultancy",
    body: "Niet zeker waar te beginnen? Wij denken vrijblijvend met je mee over digitalisering en automatisering.",
    badge: "Vanaf €50/uur",
  },
];

export default function Services() {
  return (
    <section id="diensten" className="bg-[#F9FAFB] px-6 py-24 text-center md:py-28">
      <h2 className="mx-auto max-w-[640px] font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
        Wat wij voor jou bouwen
      </h2>
      <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-[1.5] text-ink-muted">
        Van intelligente automatisering tot schaalbare software — altijd op
        maat, altijd vaste prijs.
      </p>

      <div className="mx-auto mt-14 grid max-w-content grid-cols-1 gap-[22px] text-left sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group flex flex-col rounded-[18px] border border-[#ECEBEF] bg-white p-8 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(28,24,38,0.25)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-brand-green/15">
                <Icon name={s.icon} className="h-[22px] w-[22px] text-brand-green-dark" />
              </div>
              {s.badge && (
                <span className="rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[12px] font-semibold text-brand-green-dark">
                  {s.badge}
                </span>
              )}
            </div>
            <h3 className="mb-2 font-display text-[19px] font-bold leading-[1.25] tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-ink-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
