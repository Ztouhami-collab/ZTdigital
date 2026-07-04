import type { SVGProps } from "react";

export type IconName =
  | "euro"
  | "bolt"
  | "chat"
  | "bulb"
  | "spark"
  | "gear"
  | "robot"
  | "code"
  | "browser"
  | "phone"
  | "compass";

const paths: Record<IconName, string> = {
  euro: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
  chat: "M8 10h8M8 14h5M21 12a8.5 8.5 0 0 1-11.5 8L3 21l1-6.5A8.5 8.5 0 1 1 21 12z",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z",
  spark:
    "M12 3l1.8 4.9L18.7 9l-4.9 1.8L12 15.7l-1.8-4.9L5.3 9l4.9-1.1L12 3zM18 15l.9 2.4L21 18l-2.1.6L18 21l-.9-2.4L15 18l2.1-.6L18 15z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a7.9 7.9 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.9 7.9 0 0 0-1.7-1L15 3H9l-.3 2.5a7.9 7.9 0 0 0-1.7 1l-2.4-1-2 3.4L2.6 11a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1L9 21h6l.3-2.5c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6z",
  robot:
    "M12 2v3M7 8h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM9 13h.01M15 13h.01M9 16h6M3 12v3M21 12v3",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16",
  browser:
    "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 9h20M6 6.5h.01M9 6.5h.01",
  phone:
    "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 18h4",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16 8l-2 6-6 2 2-6 6-2z",
};

export function Icon({
  name,
  className,
  ...props
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
