import type { Certification, StackContent } from "@/content";

/* ------------------------------------------------------------------
   Stack and certifications. Plain lists grouped by layer (no logos,
   no skill bars), then the two certificates as ticket-like stubs.
   ------------------------------------------------------------------ */

function CertificateStub({ cert, labels }: { cert: Certification; labels: StackContent["labels"] }) {
  return (
    <li className="relative grid grid-cols-[6.5rem_minmax(0,1fr)] border border-umber bg-espresso/40 sm:grid-cols-[8rem_minmax(0,1fr)]">
      {/* Perforated edge between stub and body */}
      <div className="flex items-center justify-center border-r border-dashed border-steel/40 p-5">
        <span className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none tracking-[-0.02em] text-bone">
          {cert.issuer}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5 sm:p-6">
        <span className="text-[1.0625rem] leading-snug text-bone">{cert.name}</span>
        <span className="text-[0.875rem] text-steel">{cert.platform}</span>
        <span className="mt-2">
          {cert.credentialUrl ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="border-b border-bone/30 pb-0.5 text-[0.875rem] text-bone transition-colors duration-300 hover:border-claret"
            >
              {labels.verify}
            </a>
          ) : (
            <span className="inline-block rounded-full border border-dashed border-amber/50 px-3 py-1 font-mono text-[0.6875rem] whitespace-nowrap text-amber">
              {labels.pending}
            </span>
          )}
        </span>
      </div>
    </li>
  );
}

export function Stack({ content }: { content: StackContent }) {
  return (
    <section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      className="mx-auto max-w-[1520px] px-[var(--gutter)] py-24 md:py-36"
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div>
          <h2
            id={`${content.id}-title`}
            className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] font-normal tracking-[-0.025em] text-bone"
          >
            {content.title}
          </h2>
          <p className="mt-5 max-w-[30ch] text-[1rem] leading-[1.6] text-steel">{content.intro}</p>
        </div>

        <dl className="grid gap-x-10 gap-y-10 border-t border-umber pt-10 sm:grid-cols-2 xl:grid-cols-3">
          {content.groups.map((g) => (
            <div key={g.id}>
              <dt className="font-mono text-[0.75rem] text-amber">{g.label}</dt>
              <dd className="mt-4">
                <ul className="space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-[1rem] leading-snug text-bone">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-24 grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.015em] text-bone">
          {content.certificationsTitle}
        </h3>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {content.certifications.map((c) => (
            <CertificateStub key={c.id} cert={c} labels={content.labels} />
          ))}
        </ul>
      </div>
    </section>
  );
}
