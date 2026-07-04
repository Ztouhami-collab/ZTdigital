import Logo from "./Logo";

const nav = [
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const contact = [
  { label: "hello@ztdigital.nl", href: "mailto:hello@ztdigital.nl" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "KvK 00000000", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark px-6 py-16 text-white">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 md:grid-cols-3">
        <div className="max-w-[300px]">
          <div className="[&_span]:text-white">
            <Logo className="text-white" />
          </div>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-white/60">
            Wij automatiseren bedrijfsprocessen en bouwen maatwerk software.
          </p>
        </div>

        <div className="md:justify-self-center">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Navigatie
          </div>
          <ul className="flex flex-col gap-2.5">
            {nav.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="text-[14.5px] text-white/70 transition-colors hover:text-brand-green"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end">
          <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Contact
          </div>
          <ul className="flex flex-col gap-2.5">
            {contact.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="text-[14.5px] text-white/70 transition-colors hover:text-brand-green"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-content border-t border-white/10 pt-6 text-[13px] text-white/40">
        © 2026 ZT Digital. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
