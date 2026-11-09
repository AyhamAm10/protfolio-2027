"use client";

import type { MoreWorkContent } from "@/content";
import { Registry } from "./ProjectRegistry";

export function MoreWork({ content }: { content: MoreWorkContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="mx-auto max-w-[1520px] px-[var(--gutter)] py-28 md:py-40"
    >
      <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2
          id={`${content.id}-title`}
          className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] font-normal tracking-[-0.025em] text-bone"
        >
          {content.title}
        </h2>
        <p className="max-w-[34ch] text-[1rem] leading-[1.6] text-steel">{content.intro}</p>
      </div>

      <Registry.Root columns={content.columns}>
        {content.projects.map((project) => (
          <Registry.Item key={project.id} project={project}>
            <Registry.Trigger />
            <Registry.Panel labels={content.labels} />
          </Registry.Item>
        ))}
      </Registry.Root>
    </section>
  );
}
