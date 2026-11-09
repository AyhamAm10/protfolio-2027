"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import type { SiteContent } from "@/content";

/**
 * Fixed header. Transparent over the hero; once the page scrolls it gains
 * an ink backdrop and a hairline. It tucks away while scrolling down and
 * returns on the way up, so it never covers the reading.
 */
export function SiteHeader({ nav }: { nav: SiteContent["nav"] }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 80);
    setHidden(y > 400 && y > previous + 4);
    if (y < previous - 4) setHidden(false);
  });

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-bone px-4 py-2 text-[0.875rem] text-ink focus:translate-y-0"
      >
        {nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-cine)] ${
          scrolled ? "border-b border-umber bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`mx-auto flex max-w-[1520px] items-center justify-between px-[var(--gutter)] transition-[padding] duration-500 ${
            scrolled ? "py-3.5" : "py-6"
          }`}
        >
          <a
            href={nav.home.href}
            className="font-display text-[1.375rem] leading-none tracking-[-0.01em] text-bone"
          >
            <span aria-hidden="true">
              A<span className="text-amber">.</span>A
            </span>
            <span className="sr-only">{nav.home.label}</span>
          </a>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 text-[0.9375rem] text-steel sm:gap-8">
              {nav.links.map((link, i) => (
                <li key={link.href} className={i === 1 || i === 2 ? "hidden md:block" : undefined}>
                  <a
                    href={link.href}
                    className="relative py-2 transition-colors duration-300 hover:text-bone after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-claret after:transition-transform after:duration-500 after:ease-[var(--ease-cine)] hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
