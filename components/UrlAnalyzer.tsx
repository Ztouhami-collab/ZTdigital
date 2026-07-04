"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "analyzing" | "done";

const STEPS = [
  "We analyseren jouw website",
  "We analyseren jouw competitie",
  "We analyseren de mogelijkheden in jouw branche",
  "We analyseren wat AI voor jou kan betekenen",
];

// Minimale duur van de animatie, ook als de API sneller klaar is.
const MIN_DISPLAY_MS = 8000;

function extractBedrijfsnaam(url: string): string {
  const cleaned = url
    .replace(/^(https?:\/\/)?(www\.)?/, "")
    .split(/[/.]/)[0];
  if (!cleaned) return "jouw bedrijf";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function UrlAnalyzer() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [bedrijfsnaam, setBedrijfsnaam] = useState("jouw bedrijf");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const runId = useRef(0);

  // Vink de stappen één voor één aan zolang we analyseren (0s / 2s / 4s / 6s).
  useEffect(() => {
    if (phase !== "analyzing") return;
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed || phase === "analyzing") return;

    const id = ++runId.current;
    setBedrijfsnaam(extractBedrijfsnaam(trimmed));
    setError(null);
    setResult(null);
    setStep(0);
    setPhase("analyzing");

    const started = Date.now();
    let payload: { result?: string; error?: string; ok: boolean };

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      payload = { result: data.result, error: data.error, ok: res.ok };
    } catch {
      payload = { error: "Kon geen verbinding maken. Probeer het later opnieuw.", ok: false };
    }

    // Wacht tot de minimale weergavetijd verstreken is.
    const elapsed = Date.now() - started;
    if (elapsed < MIN_DISPLAY_MS) await sleep(MIN_DISPLAY_MS - elapsed);

    // Negeer een verouderde run (gebruiker startte opnieuw).
    if (id !== runId.current) return;

    if (!payload.ok || !payload.result) {
      setError(payload.error || "Er ging iets mis. Probeer het opnieuw.");
      setPhase("idle");
      return;
    }

    setResult(payload.result);
    setPhase("done");
  }

  function reset() {
    runId.current++;
    setPhase("idle");
    setResult(null);
    setError(null);
    setStep(0);
  }

  return (
    <div className="mt-11 w-full max-w-[540px] rounded-[20px] border border-brand-green-soft bg-white p-[30px] pb-[26px] text-left shadow-[0_20px_50px_-22px_rgba(28,24,38,0.22),0_2px_8px_rgba(28,24,38,0.04)]">
      {phase === "idle" && (
        <>
          <h2 className="text-center font-display text-[22px] font-bold tracking-[-0.02em]">
            Wat kan AI voor jouw bedrijf betekenen?
          </h2>
          <p className="mx-auto mt-2 max-w-[400px] text-center text-[14.5px] leading-[1.5] text-ink-muted">
            Vul je website URL in en ontvang een echte AI-analyse van jouw
            bedrijf
          </p>

          <form onSubmit={analyze} className="mt-6 flex gap-2.5">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-[#E4E2E8] bg-[#FBFBFC] px-3.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9B96A6"
                strokeWidth="2"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="www.jouwbedrijf.nl"
                className="w-full flex-1 bg-transparent py-3.5 text-[15px] text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-brand-green px-5 text-[15px] font-bold text-[#12300A] transition-colors hover:bg-[#72BB31]"
            >
              Analyseer →
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-xl border border-[#F3C4C4] bg-[#FDF3F3] px-4 py-3 text-[14px] leading-[1.55] text-[#A13B3B]">
              {error}
            </div>
          )}

          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex">
              {["#C7E8A6", "#A7D97E", "#E7DDF3", "#F3D9C4"].map((c, i) => (
                <span
                  key={c}
                  className="h-[26px] w-[26px] rounded-full border-2 border-white"
                  style={{ background: c, marginLeft: i === 0 ? 0 : -9 }}
                />
              ))}
            </div>
            <span className="text-[13px] text-ink-faint">
              Al honderden bedrijven gingen je voor
            </span>
          </div>
        </>
      )}

      {phase === "analyzing" && (
        <>
          <h2 className="text-center font-display text-[19px] font-bold leading-[1.3] tracking-[-0.02em]">
            We analyseren nu wat AI in combinatie met software op maat kan
            betekenen voor{" "}
            <span className="text-brand-green-dark">{bedrijfsnaam}</span>
          </h2>

          <div className="mt-6 space-y-2.5">
            {STEPS.map((label, i) => {
              const status =
                i < step ? "done" : i === step ? "active" : "pending";
              return (
                <div
                  key={label}
                  className={
                    "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors " +
                    (status === "active"
                      ? "border-brand-green bg-brand-green/[0.08]"
                      : status === "done"
                        ? "border-brand-green-soft bg-white"
                        : "border-[#EDECF0] bg-white")
                  }
                >
                  <StepMark status={status} />
                  <span
                    className={
                      "text-[14.5px] leading-[1.4] " +
                      (status === "pending" ? "text-ink-faint" : "text-ink")
                    }
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {phase === "done" && (
        <>
          <div className="mb-4 space-y-2">
            {STEPS.map((label) => (
              <div key={label} className="flex items-center gap-2.5">
                <StepMark status="done" />
                <span className="text-[13.5px] leading-[1.4] text-ink-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <h2 className="font-display text-[19px] font-bold tracking-[-0.02em]">
            Analyse voor{" "}
            <span className="text-brand-green-dark">{bedrijfsnaam}</span>
          </h2>

          <div className="mt-3 whitespace-pre-wrap rounded-xl border border-brand-green-soft bg-brand-green/[0.08] px-4 py-4 text-[14px] leading-[1.65] text-ink">
            {result}
          </div>

          <div className="mt-5 flex flex-col items-center gap-3">
            <a
              href="#contact"
              className="w-full whitespace-nowrap rounded-xl bg-brand-green px-5 py-3.5 text-center text-[15px] font-bold text-[#12300A] transition-colors hover:bg-[#72BB31]"
            >
              Plan een gratis gesprek →
            </a>
            <button
              type="button"
              onClick={reset}
              className="text-[13px] font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline"
            >
              Analyseer een andere website
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function StepMark({ status }: { status: "done" | "active" | "pending" }) {
  if (status === "done") {
    return (
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-green">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="#12300A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (status === "active") {
    return (
      <span
        className="h-[22px] w-[22px] shrink-0 animate-spin rounded-full border-2 border-brand-green border-t-transparent"
        aria-hidden
      />
    );
  }
  return (
    <span
      className="h-[22px] w-[22px] shrink-0 rounded-full border-2 border-[#E4E2E8]"
      aria-hidden
    />
  );
}
