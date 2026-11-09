import type { ExperienceContent, ExperienceEntry, LayerId } from "@/content";

/* ------------------------------------------------------------------
   Experience, without dates. Each row carries a small stack mark: the
   same four layers as "What I build", filled where the role reached.
   ------------------------------------------------------------------ */

const TOP_DOWN: LayerId[] = ["mobile", "dashboard", "api", "database"];
const ROW = "md:grid md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.15fr)] md:gap-x-12";

function LayerMark({ layers, names }: { layers: LayerId[]; names: ExperienceContent["layerNames"] }) {
  return (
    <div className="flex items-start gap-3">
      <div
        aria-hidden="true"
        title={TOP_DOWN.filter((id) => layers.includes(id)).map((id) => names[id]).join(", ")}
        className="flex w-10 flex-col gap-1"
      >
        {TOP_DOWN.map((id) => {
          const on = layers.includes(id);
          return (
            <span
              key={id}
              className={`h-2 ${
                on ? (id === "database" ? "bg-amber" : "bg-bone/80") : "border border-dashed border-steel/60"
              }`}
            />
          );
        })}
      </div>
      <span className="sr-only">
        Layers: {TOP_DOWN.filter((id) => layers.includes(id)).map((id) => names[id]).join(", ")}
      </span>
    </div>
  );
}

function Row({ entry, names }: { entry: ExperienceEntry; names: ExperienceContent["layerNames"] }) {
  return (
    <li className={`border-b border-umber py-10 md:py-12 ${ROW}`}>
      <div className="hidden md:block md:pt-3">
        <LayerMark layers={entry.layers} names={names} />
      </div>

      <div>
        <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1] tracking-[-0.02em] text-bone">
          {entry.company}
        </h3>
        <p className="mt-3 font-mono text-[0.8125rem] text-steel">{entry.role}</p>
        <p aria-hidden="true" className="mt-1 font-mono text-[0.75rem] text-steel/80 md:hidden">
          // {TOP_DOWN.filter((id) => entry.layers.includes(id)).reverse().map((id) => names[id]).join(", ")}
        </p>
      </div>

      <div className="mt-6 md:mt-1">
        <p className="max-w-[52ch] text-[1.0625rem] leading-[1.6] text-bone">{entry.summary}</p>
        {entry.points.length ? (
          <ul className="mt-4 max-w-[56ch] space-y-2">
            {entry.points.map((p) => (
              <li key={p} className="relative pl-5 text-[0.9375rem] leading-[1.6] text-steel">
                <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-steel/60" />
                {p}
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {entry.work.map((w) => (
            <li key={w.href}>
              <a
                href={w.href}
                className="border-b border-bone/30 pb-0.5 font-mono text-[0.75rem] text-bone transition-colors duration-300 hover:border-claret"
              >
                {w.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Experience({ content }: { content: ExperienceContent }) {
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
        <div className="max-w-[36ch] md:text-right">
          <p className="text-[1rem] leading-[1.6] text-steel">{content.intro}</p>
          <p className="mt-2 font-mono text-[0.75rem] text-amber">{content.note}</p>
        </div>
      </div>

      <div aria-hidden="true" className={`hidden border-b border-umber pb-3 font-mono text-[0.75rem] text-steel ${ROW}`}>
        <span>{content.columns.layers}</span>
        <span>{content.columns.company}</span>
        <span>{content.columns.work}</span>
      </div>
      <ul>
        {content.entries.map((entry) => (
          <Row key={entry.id} entry={entry} names={content.layerNames} />
        ))}
      </ul>
    </section>
  );
}
