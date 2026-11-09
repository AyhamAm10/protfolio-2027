import type { CaseStudy as CaseStudyContent } from "@/content";
import { CountUp } from "@/components/ui/CountUp";
import { Darkroom } from "@/components/ui/Darkroom";
import { CaseStory } from "./CaseStory";

/* ------------------------------------------------------------------
   One flagship case study:
     Header  name, summary, facts
     Story   problem -> solution -> challenge (sticky diagrams)
     Impact  the numbers
     Footer  screens, stack, links
   ------------------------------------------------------------------ */

function Header({ cs }: { cs: CaseStudyContent }) {
  return (
    <header className="grid grid-cols-1 gap-x-16 gap-y-10 border-t border-umber pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:pt-14">
      <div>
        <p className="font-mono text-[0.8125rem] text-steel">
          // case {cs.index} of {cs.total}
        </p>
        <h3
          id={`${cs.id}-title`}
          className="mt-6 font-display text-[clamp(5rem,16vw,15rem)] leading-[0.82] font-normal tracking-[-0.035em] text-bone"
        >
          {cs.name}
        </h3>
      </div>
      <div className="lg:pt-12">
        <p className="text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.35] tracking-[-0.01em] text-bone">{cs.summary}</p>
        <dl className="mt-10 divide-y divide-umber border-y border-umber">
          {cs.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[6rem_1fr] gap-x-4 py-3.5">
              <dt className="font-mono text-[0.75rem] leading-6 text-steel">{f.label}</dt>
              <dd className="text-[0.9375rem] leading-6 text-bone/90">
                {f.label === "status" ? (
                  <span className="inline-flex items-center gap-2">
                    <span data-pulse className="size-1.5 rounded-full bg-amber [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
                    {f.value}
                  </span>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

function Impact({ cs }: { cs: CaseStudyContent }) {
  return (
    <div className="grid border-y border-umber sm:grid-cols-3">
      {cs.impact.map((item, i) => (
        <div
          key={item.label}
          className={`py-10 sm:px-8 sm:py-14 ${i > 0 ? "border-t border-umber sm:border-t-0 sm:border-l" : "sm:pl-0"}`}
        >
          <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.03em] text-amber">
            {item.countTo !== undefined ? (
              <CountUp to={item.countTo} suffix={item.suffix} duration={item.countTo > 100 ? 2 : 0.9} />
            ) : (
              item.value
            )}
          </p>
          <p className="mt-4 max-w-[24ch] text-[0.9375rem] leading-snug text-steel">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

type Screen = CaseStudyContent["screens"][number];

/** A device frame: a real screenshot when there is one, a marked placeholder when not. */
function ScreenFrame({ screen, note }: { screen: Screen; note: string }) {
  const isPhone = screen.kind === "phone";
  const ratio = screen.image ? screen.image.width / screen.image.height : isPhone ? 9 / 19 : 16 / 10;
  return (
    <figure className={isPhone ? "w-[32%] max-w-[12rem] shrink-0" : "min-w-0 flex-1"}>
      <div
        className={`overflow-hidden border-umber bg-espresso ${isPhone ? "rounded-[1.6rem] border-[5px]" : "rounded-md border"}`}
      >
        {isPhone ? null : (
          <div aria-hidden="true" className="flex h-6 items-center gap-1.5 border-b border-umber px-3">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-1.5 rounded-full bg-umber" />
            ))}
          </div>
        )}
        {screen.image ? (
          <Darkroom
            image={screen.image}
            className="w-full"
            sizes={isPhone ? "(min-width: 1024px) 192px, 32vw" : "(min-width: 1024px) 560px, 60vw"}
            position={isPhone ? "top" : "top right"}
            style={{ aspectRatio: ratio }}
          />
        ) : (
          <div
            className="flex w-full items-center justify-center bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(42_33_29/0.6)_14px_15px)]"
            style={{ aspectRatio: ratio }}
          >
            <span className="px-3 text-center font-mono text-[0.6875rem] text-steel">{note}</span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 font-mono text-[0.75rem] text-steel">{screen.label}</figcaption>
    </figure>
  );
}

function Footer({ cs }: { cs: CaseStudyContent }) {
  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="flex items-end gap-6">
        {cs.screens.map((s) => (
          <ScreenFrame key={s.label} screen={s} note={cs.screensPendingNote} />
        ))}
      </div>

      <div className="flex flex-col gap-10">
        <div>
          <h4 className="font-mono text-[0.75rem] text-steel">// stack</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {cs.stack.map((t) => (
              <li key={t} className="rounded-full border border-umber px-3.5 py-1.5 text-[0.875rem] text-bone">
                {t}
              </li>
            ))}
            {cs.stackPending?.map((t) => (
              <li
                key={t}
                className="rounded-full border border-dashed border-amber/50 px-3.5 py-1.5 font-mono text-[0.75rem] text-amber"
                title="Placeholder: to confirm"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[0.75rem] text-steel">// links</h4>
          <ul className="mt-2 divide-y divide-umber border-b border-umber">
            {cs.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3.5 text-[1rem] text-bone transition-colors hover:text-bone"
                >
                  <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-claret after:transition-transform after:duration-500 after:ease-[var(--ease-cine)] group-hover:after:scale-x-100">
                    {l.label}
                  </span>
                  <span className="hidden min-w-0 truncate font-mono text-[0.6875rem] text-steel sm:block">
                    {l.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {cs.linksNote ? <p className="mt-4 text-[0.875rem] leading-relaxed text-steel">{cs.linksNote}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function CaseStudy({ cs }: { cs: CaseStudyContent }) {
  return (
    <article id={cs.id} aria-labelledby={`${cs.id}-title`} className="flex flex-col gap-20 lg:gap-28">
      <Header cs={cs} />
      <CaseStory steps={cs.steps} caseId={cs.id} />
      <Impact cs={cs} />
      <Footer cs={cs} />
    </article>
  );
}
