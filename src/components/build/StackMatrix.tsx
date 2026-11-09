"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import type { BuildContent, LayerId, Offering, StackLayer } from "@/content";

/* ------------------------------------------------------------------
   StackMatrix: the four layers drawn as strata (database at the
   bottom), with one vertical shaft per kind of work. A solid segment
   means the work runs through that layer; a dotted one means it
   doesn't. Strata and shafts build bottom-up as the matrix scrolls in.

   Grid (desktop):  [label 10rem] [offering] [offering] [offering]
   rows:            titles / mobile / dashboard / api / database / text
   ------------------------------------------------------------------ */

const OFFERING_COL = ["col-start-1 md:col-start-2", "col-start-2 md:col-start-3", "col-start-3 md:col-start-4"];
const LAYER_ROW = ["row-start-2", "row-start-3", "row-start-4", "row-start-5"];

/** Progress window in which a layer (0 = database) builds. */
function windowFor(level: number): [number, number] {
  const start = level * 0.17;
  return [start, start + 0.3];
}

function Stratum({
  layer,
  level,
  row,
  progress,
  reduced,
}: {
  layer: StackLayer;
  level: number;
  row: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const [a, b] = windowFor(level);
  const scaleX = useTransform(progress, [a, b], [0, 1]);
  const opacity = useTransform(progress, [a, a + 0.12], [0, 1]);
  const isFoundation = layer.id === "database";

  return (
    <div aria-hidden="true" className={`relative col-span-full col-start-1 ${LAYER_ROW[row]}`}>
      <motion.span
        className="absolute inset-x-0 top-0 h-px origin-left bg-umber"
        style={reduced ? undefined : { scaleX }}
      />
      {level === 0 ? (
        <motion.span
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-umber"
          style={reduced ? undefined : { scaleX }}
        />
      ) : null}
      <motion.div
        className="absolute top-3 right-0 text-right md:top-1/2 md:right-auto md:left-0 md:w-[10rem] md:-translate-y-1/2 md:pr-6 md:text-left"
        style={reduced ? undefined : { opacity }}
      >
        <p className={`font-mono text-[0.75rem] md:text-[0.8125rem] ${isFoundation ? "text-amber" : "text-bone"}`}>
          {layer.name}
        </p>
        <p className="mt-1 hidden font-mono text-[0.6875rem] leading-relaxed text-steel md:block">
          {layer.tech.join(", ")}
        </p>
      </motion.div>
    </div>
  );
}

function Segment({
  touched,
  level,
  row,
  col,
  progress,
  reduced,
  dimmed,
}: {
  touched: boolean;
  level: number;
  row: number;
  col: number;
  progress: MotionValue<number>;
  reduced: boolean;
  dimmed: boolean;
}) {
  const [a, b] = windowFor(level);
  const lineStart = a + 0.08 + col * 0.03;
  const scaleY = useTransform(progress, [lineStart, b + col * 0.03], [0, 1]);
  const nodeScale = useTransform(progress, [b - 0.04 + col * 0.03, b + 0.04 + col * 0.03], [0, 1]);

  return (
    <div
      aria-hidden="true"
      className={`relative ${OFFERING_COL[col]} ${LAYER_ROW[row]} transition-opacity duration-500 ${dimmed ? "opacity-25" : "opacity-100"}`}
    >
      {touched ? (
        <>
          <motion.span
            className="absolute top-0 bottom-0 left-0 w-px origin-bottom bg-bone/85"
            style={reduced ? undefined : { scaleY }}
          />
          <motion.span
            className={`absolute top-1/2 left-0 size-[7px] -translate-x-1/2 -translate-y-1/2 ${level === 0 ? "bg-amber" : "bg-bone"}`}
            style={reduced ? undefined : { scale: nodeScale }}
          />
        </>
      ) : (
        <span className="absolute top-3 bottom-3 left-0 w-px bg-[repeating-linear-gradient(to_bottom,var(--steel)_0_3px,transparent_3px_8px)] opacity-60" />
      )}
    </div>
  );
}

function OfferingText({
  offering,
  col,
  layers,
  layersLabel,
  dimmed,
  onActive,
}: {
  offering: Offering;
  col: number;
  layers: StackLayer[];
  layersLabel: string;
  dimmed: boolean;
  onActive: (id: string | null) => void;
}) {
  const names = layers.filter((l) => offering.layers.includes(l.id)).map((l) => l.name);
  const fade = `transition-opacity duration-500 ${dimmed ? "opacity-35" : "opacity-100"}`;
  const hover = { onPointerEnter: () => onActive(offering.id), onPointerLeave: () => onActive(null) };

  return (
    <>
      <h3
        {...hover}
        className={`${OFFERING_COL[col]} row-start-1 self-end border-l border-umber pb-6 pl-3 font-display text-[1.125rem] leading-[1.1] tracking-[-0.01em] text-bone sm:pl-4 sm:text-[1.5rem] lg:text-[1.875rem] ${fade}`}
      >
        {offering.title}
      </h3>
      <div
        {...hover}
        className={`${OFFERING_COL[col]} row-start-6 hidden border-l border-umber pt-8 pr-6 pl-4 md:block ${fade}`}
      >
        <OfferingBody offering={offering} names={names} layersLabel={layersLabel} />
      </div>
    </>
  );
}

function OfferingBody({ offering, names, layersLabel }: { offering: Offering; names: string[]; layersLabel: string }) {
  return (
    <>
      <p className="max-w-[34ch] text-[0.9375rem] leading-[1.6] text-steel">{offering.description}</p>
      <p className="sr-only">
        {layersLabel}: {names.join(", ")}.
      </p>
      <ul className="mt-5 space-y-1.5 text-[0.875rem] text-bone/85">
        {offering.examples.map((ex) => (
          <li key={ex}>{ex}</li>
        ))}
      </ul>
    </>
  );
}

export function StackMatrix({ content }: { content: BuildContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });

  // Render top-down (mobile first), but levels count from the database up.
  const topDown = [...content.layers].reverse();
  const levelOf = (id: LayerId) => content.layers.findIndex((l) => l.id === id);

  return (
    <div>
      <div
        ref={ref}
        className="grid grid-cols-3 grid-rows-[auto_repeat(4,4.75rem)] md:grid-cols-[10rem_repeat(3,minmax(0,1fr))] md:grid-rows-[auto_repeat(4,6rem)_auto]"
      >
        {topDown.map((layer, row) => (
          <Stratum
            key={layer.id}
            layer={layer}
            level={levelOf(layer.id)}
            row={row}
            progress={scrollYProgress}
            reduced={reduced}
          />
        ))}

        {content.offerings.map((offering, col) =>
          topDown.map((layer, row) => (
            <Segment
              key={`${offering.id}-${layer.id}`}
              touched={offering.layers.includes(layer.id)}
              level={levelOf(layer.id)}
              row={row}
              col={col}
              progress={scrollYProgress}
              reduced={reduced}
              dimmed={active !== null && active !== offering.id}
            />
          )),
        )}

        {content.offerings.map((offering, col) => (
          <OfferingText
            key={offering.id}
            offering={offering}
            col={col}
            layers={content.layers}
            layersLabel={content.layersLabel}
            dimmed={active !== null && active !== offering.id}
            onActive={setActive}
          />
        ))}
      </div>

      {/* Narrow screens: the text runs below the matrix instead of under each shaft. */}
      <ul className="mt-12 space-y-10 md:hidden">
        {content.offerings.map((offering) => (
          <li key={offering.id}>
            <p className="font-display text-[1.375rem] leading-tight text-bone">{offering.title}</p>
            <div className="mt-3">
              <OfferingBody
                offering={offering}
                names={content.layers.filter((l) => offering.layers.includes(l.id)).map((l) => l.name)}
                layersLabel={content.layersLabel}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
