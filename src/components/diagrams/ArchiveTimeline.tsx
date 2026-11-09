"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   Time-based archiving. Five periods start in the live lane; when the
   visual becomes active, past periods drop into the archive one by one
   and the live load meter shrinks to the current period only.
   ------------------------------------------------------------------ */

const PERIODS = [
  { label: "term 1", short: "t1" },
  { label: "term 2", short: "t2" },
  { label: "term 3", short: "t3" },
  { label: "term 4", short: "t4" },
  { label: "current", short: "now" },
];
const PAST = PERIODS.length - 1;

interface Props {
  active: boolean;
  title: string;
  className?: string;
}

export function ArchiveTimeline({ active, title, className = "" }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [archived, setArchived] = useState(0);

  useEffect(() => {
    if (reduced) {
      setArchived(PAST);
      return;
    }
    if (!active) {
      setArchived(0);
      return;
    }
    const timers = Array.from({ length: PAST }, (_, i) =>
      setTimeout(() => setArchived(i + 1), 700 + i * 520),
    );
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  const load = (PERIODS.length - archived) / PERIODS.length;

  return (
    <figure role="img" aria-label={title} className={`w-full ${className}`}>
      <div className="relative h-[13.5rem]" aria-hidden="true">
        <span className="absolute top-0 left-0 font-mono text-[0.75rem] text-bone">live tables</span>
        <span className="absolute inset-x-0 top-[1.75rem] h-[4.5rem] border-y border-umber" />
        <span className="absolute top-[7.25rem] left-0 font-mono text-[0.75rem] text-steel">archive</span>
        <span className="absolute inset-x-0 top-[9rem] h-[4.5rem] border-y border-dashed border-steel/30" />

        {PERIODS.map((p, i) => {
          const isCurrent = i === PAST;
          const isArchived = i < archived;
          return (
            <motion.div
              key={p.label}
              className="absolute top-[2.25rem] h-[3.5rem] px-1"
              style={{ left: `${(i / PERIODS.length) * 100}%`, width: `${100 / PERIODS.length}%` }}
              initial={false}
              animate={{ y: isArchived ? "7.25rem" : "0rem" }}
              transition={{ duration: reduced ? 0 : 0.9, ease: ease.cine }}
            >
              <div
                className={`flex h-full flex-col items-center justify-center rounded-[2px] border px-1 sm:items-start sm:px-2 font-mono text-[0.6875rem] transition-colors duration-700 sm:text-[0.75rem] ${
                  isCurrent
                    ? "border-amber/70 bg-amber/10 text-bone"
                    : isArchived
                      ? "border-umber bg-espresso text-steel"
                      : "border-steel/40 bg-ink text-bone"
                }`}
              >
                <span className="truncate sm:hidden">{p.short}</span>
                <span className="hidden truncate sm:block">{p.label}</span>
                <span className="mt-0.5 hidden truncate text-[0.625rem] text-steel sm:block">
                  {isCurrent ? "read, write" : isArchived ? "read-only" : "live"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live load meter */}
      <div className="mt-8" aria-hidden="true">
        <p className="font-mono text-[0.75rem] text-steel">live table load</p>
        <div className="relative mt-3 h-1.5 bg-umber">
          <motion.span
            className="absolute inset-y-0 left-0 w-full origin-left bg-amber"
            initial={false}
            animate={{ scaleX: load }}
            transition={{ duration: reduced ? 0 : 0.9, ease: ease.cine }}
          />
        </div>
      </div>
    </figure>
  );
}
