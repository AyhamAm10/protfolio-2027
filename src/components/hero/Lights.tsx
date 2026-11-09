import type { CSSProperties } from "react";

interface Glow {
  className: string;
  color: string;
  min: number;
  max: number;
  duration: number;
}

/**
 * Warm city light behind the portrait: amber bokeh and one oxblood leak
 * that echoes the tie. Pure CSS, breathing slowly; static under reduced motion.
 */
const glows: Glow[] = [
  { className: "right-[18%] top-[14%] size-[34rem]", color: "var(--amber)", min: 0.1, max: 0.18, duration: 11 },
  { className: "right-[2%] top-[46%] size-[18rem]", color: "var(--amber)", min: 0.12, max: 0.22, duration: 8 },
  { className: "right-[34%] bottom-[-6%] size-[28rem]", color: "var(--oxblood)", min: 0.35, max: 0.55, duration: 13 },
  { className: "left-[-12%] top-[-18%] size-[30rem]", color: "var(--amber)", min: 0.04, max: 0.08, duration: 15 },
];

export function Lights() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {glows.map((g) => (
        <span
          key={g.className}
          data-breathe
          className={`absolute rounded-full ${g.className}`}
          style={
            {
              background: `radial-gradient(circle, ${g.color} 0%, color-mix(in srgb, ${g.color} 35%, transparent) 30%, transparent 70%)`,
              "--o-min": g.min,
              "--o-max": g.max,
              opacity: g.min,
              animation: `breathe ${g.duration}s ease-in-out infinite`,
            } as CSSProperties
          }
        />
      ))}
      {/* Bottom fade so the hero settles into the page. */}
      <span className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
