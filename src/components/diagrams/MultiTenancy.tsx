"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   Multi-tenancy diagram.
     isolated : four tenants working alone (dashed, no core)
     connected: tenants -> shared core -> each tenant's own data,
                with a request pulse routed to the right partition
   Drawn on a 640 x 560 canvas; `compact` enlarges type for phones.
   ------------------------------------------------------------------ */

export type TenancyState = "isolated" | "connected";

const TENANTS = ["education", "pharmacy", "science", "arts"] as const;
const W = 640;
const COL = [86, 242, 398, 554];
const BOX_W = 128;
const T_Y = 40;
const T_H = 64;
const CORE = { x: 112, y: 236, w: 416, h: 92 };
const D_Y = 452;
const D_H = 72;
/** Where each tenant's line meets the core. */
const coreX = (cx: number) => W / 2 + (cx - W / 2) * 0.62;

interface Props {
  state: TenancyState;
  /** Run the flow animation (false keeps it drawn but still). */
  active?: boolean;
  compact?: boolean;
  /** Trim the empty lower canvas; only for a diagram that never connects. */
  crop?: boolean;
  className?: string;
  title: string;
}

export function MultiTenancy({ state, active = true, compact = false, crop = false, className = "", title }: Props) {
  const reduced = useReducedMotion() ?? false;
  const connected = state === "connected";
  const label = compact ? 21 : 14;
  const small = compact ? 17 : 11.5;
  const draw = (delay: number) =>
    reduced ? { duration: 0 } : { duration: 0.9, ease: ease.cine, delay };

  return (
    <svg viewBox={`0 0 ${W} ${crop ? 210 : 560}`} role="img" aria-label={title} className={`h-auto w-full ${className}`}>
      {/* Links: tenant -> core -> own partition */}
      {COL.map((cx, i) => {
        const x = coreX(cx);
        return (
          <g key={`links-${cx}`} fill="none" strokeWidth={1}>
            <motion.path
              d={`M ${cx} ${T_Y + T_H} L ${x} ${CORE.y}`}
              stroke="var(--bone)"
              strokeOpacity={0.45}
              initial={false}
              animate={{ pathLength: connected ? 1 : 0, opacity: connected ? 1 : 0 }}
              transition={draw(0.35 + i * 0.06)}
            />
            <motion.path
              d={`M ${x} ${CORE.y + CORE.h} L ${cx} ${D_Y}`}
              stroke="var(--bone)"
              strokeOpacity={0.45}
              initial={false}
              animate={{ pathLength: connected ? 1 : 0, opacity: connected ? 1 : 0 }}
              transition={draw(0.75 + i * 0.06)}
            />
          </g>
        );
      })}

      {/* Shared core */}
      <motion.g
        initial={false}
        animate={{ opacity: connected ? 1 : 0, y: connected ? 0 : 10 }}
        transition={reduced ? { duration: 0 } : { duration: 0.8, ease: ease.out, delay: connected ? 0.15 : 0 }}
      >
        <rect x={CORE.x} y={CORE.y} width={CORE.w} height={CORE.h} fill="var(--espresso)" stroke="var(--oxblood)" strokeWidth={1.5} />
        <text x={W / 2} y={CORE.y + 40} textAnchor="middle" className="font-display" fontSize={compact ? 30 : 24} fill="var(--bone)">
          shared core
        </text>
        <text x={W / 2} y={CORE.y + 66} textAnchor="middle" className="font-mono" fontSize={small} fill="var(--steel)">
          api / auth / services
        </text>
      </motion.g>

      {/* Tenants */}
      {TENANTS.map((name, i) => {
        const cx = COL[i]!;
        return (
          <g key={name}>
            <rect
              x={cx - BOX_W / 2}
              y={T_Y}
              width={BOX_W}
              height={T_H}
              fill="var(--ink)"
              stroke={connected ? "var(--bone)" : "var(--steel)"}
              strokeOpacity={connected ? 0.7 : 0.5}
              strokeDasharray={connected ? undefined : "4 5"}
              style={{ transition: "stroke 0.6s, stroke-opacity 0.6s" }}
            />
            {compact ? null : (
              <text x={cx} y={T_Y + 25} textAnchor="middle" className="font-mono" fontSize={small} fill="var(--steel)">
                // tenant
              </text>
            )}
            <text x={cx} y={compact ? T_Y + 40 : T_Y + 46} textAnchor="middle" className="font-mono" fontSize={label} fill="var(--bone)">
              {name}
            </text>
            <motion.text
              x={cx}
              y={T_Y + T_H + 30}
              textAnchor="middle"
              className="font-mono"
              fontSize={small}
              fill="var(--steel)"
              initial={false}
              animate={{ opacity: connected ? 0 : 1 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            >
              by hand
            </motion.text>
          </g>
        );
      })}

      {/* Isolated data partitions */}
      {COL.map((cx, i) => (
        <motion.g
          key={`data-${cx}`}
          initial={false}
          animate={{ opacity: connected ? 1 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, delay: connected ? 1.1 + i * 0.08 : 0 }}
        >
          <rect x={cx - BOX_W / 2} y={D_Y} width={BOX_W} height={D_H} fill="var(--espresso)" stroke="var(--steel)" strokeOpacity={0.45} />
          {/* Stacked rules read as a table */}
          {[0, 1, 2].map((r) => (
            <line
              key={r}
              x1={cx - BOX_W / 2 + 14}
              x2={cx + BOX_W / 2 - 14}
              y1={D_Y + 18 + r * 12}
              y2={D_Y + 18 + r * 12}
              stroke="var(--steel)"
              strokeOpacity={0.35}
              strokeWidth={compact ? 3 : 1.5}
            />
          ))}
          <text x={cx} y={D_Y + D_H + (compact ? 30 : 24)} textAnchor="middle" className="font-mono" fontSize={small} fill="var(--steel)">
            {compact ? TENANTS[i] : `${TENANTS[i]} data`}
          </text>
        </motion.g>
      ))}

      {/* Request pulses, one tenant at a time, each landing in its own partition */}
      {connected && active && !reduced
        ? COL.map((cx, i) => {
            const x = coreX(cx);
            return (
              <motion.circle
                key={`pulse-${cx}`}
                r={compact ? 7 : 5}
                fill="var(--amber)"
                initial={{ cx, cy: T_Y + T_H, opacity: 0 }}
                animate={{
                  cx: [cx, x, x, cx],
                  cy: [T_Y + T_H, CORE.y, CORE.y + CORE.h, D_Y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.35, 0.6, 1],
                  ease: "easeInOut",
                  delay: 1.6 + i * 1.1,
                  repeat: Infinity,
                  repeatDelay: TENANTS.length * 1.1 - 2.2 + 0.6,
                }}
                style={{ filter: "drop-shadow(0 0 6px rgb(201 148 91 / 0.8))" }}
              />
            );
          })
        : null}
    </svg>
  );
}
