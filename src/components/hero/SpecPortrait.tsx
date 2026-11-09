"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import type { HeroContent, PortraitAnnotation } from "@/content";
import { CountUp } from "@/components/ui/CountUp";
import { heroTimeline, intro } from "@/lib/motion";

/* ------------------------------------------------------------------
   SpecPortrait: the portrait drawn as a technical spec sheet.
   Compound API:
     <SpecPortrait.Root>
       <SpecPortrait.Frame image={...} />
       <SpecPortrait.CropMarks />
       <SpecPortrait.Annotation ... />
       <SpecPortrait.Dimension label="4 : 5" />
     </SpecPortrait.Root>
   The load sequence uses CSS `.intro` classes (no per-frame JS);
   only the scroll parallax on Root runs through Motion.
   ------------------------------------------------------------------ */

function Root({
  children,
  className = "",
  y,
}: {
  children: ReactNode;
  className?: string;
  /** Scroll-linked offset for parallax. */
  y?: MotionValue<string>;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.figure style={reduced ? undefined : { y }} className={`relative aspect-[4/5] ${className}`}>
      {children}
    </motion.figure>
  );
}

function Frame({ image }: { image: HeroContent["portrait"] }) {
  return (
    <div className="intro intro-clip absolute inset-0 overflow-hidden" style={intro(heroTimeline.portrait, 1.5)}>
      <div className="intro intro-out intro-settle absolute inset-0" style={intro(heroTimeline.portrait, 2.2)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 420px, 92vw"
          className="object-cover [filter:contrast(1.04)_saturate(1.04)] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_98%),linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%)] [mask-composite:intersect]"
        />
      </div>

      {/* Oxblood light that echoes the tie, and an amber rim from the city behind. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background: "radial-gradient(ellipse 45% 38% at 52% 58%, rgb(122 31 43 / 0.9), transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 40% 55% at 0% 22%, rgb(201 148 91 / 0.22), transparent 70%), radial-gradient(ellipse 30% 40% at 100% 70%, rgb(201 148 91 / 0.10), transparent 70%)",
        }}
      />
    </div>
  );
}

function CropMarks() {
  const corners = [
    "top-[-14px] left-[-14px] border-t border-l",
    "top-[-14px] right-[-14px] border-t border-r",
    "bottom-[-14px] left-[-14px] border-b border-l",
    "bottom-[-14px] right-[-14px] border-b border-r",
  ];
  return (
    <>
      {corners.map((c, i) => (
        <span
          key={c}
          aria-hidden="true"
          className={`intro intro-fade absolute size-5 border-steel/70 ${c}`}
          style={intro(heroTimeline.portrait + 0.9 + i * 0.05, 0.6)}
        />
      ))}
    </>
  );
}

function Value({ item, delay }: { item: PortraitAnnotation; delay: number }) {
  if (item.countTo !== undefined) {
    return (
      <CountUp
        to={item.countTo}
        suffix={item.countSuffix}
        delay={delay}
        className="font-display text-[2.75rem] leading-none tracking-[-0.02em] text-amber"
      />
    );
  }
  return <span className="text-[1.0625rem] leading-snug text-bone">{item.value}</span>;
}

function Status({ label }: { label: string }) {
  return (
    <span className="mt-2 inline-flex items-center gap-2 font-mono text-[0.75rem] text-steel">
      <span data-pulse className="size-1.5 rounded-full bg-amber [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
      status: {label}
    </span>
  );
}

/** A leader line from a point on the portrait out to a label beside the frame. */
function Annotation({ item, index, labelWidth }: { item: PortraitAnnotation; index: number; labelWidth: string }) {
  const delay = heroTimeline.annotations + index * heroTimeline.annotationStagger;

  return (
    <div
      className="absolute flex -translate-y-1/2 items-center"
      style={{ top: `${item.anchor.y}%`, left: `${item.anchor.x}%`, right: `calc(-1 * ${labelWidth})` }}
    >
      <span
        aria-hidden="true"
        className="intro intro-out intro-pop relative size-2 shrink-0 rounded-full border border-bone/80"
        style={intro(delay, 0.5)}
      >
        <span className="absolute inset-[2px] rounded-full bg-amber" />
      </span>
      <span
        aria-hidden="true"
        className="intro intro-draw-x h-px flex-1 origin-left bg-bone/45"
        style={intro(delay + 0.1, 0.9)}
      />
      <div
        className="intro intro-out intro-fade-left shrink-0 pl-4"
        style={{ width: labelWidth, ...intro(delay + 0.55, 0.8) }}
      >
        <p className="mb-1.5 font-mono text-[0.75rem] text-steel">{item.key}</p>
        <p className="flex flex-col">
          <Value item={item} delay={delay + 0.55} />
          <span className="mt-1 text-[0.875rem] leading-snug text-steel">{item.detail}</span>
          {item.status ? <Status label={item.status} /> : null}
        </p>
      </div>
    </div>
  );
}

/** The same annotations as a plain spec list, for narrow screens. */
function SpecList({ items, className = "" }: { items: PortraitAnnotation[]; className?: string }) {
  return (
    <dl className={`divide-y divide-umber border-y border-umber ${className}`}>
      {items.map((item, i) => (
        <div key={item.id} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 py-3.5">
          <dt className="font-mono text-[0.75rem] text-steel">{item.key}</dt>
          <dd className="flex flex-col">
            <Value item={item} delay={heroTimeline.annotations + i * 0.2} />
            <span className="mt-1 text-[0.875rem] leading-snug text-steel">{item.detail}</span>
            {item.status ? <Status label={item.status} /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Dimension({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="intro intro-fade absolute inset-x-0 -bottom-10 flex items-center gap-3 font-mono text-[0.6875rem] text-steel/80"
      style={intro(heroTimeline.footer, 0.8)}
    >
      <span className="h-2.5 w-px bg-steel/60" />
      <span className="h-px flex-1 bg-steel/40" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-steel/40" />
      <span className="h-2.5 w-px bg-steel/60" />
    </div>
  );
}

export const SpecPortrait = { Root, Frame, CropMarks, Annotation, Dimension, SpecList };
