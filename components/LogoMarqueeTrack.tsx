/* eslint-disable @next/next/no-img-element */

export default function LogoMarqueeTrack({
  logos,
  ariaHidden = false,
}: {
  logos: string[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 gap-4 pr-4"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((name) => (
        <div
          key={name}
          className="flex h-14 items-center justify-center rounded-[14px] border border-[#ECECEC] bg-white px-7 shadow-[0_1px_2px_rgba(28,24,38,0.03)]"
        >
          <img
            src={`/logos/${name}.svg`}
            alt={name}
            className="h-6 w-auto"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
