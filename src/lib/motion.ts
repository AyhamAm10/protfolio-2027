import type React from "react";

/** Shared motion vocabulary: one curve family, no springs that bounce. */
export const ease = {
  cine: [0.7, 0, 0.2, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
};

/** The hero's single load sequence, in seconds from first paint. */
export const heroTimeline = {
  grid: 0,
  portrait: 0.25,
  name: 0.55,
  copy: 1.05,
  annotations: 1.35,
  annotationStagger: 0.18,
  footer: 1.8,
} as const;

/** Inline custom properties for a CSS `.intro` animation. */
export function intro(delay: number, duration = 1): React.CSSProperties {
  return { ["--delay" as string]: `${delay}s`, ["--d" as string]: `${duration}s` } as React.CSSProperties;
}
