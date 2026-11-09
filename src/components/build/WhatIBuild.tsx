import type { BuildContent } from "@/content";
import { StackMatrix } from "./StackMatrix";

export function WhatIBuild({ content }: { content: BuildContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="relative mx-auto max-w-[1520px] px-[var(--gutter)] py-28 md:py-40"
    >
      <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id={`${content.id}-title`}
            className="max-w-[12ch] font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] font-normal tracking-[-0.02em] text-bone"
          >
            {content.title}
          </h2>
          <p className="mt-6 max-w-[36ch] text-[1rem] leading-[1.6] text-steel">{content.intro}</p>
        </div>
        <StackMatrix content={content} />
      </div>
    </section>
  );
}
