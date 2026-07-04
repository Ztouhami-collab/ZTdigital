"use client";

import { useState } from "react";

const DIENSTEN = [
  "App-ontwikkeling",
  "Webbots",
  "Automatisering van het bedrijf",
  "Kunstmatige intelligentie",
];

const inputClass =
  "w-full rounded-xl border border-[#E4E2E8] bg-[#FBFBFC] px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-brand-green focus:bg-white";

export default function ContactForm() {
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [diensten, setDiensten] = useState<string[]>([]);
  const [bericht, setBericht] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function toggleDienst(dienst: string) {
    setDiensten((prev) =>
      prev.includes(dienst)
        ? prev.filter((d) => d !== dienst)
        : [...prev, dienst]
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    if (!voornaam.trim() || !achternaam.trim() || !email.trim() || !bericht.trim()) {
      setError("Vul je voor- en achternaam, e-mailadres en bericht in.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          voornaam: voornaam.trim(),
          achternaam: achternaam.trim(),
          email: email.trim(),
          diensten,
          bericht: bericht.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Er ging iets mis. Probeer het opnieuw.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Kon geen verbinding maken. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[620px] rounded-[20px] border border-brand-green-soft bg-white p-6 text-left shadow-[0_20px_50px_-22px_rgba(28,24,38,0.22),0_2px_8px_rgba(28,24,38,0.04)] sm:p-8">
      <h2 className="text-center font-display text-[28px] font-bold tracking-[-0.02em] sm:text-[34px]">
        Contact Opnemen
      </h2>
      <p className="mx-auto mt-3 max-w-[460px] text-center text-[15px] leading-[1.55] text-ink-muted">
        Klaar om jouw bedrijf te transformeren met AI? Vul het onderstaande
        formulier in om een consultatie in te plannen.
      </p>

      {sent ? (
        <div className="mt-6 rounded-xl border border-brand-green-soft bg-brand-green/[0.08] px-5 py-6 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="#12300A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-4 text-[16px] font-semibold text-ink">
            Bedankt! We nemen binnen 24 uur contact op.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13.5px] font-medium text-ink">
                Voornaam
              </label>
              <input
                type="text"
                value={voornaam}
                onChange={(e) => setVoornaam(e.target.value)}
                placeholder="Jan"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[13.5px] font-medium text-ink">
                Achternaam
              </label>
              <input
                type="text"
                value={achternaam}
                onChange={(e) => setAchternaam(e.target.value)}
                placeholder="Jansen"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13.5px] font-medium text-ink">
              E-mailadres
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan@jouwbedrijf.nl"
              className={inputClass}
              required
            />
          </div>

          <div>
            <span className="mb-1.5 block text-[13.5px] font-medium text-ink">
              Diensten
            </span>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {DIENSTEN.map((dienst) => {
                const checked = diensten.includes(dienst);
                return (
                  <label
                    key={dienst}
                    className={
                      "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-[14px] transition-colors " +
                      (checked
                        ? "border-brand-green bg-brand-green/[0.08] text-ink"
                        : "border-[#E4E2E8] bg-[#FBFBFC] text-ink-muted hover:border-brand-green/50")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDienst(dienst)}
                      className="sr-only"
                    />
                    <span
                      className={
                        "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors " +
                        (checked
                          ? "border-brand-green bg-brand-green"
                          : "border-[#CFCDD6] bg-white")
                      }
                    >
                      {checked && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="#12300A"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {dienst}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13.5px] font-medium text-ink">
              Bericht
            </label>
            <textarea
              value={bericht}
              onChange={(e) => setBericht(e.target.value)}
              placeholder="Vertel ons over jouw project of uitdaging…"
              rows={5}
              className={inputClass + " resize-y"}
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-[#F3C4C4] bg-[#FDF3F3] px-4 py-3 text-[14px] leading-[1.55] text-[#A13B3B]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-green px-5 py-3.5 text-[15px] font-bold text-[#12300A] transition-colors hover:bg-[#72BB31] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Versturen…" : "Verstuur →"}
          </button>
        </form>
      )}
    </div>
  );
}
