"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   CI/CD pipeline: a change travels branch -> review -> actions ->
   azure -> live. Stages complete in turn while a log prints below,
   then the run starts again.
   ------------------------------------------------------------------ */

const STAGES = [
  { id: "branch", log: "branch pushed, pull request opened" },
  { id: "review", log: "reviewed and merged into main" },
  { id: "actions", log: "github actions: build and deploy" },
  { id: "azure", log: "released to the azure server" },
  { id: "live", log: "live on the platform's domain" },
];
const STEP_MS = 900;
const HOLD_MS = 2200;

export function Pipeline({ active, title }: { active: boolean; title: string }) {
  const reduced = useReducedMotion() ?? false;
  const [done, setDone] = useState(reduced ? STAGES.length : 0);

  useEffect(() => {
    if (reduced) {
      setDone(STAGES.length);
      return;
    }
    if (!active) {
      setDone(0);
      return;
    }
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step = step >= STAGES.length ? 0 : step + 1;
      setDone(step);
      timer = setTimeout(tick, step === STAGES.length ? HOLD_MS : STEP_MS);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [active, reduced]);

  const progress = Math.max(0, done - 1) / (STAGES.length - 1);

  return (
    <figure role="img" aria-label={title} className="w-full">
      <div aria-hidden="true">
        {/* Track */}
        <div className="relative px-[10%]">
          <span className="absolute top-[11px] right-[10%] left-[10%] h-px bg-umber" />
          <motion.span
            className="absolute top-[11px] left-[10%] h-px w-[80%] origin-left bg-amber"
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: reduced ? 0 : 0.8, ease: ease.cine }}
          />
          <ol className="relative flex justify-between">
            {STAGES.map((s, i) => {
              const isDone = i < done;
              const isCurrent = i === done - 1;
              return (
                <li key={s.id} className="flex w-0 flex-col items-center">
                  <span
                    className={`flex size-[23px] items-center justify-center rounded-full border transition-colors duration-500 ${
                      isDone ? "border-amber bg-ink" : "border-umber bg-ink"
                    }`}
                  >
                    <span
                      className={`size-[9px] rounded-full transition-all duration-500 ${
                        isDone ? "bg-amber" : "bg-umber"
                      } ${isCurrent && !reduced ? "shadow-[0_0_14px_3px_rgb(201_148_91/0.55)]" : ""}`}
                    />
                  </span>
                  <span
                    className={`mt-3 font-mono text-[0.625rem] whitespace-nowrap transition-colors duration-500 sm:text-[0.75rem] ${
                      isDone ? "text-bone" : "text-steel"
                    }`}
                  >
                    {s.id}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Log */}
        <div className="mt-10 border border-umber bg-ink p-4 font-mono text-[0.6875rem] leading-[1.9] sm:p-5 sm:text-[0.75rem]">
          {STAGES.map((s, i) => (
            <p key={s.id} className="flex gap-3">
              <span className={`transition-colors duration-300 ${i < done ? "text-amber" : "text-steel"}`}>
                {i < done ? "ok" : "--"}
              </span>
              <span className={`transition-colors duration-300 ${i < done ? "text-bone" : "text-steel"}`}>{s.log}</span>
            </p>
          ))}
        </div>
      </div>
    </figure>
  );
}
