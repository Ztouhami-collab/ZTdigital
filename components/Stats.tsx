const stats = [
  { value: "100%", sub: "Vaste prijzen" },
  { value: "< 4 wkn", sub: "Van idee naar live", accent: "wkn" },
  { value: "2+", sub: "Live producten" },
];

export default function Stats() {
  return (
    <div className="mt-[52px] flex flex-wrap items-stretch justify-center gap-y-6">
      {stats.map((s, i) => (
        <div key={s.sub} className="flex items-stretch">
          {i > 0 && <div className="mx-2 w-px self-stretch bg-[#EAE8EE]" />}
          <div className="px-6 text-center sm:px-10">
            <div className="font-display text-[34px] font-bold tracking-[-0.02em] sm:text-[40px]">
              {s.accent ? (
                <>
                  {s.value.replace(s.accent, "")}
                  <span className="text-[22px] text-[#6BB82E]">{s.accent}</span>
                </>
              ) : (
                s.value
              )}
            </div>
            <div className="mt-1 text-[14px] text-ink-faint">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
