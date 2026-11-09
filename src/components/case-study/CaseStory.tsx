"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CaseStep } from "@/content";
import { CaseVisual, visualFamily } from "@/components/diagrams/CaseVisual";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   Scroll story: steps scroll on the left while one sticky stage on
   the right shows the active step's diagram. Tenancy steps share one
   drawing that morphs from isolated to connected. On narrow screens
   each step carries its own inline diagram instead.
   ------------------------------------------------------------------ */

function Step({ step, onActive, figure }: { step: CaseStep; onActive: () => void; figure: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inCenter = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const inlineSeen = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  useEffect(() => {
    if (inCenter) onActive();
  }, [inCenter, onActive]);

  return (
    <div ref={ref} className="flex min-h-0 flex-col justify-center py-14 lg:min-h-[78vh] lg:py-0">
      <p className="font-mono text-[0.8125rem] text-amber">{step.kind}</p>
      <h4 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-normal tracking-[-0.018em] text-bone">
        {step.heading}
      </h4>
      <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.65] text-steel">{step.body}</p>

      {/* Inline diagram for narrow screens */}
      <figure className="mt-10 border border-umber bg-espresso/40 p-4 sm:p-6 lg:hidden">
        <CaseVisual visual={step.visual} active={inlineSeen} compact title={step.caption} />
        <figcaption className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-steel">
          {figure} {step.caption}
        </figcaption>
      </figure>
    </div>
  );
}

export function CaseStory({ steps, caseId }: { steps: CaseStep[]; caseId: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { margin: "-20% 0px -20% 0px" });

  const active = steps[activeIndex] ?? steps[0]!;
  const family = visualFamily(active.visual);
  const figure = (i: number) => `fig. ${i + 1}`;

  return (
    <div className="grid gap-x-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        {steps.map((step, i) => (
          <Step key={step.id} step={step} onActive={() => setActiveIndex(i)} figure={figure(i)} />
        ))}
      </div>

      {/* Sticky stage, wide screens only */}
      <div className="hidden lg:block">
        <div ref={stageRef} className="sticky top-[11vh] flex h-[78vh] flex-col">
          <div className="relative flex flex-1 items-center justify-center border border-umber bg-espresso/40 px-10 py-12">
            {/* Corner ticks, the same crop-mark language as the hero */}
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute size-3 border-bone/60 ${c}`} />
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${caseId}-${family}`}
                className="w-full max-w-[40rem]"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: ease.out }}
              >
                <CaseVisual visual={active.visual} active={stageInView} stage title={active.caption} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-baseline justify-between gap-6 pt-4 font-mono text-[0.75rem] text-steel" aria-live="polite">
            <span>
              {figure(activeIndex)} {active.caption}
            </span>
            <span className="shrink-0 tabular-nums" aria-hidden="true">
              {activeIndex + 1} / {steps.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
