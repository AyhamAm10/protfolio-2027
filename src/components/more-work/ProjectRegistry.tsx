"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useId, useState, type ReactNode } from "react";
import type { MoreWorkContent, Project } from "@/content";
import { ease } from "@/lib/motion";
import { Gallery } from "./Gallery";

/* ------------------------------------------------------------------
   ProjectRegistry: the remaining work as a service registry. Each row
   is a disclosure; opening it shows details, stack, links, any missing
   facts as placeholders, and a gallery where screenshots belong.

   <Registry.Root>
     <Registry.Item project>
       <Registry.Trigger />   row summary, toggles the panel
       <Registry.Panel />     details
     </Registry.Item>
   </Registry.Root>
   ------------------------------------------------------------------ */

const ROW_GRID = "md:grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_9rem_9rem_2.5rem] md:items-baseline md:gap-x-8";

interface ItemContext {
  project: Project;
  open: boolean;
  toggle: () => void;
  triggerId: string;
  panelId: string;
}

const ItemCtx = createContext<ItemContext | null>(null);
const useItem = () => {
  const ctx = useContext(ItemCtx);
  if (!ctx) throw new Error("Registry parts must be inside <Registry.Item>.");
  return ctx;
};

function Root({ columns, children }: { columns: MoreWorkContent["columns"]; children: ReactNode }) {
  return (
    <div>
      <div aria-hidden="true" className={`hidden border-b border-umber pb-3 font-mono text-[0.75rem] text-steel ${ROW_GRID}`}>
        <span>{columns.project}</span>
        <span>{columns.summary}</span>
        <span>{columns.context}</span>
        <span>{columns.status}</span>
        <span />
      </div>
      <ul>{children}</ul>
    </div>
  );
}

function Item({ project, children }: { project: Project; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <ItemCtx.Provider
      value={{ project, open, toggle: () => setOpen((o) => !o), triggerId: `${id}-t`, panelId: `${id}-p` }}
    >
      <li id={project.id} className="scroll-mt-24 border-b border-umber">{children}</li>
    </ItemCtx.Provider>
  );
}

function Status({ status }: { status: NonNullable<Project["status"]> }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.75rem] text-bone">
      <span
        data-pulse={status.kind === "building" ? true : undefined}
        className={`size-1.5 rounded-full ${
          status.kind === "building" ? "bg-amber [animation:pulse-dot_1.6s_ease-in-out_infinite]" : "bg-steel"
        }`}
      />
      {status.label}
    </span>
  );
}

function Trigger() {
  const { project, open, toggle, triggerId, panelId } = useItem();
  return (
    <h3>
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={`group relative w-full py-6 text-left md:py-7 ${ROW_GRID}`}
      >
        {/* Claret rule that draws in on hover/focus */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-claret transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <span className="flex items-baseline justify-between gap-4">
          <span className="font-display text-[clamp(1.625rem,2.4vw,2.125rem)] leading-[1.05] tracking-[-0.015em] text-bone">
            {project.name}
          </span>
          <Plus open={open} className="flex md:hidden" />
        </span>
        <span className="mt-2 block max-w-[52ch] text-[0.9375rem] leading-[1.55] text-steel md:mt-0">
          {project.summary}
        </span>
        <span className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 md:contents">
          <span className="font-mono text-[0.75rem] text-steel md:text-bone/80">{project.context}</span>
          <span>{project.status ? <Status status={project.status} /> : null}</span>
        </span>
        <Plus open={open} className="hidden justify-self-end md:flex" />
      </button>
    </h3>
  );
}

function Plus({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative size-9 shrink-0 items-center justify-center rounded-full border border-umber transition-colors duration-300 group-hover:border-bone/40 ${className}`}
    >
      <span className="absolute h-px w-3 bg-bone" />
      <span
        className={`absolute h-3 w-px bg-bone transition-transform duration-500 ease-[var(--ease-cine)] ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

function Panel({ labels }: { labels: MoreWorkContent["labels"] }) {
  const { project, open, triggerId, panelId } = useItem();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="overflow-hidden"
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduced ? undefined : { height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: ease.cine }}
        >
          <div className={`pb-10 ${ROW_GRID}`}>
            <div className="hidden md:block" />
            <div className="md:col-span-3">
              <dl className="grid gap-y-3 sm:grid-cols-[6rem_1fr]">
                <dt className="font-mono text-[0.75rem] leading-6 text-steel">{labels.role}</dt>
                <dd className="text-[0.9375rem] leading-6 text-bone">{project.role}</dd>
              </dl>

              <ul className="mt-6 max-w-[62ch] space-y-3">
                {project.details.map((d) => (
                  <li key={d} className="relative pl-5 text-[1rem] leading-[1.6] text-bone/85">
                    <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-steel/70" />
                    {d}
                  </li>
                ))}
              </ul>

              {project.quote ? (
                <blockquote className="mt-8 max-w-[44ch] border-l border-oxblood pl-5 font-display text-[1.375rem] leading-[1.3] text-bone">
                  {project.quote}
                </blockquote>
              ) : null}

              {project.gallery ? (
                <Gallery slides={project.gallery} labels={{ previous: labels.previous, next: labels.next }} />
              ) : null}

              <div className="mt-8 flex flex-wrap items-start gap-x-14 gap-y-6">
                {project.stack?.length ? (
                  <div>
                    <p className="font-mono text-[0.75rem] text-steel">// {labels.stack}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <li key={t} className="rounded-full border border-umber px-3 py-1 text-[0.8125rem] text-bone">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {project.links.length ? (
                  <div>
                    <p className="font-mono text-[0.75rem] text-steel">// {labels.links}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {project.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border-b border-bone/30 pb-0.5 text-[0.9375rem] text-bone transition-colors duration-300 hover:border-claret"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {project.pending?.length ? (
                  <div>
                    <p className="font-mono text-[0.75rem] text-steel">// {labels.pending}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.pending.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-dashed border-amber/50 px-3 py-1 font-mono text-[0.75rem] text-amber"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export const Registry = { Root, Item, Trigger, Panel };
