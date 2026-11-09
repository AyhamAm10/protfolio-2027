"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   Extensible schema: a new game joins the games table while every
   table that depends on games stays exactly as it was.
   ------------------------------------------------------------------ */

const EXISTING = ["game 1", "game 2", "game 3"];
const DEPENDENTS = ["tournaments", "titles", "votes", "reels"];

export function ExtensibleSchema({ active, title }: { active: boolean; title: string }) {
  const reduced = useReducedMotion() ?? false;
  const [added, setAdded] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setAdded(true);
      return;
    }
    if (!active) {
      setAdded(false);
      return;
    }
    const t = setTimeout(() => setAdded(true), 900);
    return () => clearTimeout(t);
  }, [active, reduced]);

  return (
    <figure role="img" aria-label={title} className="w-full">
      <div aria-hidden="true" className="grid grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] items-center sm:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)]">
        {/* games table */}
        <div className="border border-bone/50 bg-ink">
          <p className="border-b border-umber px-3 py-2.5 font-mono text-[0.75rem] text-bone sm:px-4">games</p>
          <ul className="font-mono text-[0.6875rem] sm:text-[0.75rem]">
            {EXISTING.map((g) => (
              <li key={g} className="border-b border-umber/70 px-3 py-2.5 text-steel sm:px-4">
                {g}
              </li>
            ))}
            <AnimatePresence initial={false}>
              {added ? (
                <motion.li
                  key="new"
                  className="overflow-hidden bg-amber/10 text-bone"
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: ease.cine }}
                >
                  <span className="flex items-center justify-between gap-2 border-l-2 border-amber px-3 py-2.5 sm:px-4">
                    new game
                    <span className="text-amber">+ added</span>
                  </span>
                </motion.li>
              ) : null}
            </AnimatePresence>
          </ul>
        </div>

        {/* references */}
        <div className="relative h-full">
          <span className="absolute top-1/2 right-0 left-0 h-px bg-bone/40" />
          <span className="absolute top-[12%] right-0 bottom-[12%] w-px bg-bone/40" />
        </div>

        {/* dependent tables */}
        <ul className="flex flex-col gap-2.5">
          {DEPENDENTS.map((d, i) => (
            <li key={d} className="flex items-center justify-between gap-2 border border-umber bg-espresso px-3 py-2.5 font-mono text-[0.6875rem] sm:px-4 sm:text-[0.75rem]">
              <span className="truncate text-bone">{d}</span>
              <motion.span
                className="shrink-0 text-amber sm:text-steel"
                initial={false}
                animate={{ opacity: added ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced || !added ? 0 : 0.6 + i * 0.15 }}
              >
                <span className="sm:hidden">ok</span>
                <span className="hidden sm:inline">untouched</span>
              </motion.span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
