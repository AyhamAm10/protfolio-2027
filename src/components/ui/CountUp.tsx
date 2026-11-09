"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const format = new Intl.NumberFormat("en-US");

/**
 * Counts from 0 to `to` once. The final value is server-rendered so the
 * number is correct without JavaScript and for screen readers.
 */
export function CountUp({ to, suffix = "", delay = 0, duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const final = `${format.format(to)}${suffix}`;

  const mountedAt = useRef(0);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    mountedAt.current = performance.now();
    if (ref.current && !reduced) ref.current.textContent = `0${suffix}`;
  }, [reduced, suffix]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !inView) return;
    // Honour the load-sequence delay only while the page is still settling.
    const elapsed = (performance.now() - mountedAt.current) / 1000;
    const controls = animate(0, to, {
      delay: Math.max(0.15, delay - elapsed),
      duration,
      ease: ease.out,
      onUpdate: (v) => {
        node.textContent = `${format.format(Math.round(v))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [to, suffix, delay, duration, reduced, inView]);

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {final}
      </span>
    </span>
  );
}
