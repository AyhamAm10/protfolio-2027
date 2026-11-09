"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import type { ImageAsset } from "@/content";

/* ------------------------------------------------------------------
   Darkroom: real product screenshots are mostly light UIs, which would
   punch holes in an ink page. Each one enters as a print under an
   oxblood safelight (monochrome, multiplied into the palette) and
   "develops" to its true colours as it reaches the middle of the
   viewport. Reduced motion shows the true colours straight away.
   ------------------------------------------------------------------ */

interface Props {
  image: ImageAsset;
  sizes: string;
  className?: string;
  /** Crop anchor when the frame and image ratios differ. */
  position?: string;
  style?: CSSProperties;
}

export function Darkroom({ image, sizes, className = "", position = "top", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 55%"] });

  const grayscale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const brightness = useTransform(scrollYProgress, [0, 1], [0.75, 0.93]);
  const filter = useTransform(
    [grayscale, brightness],
    ([g, b]) => `grayscale(${g as number}) brightness(${b as number}) contrast(1.02)`,
  );
  const safelight = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-espresso ${className}`} style={style}>
      <motion.div className="absolute inset-0" style={reduced ? { filter: "brightness(0.93)" } : { filter }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
      {/* Oxblood safelight: multiplies whites down into the palette */}
      {reduced ? null : (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-claret mix-blend-multiply"
          style={{ opacity: safelight }}
        />
      )}
      {/* Inner edge so the print sits in its frame rather than on top of it */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgb(14_11_10/0.35)]" />
    </div>
  );
}
