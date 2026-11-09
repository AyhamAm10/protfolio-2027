import type { LabContent } from "@/content";

/* ------------------------------------------------------------------
   Lab: a deliberately small, quiet strip of UI and 3D studies, kept
   apart from real work and labelled as studies.
   ------------------------------------------------------------------ */

export function Lab({ content }: { content: LabContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="mx-auto max-w-[1520px] px-[var(--gutter)] py-24 md:py-32"
    >
      <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-baseline md:gap-10">
        <h2
          id={`${content.id}-title`}
          className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-normal tracking-[-0.02em] text-bone"
        >
          {content.title}
        </h2>
        <p className="text-[1rem] leading-[1.6] text-steel">{content.intro}</p>
      </div>

      <ul className="grid border-y border-umber md:grid-cols-3">
        {content.items.map((item, i) => (
          <li key={item.id} className={i > 0 ? "border-t border-umber md:border-t-0 md:border-l" : undefined}>
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex h-full flex-col gap-3 py-8 md:py-10 ${
                i === 0 ? "md:pr-8" : i === content.items.length - 1 ? "md:pl-8" : "md:px-8"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-claret transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <span className="font-mono text-[0.75rem] text-amber">{item.kind}</span>
              <span className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.015em] text-bone">
                {item.name}
              </span>
              <span className="max-w-[34ch] text-[0.9375rem] leading-[1.55] text-steel">{item.description}</span>
              <span className="mt-auto flex items-baseline justify-between gap-4 pt-4">
                <span className="shrink-0 border-b border-bone/30 pb-0.5 text-[0.875rem] whitespace-nowrap text-bone transition-colors duration-300 group-hover:border-claret">
                  {item.link.label}
                </span>
                <span className="min-w-0 truncate font-mono text-[0.6875rem] text-steel">
                  {item.link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-[70ch] text-[0.8125rem] leading-[1.6] text-steel">{content.disclaimer}</p>
    </section>
  );
}
