import type { ContactContent } from "@/content";
import { MagneticLink } from "@/components/ui/MagneticLink";

/* ------------------------------------------------------------------
   Contact: the closing frame. It bookends the hero with the same warm
   light, one large line, one primary action, and the footer.
   ------------------------------------------------------------------ */

const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function Contact({ content }: { content: ContactContent }) {
  return (
      <section
        id={content.id}
        aria-labelledby={`${content.id}-title`}
        className="relative isolate overflow-hidden border-t border-umber"
      >
        {/* Warm light, echoing the hero */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -bottom-40 -left-24 size-[36rem] rounded-full bg-[radial-gradient(circle,var(--oxblood)_0%,transparent_68%)] opacity-40" />
          <span className="absolute top-10 right-[8%] size-[24rem] rounded-full bg-[radial-gradient(circle,var(--amber)_0%,transparent_68%)] opacity-[0.12]" />
        </div>

        <div className="mx-auto flex min-h-[86svh] max-w-[1520px] flex-col justify-center px-[var(--gutter)] py-28 md:py-36">
          <h2
            id={`${content.id}-title`}
            className="max-w-[13ch] font-display text-[clamp(3.25rem,9vw,9rem)] leading-[0.9] font-normal tracking-[-0.035em] text-bone"
          >
            {content.title}
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 md:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
            <div>
              <p className="max-w-[40ch] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-[1.45] text-steel">
                {content.body}
              </p>
              <div className="mt-10">
                {content.email ? (
                  <MagneticLink
                    href={`mailto:${content.email}`}
                    className="inline-flex h-14 items-center gap-4 rounded-full bg-oxblood px-8 text-[1rem] font-medium text-bone shadow-[0_0_0_1px_rgb(163_54_74/0.6),0_18px_50px_-18px_rgb(122_31_43/0.9)] transition-colors duration-500 hover:bg-claret"
                  >
                    {content.emailLabel}
                    <span className="font-mono text-[0.8125rem] font-normal text-bone/80">{content.email}</span>
                  </MagneticLink>
                ) : (
                  <span className="inline-flex h-14 items-center rounded-full border border-dashed border-amber/60 px-8 font-mono text-[0.8125rem] text-amber">
                    {content.emailPending}
                  </span>
                )}
              </div>
            </div>

            <ul className="border-t border-umber">
              {content.links.map((l) => (
                <li key={l.href} className="border-b border-umber">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-baseline justify-between gap-6 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-claret transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <span className="font-display text-[1.75rem] leading-none tracking-[-0.01em] text-bone">{l.label}</span>
                    <span className="min-w-0 truncate font-mono text-[0.75rem] text-steel">{host(l.href)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
  );
}

export function SiteFooter({ footer }: { footer: ContactContent["footer"] }) {
  return (
    <footer className="border-t border-umber">
      <div className="mx-auto flex max-w-[1520px] flex-col gap-3 px-[var(--gutter)] py-8 font-mono text-[0.75rem] text-steel sm:flex-row sm:items-center sm:justify-between">
        <span className="text-bone/80">{footer.owner}</span>
        <span>{footer.built}</span>
        <a href="#top" className="text-bone/80 transition-colors hover:text-bone">
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
