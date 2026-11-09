import type { WorkContent } from "@/content";
import { CaseStudy } from "./CaseStudy";

export function SelectedWork({ content }: { content: WorkContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="mx-auto max-w-[1520px] px-[var(--gutter)] py-20 md:py-28"
    >
      <h2 id={`${content.id}-title`} className="sr-only">
        {content.title}
      </h2>
      <div className="flex flex-col gap-40">
        {content.cases.map((cs) => (
          <CaseStudy key={cs.id} cs={cs} />
        ))}
      </div>
    </section>
  );
}
