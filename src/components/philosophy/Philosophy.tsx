"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { PhilosophyContent, Principle } from "@/content";
import { ease } from "@/lib/motion";
import { Sketch } from "./Sketch";

/* ------------------------------------------------------------------
   Architecture philosophy. Wide screens: a vertical tab list of
   principles beside one spec panel with the matching code sketch.
   Narrow screens: every principle stacked with its own sketch.
   ------------------------------------------------------------------ */

function SeenIn({ label, items }: { label: string; items: string[] }) {
  return (
    <p className="mt-6 font-mono text-[0.75rem] leading-relaxed text-steel">
      // {label}: <span className="text-bone/85">{items.join(", ")}</span>
    </p>
  );
}

function PrincipleText({ p, seenInLabel }: { p: Principle; seenInLabel: string }) {
  return (
    <>
      <p className="max-w-[48ch] text-[1.0625rem] leading-[1.65] text-bone/85">{p.body}</p>
      <SeenIn label={seenInLabel} items={p.seenIn} />
    </>
  );
}

function Tabs({ content }: { content: PhilosophyContent }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const base = useId();
  const count = content.principles.length;
  const current = content.principles[active]!;

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const keys: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: count - 1 };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = (next + count) % count;
    setActive(target);
    tabs.current[target]?.focus();
  }

  return (
    <div className="hidden gap-x-16 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div role="tablist" aria-orientation="vertical" aria-label={content.title} className="border-t border-umber">
        {content.principles.map((p, i) => {
          const selected = i === active;
          return (
            <div key={p.id} className="border-b border-umber">
              <button
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${base}-tab-${p.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group relative flex w-full items-baseline py-6 pr-4 pl-6 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 bottom-0 left-0 w-[2px] origin-top bg-oxblood transition-transform duration-700 ease-[var(--ease-cine)] ${
                    selected ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <span
                  className={`font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.015em] transition-colors duration-500 ${
                    selected ? "text-bone" : "text-steel group-hover:text-bone/80"
                  }`}
                >
                  {p.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${current.id}`}
        tabIndex={0}
        className="min-h-[34rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: ease.out }}
          >
            <Sketch sketch={current.sketch} />
            <div className="mt-8">
              <PrincipleText p={current} seenInLabel={content.seenInLabel} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stacked({ content }: { content: PhilosophyContent }) {
  return (
    <ul className="border-t border-umber lg:hidden">
      {content.principles.map((p) => (
        <li key={p.id} className="border-b border-umber py-10">
          <h3 className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.015em] text-bone">{p.title}</h3>
          <div className="mt-4">
            <PrincipleText p={p} seenInLabel={content.seenInLabel} />
          </div>
          <div className="mt-8">
            <Sketch sketch={p.sketch} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Philosophy({ content }: { content: PhilosophyContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="relative isolate border-y border-umber bg-espresso/50"
    >
      {/* Blueprint grid, used once more and sparingly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--umber)_1px,transparent_1px),linear-gradient(90deg,var(--umber)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000,transparent)]"
      />
      <div className="mx-auto max-w-[1520px] px-[var(--gutter)] py-28 md:py-40">
        <div className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16">
          <h2
            id={`${content.id}-title`}
            className="max-w-[12ch] font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] font-normal tracking-[-0.025em] text-bone"
          >
            {content.title}
          </h2>
          <p className="max-w-[44ch] self-end text-[1.0625rem] leading-[1.6] text-steel">{content.intro}</p>
        </div>

        <Tabs content={content} />
        <Stacked content={content} />

        <p className="mt-20 max-w-[28ch] font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.015em] text-bone lg:mt-28">
          {content.closing}
        </p>
      </div>
    </section>
  );
}
