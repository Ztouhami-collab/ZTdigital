export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-brand-dark">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#7EC83A" />
        </svg>
      </span>
      <span className="font-display text-[18px] font-bold tracking-[-0.02em]">
        ZT Digital
      </span>
    </span>
  );
}
