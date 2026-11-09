"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/* ------------------------------------------------------------------
   One tournament event fans out into the systems it creates or wakes:
   channel, chat, voting, notifications. Branches light up in order.
   ------------------------------------------------------------------ */

const W = 640;
const H = 400;
const SOURCE = { x: 40, y: 160, w: 196, h: 80 };
const TARGETS = [
  { name: "channel", note: "auto-created" },
  { name: "chat", note: "inside the channel" },
  { name: "voting", note: "per tournament" },
  { name: "notifications", note: "on tournament events" },
];
const T_X = 400;
const T_W = 200;
const T_H = 64;
const tY = (i: number) => 28 + i * 88;

interface Props {
  active: boolean;
  compact?: boolean;
  title: string;
}

export function TournamentFanout({ active, compact = false, title }: Props) {
  const reduced = useReducedMotion() ?? false;
  const on = active || reduced;
  const big = compact ? 22 : 17;
  const small = compact ? 17 : 12;
  const startX = SOURCE.x + SOURCE.w;
  const startY = SOURCE.y + SOURCE.h / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="h-auto w-full">
      {TARGETS.map((t, i) => {
        const y = tY(i) + T_H / 2;
        const midX = (startX + T_X) / 2;
        const d = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${y}, ${T_X} ${y}`;
        const delay = 0.4 + i * 0.35;
        return (
          <g key={t.name}>
            <path d={d} fill="none" stroke="var(--umber)" strokeWidth={1} />
            <motion.path
              d={d}
              fill="none"
              stroke="var(--bone)"
              strokeOpacity={0.7}
              strokeWidth={1}
              initial={false}
              animate={{ pathLength: on ? 1 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.8, ease: ease.cine, delay: on ? delay : 0 }}
            />
            <motion.g
              initial={false}
              animate={{ opacity: on ? 1 : 0.35 }}
              transition={reduced ? { duration: 0 } : { duration: 0.5, delay: on ? delay + 0.6 : 0 }}
            >
              <rect x={T_X} y={tY(i)} width={T_W} height={T_H} fill="var(--ink)" stroke="var(--bone)" strokeOpacity={0.6} />
              <motion.circle
                cx={T_X + 20}
                cy={tY(i) + T_H / 2}
                r={4}
                fill="var(--amber)"
                initial={false}
                animate={{ scale: on ? 1 : 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.4, ease: ease.out, delay: on ? delay + 0.7 : 0 }}
              />
              <text x={T_X + 36} y={tY(i) + (compact ? 40 : 29)} className="font-mono" fontSize={big - 3} fill="var(--bone)">
                {t.name}
              </text>
              {compact ? null : (
                <text x={T_X + 36} y={tY(i) + 47} className="font-mono" fontSize={small - 1} fill="var(--steel)">
                  {t.note}
                </text>
              )}
            </motion.g>
          </g>
        );
      })}

      <rect x={SOURCE.x} y={SOURCE.y} width={SOURCE.w} height={SOURCE.h} fill="var(--espresso)" stroke="var(--oxblood)" strokeWidth={1.5} />
      {compact ? null : (
        <text x={SOURCE.x + 20} y={SOURCE.y + 28} className="font-mono" fontSize={small - 1} fill="var(--steel)">
          // event
        </text>
      )}
      <text
        x={SOURCE.x + 20}
        y={SOURCE.y + (compact ? 50 : 56)}
        className="font-display"
        fontSize={big + 4}
        fill="var(--bone)"
      >
        tournament
      </text>
    </svg>
  );
}
