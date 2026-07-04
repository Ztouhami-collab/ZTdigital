"use client";

import { useState } from "react";
import Logo from "./Logo";

const links = [
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#EFEFEF] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="ZT Digital home">
          <Logo />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <div className="flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand-dark px-5 py-[11px] text-[15px] font-semibold text-white transition-colors hover:bg-[#2A2438]"
          >
            Contact →
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAE8EE] md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
            <span className="block h-[2px] w-5 bg-ink" />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#EFEFEF] bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-ink-muted hover:bg-[#FAFAFA]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand-dark px-5 py-3 text-[15px] font-semibold text-white"
            >
              Contact →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
