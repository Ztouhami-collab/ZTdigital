import LogoMarqueeTrack from "./LogoMarqueeTrack";

const logos = [
  "openai",
  "anthropic",
  "microsoft",
  "aws",
  "vercel",
  "supabase",
  "n8n",
  "azure",
];

export default function LogoMarquee() {
  return (
    <section className="border-y border-[#F0F0F0] bg-[#FAFAFA] py-10">
      <div className="mb-6 text-center text-[12px] font-semibold tracking-[0.14em] text-ink-faint">
        WIJ BOUWEN MET
      </div>
      <div
        className="marquee-pause relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          <LogoMarqueeTrack logos={logos} />
          <LogoMarqueeTrack logos={logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
