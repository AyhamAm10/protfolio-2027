"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content";
import { Darkroom } from "@/components/ui/Darkroom";

type Slide = NonNullable<Project["gallery"]>[number];

/**
 * A light, native slider: CSS scroll-snap for touch, buttons for mouse
 * and keyboard. Slides are placeholders until screenshots arrive.
 */
export function Gallery({ slides, labels }: { slides: Slide[]; labels: { previous: string; next: string } }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.firstElementChild?.getBoundingClientRect().width ?? 1;
      setIndex(Math.min(slides.length - 1, Math.round(el.scrollLeft / (w + 16))));
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  function go(dir: -1 | 1) {
    const el = track.current;
    const first = el?.firstElementChild;
    if (!el || !first) return;
    el.scrollBy({ left: dir * (first.getBoundingClientRect().width + 16), behavior: "smooth" });
  }

  const button =
    "flex size-10 items-center justify-center rounded-full border border-umber text-bone transition-colors duration-300 hover:border-claret disabled:opacity-30 disabled:hover:border-umber";

  return (
    <div className="mt-8">
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Screens"
      >
        {slides.map((s, i) => (
          <li
            key={s.label}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
          >
            {s.image ? (
              <Darkroom
                image={s.image}
                className="aspect-[16/10] rounded-md border border-umber"
                sizes="(min-width: 640px) 45vw, 85vw"
                position="top right"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-md border border-umber bg-espresso bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(42_33_29/0.6)_14px_15px)]">
                <span className="font-mono text-[0.6875rem] text-steel">{s.note}</span>
              </div>
            )}
            <p className="mt-3 font-mono text-[0.75rem] text-steel">{s.label}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" className={button} onClick={() => go(-1)} disabled={index === 0} aria-label={labels.previous}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
        <button
          type="button"
          className={button}
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label={labels.next}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="m5 2 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
        <span className="ml-2 font-mono text-[0.75rem] text-steel tabular-nums" aria-live="polite">
          {index + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
