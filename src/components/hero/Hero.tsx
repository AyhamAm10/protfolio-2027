"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { HeroContent } from "@/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { heroTimeline, intro } from "@/lib/motion";
import { BlueprintGrid } from "./BlueprintGrid";
import { Lights } from "./Lights";
import { SpecPortrait } from "./SpecPortrait";

const LABEL_WIDTH = "14.5rem";

/** A line of text that rises out of an invisible mask (CSS intro). */
function MaskedLine({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <span className="intro intro-rise block" style={intro(delay, 1.2)}>
        {children}
      </span>
    </span>
  );
}

function FadeIn({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <div className={`intro intro-out intro-fade-up ${className}`} style={intro(delay, 1)}>
      {children}
    </div>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const reduced = useReducedMotion();
  const [first, last] = content.name;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <Lights />
      <BlueprintGrid />

      <div className="mx-auto grid w-full max-w-[1520px] flex-1 items-center gap-x-14 gap-y-14 px-[var(--gutter)] pt-32 pb-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:pt-28">
        {/* Copy */}
        <motion.div style={reduced ? undefined : { y: copyY, opacity: fade }} className="relative z-10 max-w-[40rem]">
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.75rem,17vw,6.5rem)] leading-[0.86] font-normal tracking-[-0.025em] text-bone lg:text-[clamp(5rem,9vw,10rem)]"
          >
            <MaskedLine delay={heroTimeline.name}>{first}</MaskedLine>
            <MaskedLine delay={heroTimeline.name + 0.12} className="pl-[0.62em]">
              {last}
            </MaskedLine>
          </h1>

          <FadeIn delay={heroTimeline.copy} className="mt-10 lg:mt-12">
            <p className="max-w-[26ch] text-[clamp(1.375rem,2.1vw,1.75rem)] leading-[1.22] tracking-[-0.012em] text-bone">
              {content.headline}
            </p>
            <p className="mt-5 max-w-[46ch] text-[1rem] leading-[1.6] text-steel">{content.summary}</p>
          </FadeIn>

          <FadeIn delay={heroTimeline.copy + 0.15} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticLink
              href={content.primaryCta.href}
              className="inline-flex h-13 items-center rounded-full bg-oxblood px-7 text-[0.9375rem] font-medium text-bone shadow-[0_0_0_1px_rgb(163_54_74/0.6),0_18px_50px_-18px_rgb(122_31_43/0.9)] transition-colors duration-500 hover:bg-claret"
            >
              {content.primaryCta.label}
            </MagneticLink>
            <MagneticLink
              href={content.secondaryCta.href}
              strength={0.18}
              className="relative py-2 text-[0.9375rem] text-bone after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:bg-bone/40 after:transition-colors after:duration-500 hover:after:bg-claret"
            >
              {content.secondaryCta.label}
            </MagneticLink>
          </FadeIn>
        </motion.div>

        {/* Portrait */}
        <div className="relative xl:pr-[var(--label-w)]" style={{ "--label-w": LABEL_WIDTH } as React.CSSProperties}>
          <SpecPortrait.Root y={portraitY} className="mx-auto w-full max-w-[30rem] lg:h-[min(68svh,40rem)] lg:w-auto xl:h-[min(74svh,46rem)]">
            <SpecPortrait.Frame image={content.portrait} />
            <SpecPortrait.CropMarks />
            <div className="hidden xl:block">
              {content.annotations.map((item, i) => (
                <SpecPortrait.Annotation key={item.id} item={item} index={i} labelWidth={LABEL_WIDTH} />
              ))}
            </div>
            <SpecPortrait.Dimension label="4 : 5" />
          </SpecPortrait.Root>
          <SpecPortrait.SpecList items={content.annotations} className="mx-auto mt-16 max-w-[30rem] xl:hidden" />
        </div>
      </div>

      {/* Footer rail: the stack as a path, bottom layer first. */}
      <div
        className="intro intro-fade absolute inset-x-0 bottom-0 z-10 h-[4.5rem]"
        style={intro(heroTimeline.footer, 1)}
      >
        <div className="mx-auto flex h-full max-w-[1520px] items-center justify-between gap-6 px-[var(--gutter)] font-mono text-[0.75rem] text-steel">
          <p className="truncate">
            <span className="sr-only">Stack, from database to mobile: </span>
            {content.stackPath.map((layer, i) => (
              <span key={layer}>
                {i > 0 ? <span className="px-2 text-umber" aria-hidden="true">/</span> : null}
                <span className={i === 0 ? "text-amber" : undefined}>{layer}</span>
              </span>
            ))}
          </p>
          <a href="#work" className="hidden shrink-0 items-center gap-3 text-steel transition-colors hover:text-bone sm:flex">
            {content.scrollCue}
            <span className="relative h-6 w-px overflow-hidden bg-umber">
              <span data-scroll-cue className="absolute inset-0 bg-bone [animation:scroll-cue_2.6s_var(--ease-cine)_infinite]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
