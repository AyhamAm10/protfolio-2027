"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ComponentPropsWithoutRef, type PointerEvent } from "react";

type MagneticLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  /** How far the element follows the pointer, 0 to 1. */
  strength?: number;
};

const spring = { stiffness: 180, damping: 22, mass: 0.6 };

/** An anchor that leans toward the pointer. Inert for touch and reduced motion. */
export function MagneticLink({ strength = 0.28, children, ...props }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      {...props}
    >
      {children}
    </motion.a>
  );
}
