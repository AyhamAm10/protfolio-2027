"use client";

import type { CaseVisual as CaseVisualKey } from "@/content";
import { ArchiveTimeline } from "./ArchiveTimeline";
import { ExtensibleSchema } from "./ExtensibleSchema";
import { MultiTenancy } from "./MultiTenancy";
import { Pipeline } from "./Pipeline";
import { TournamentFanout } from "./TournamentFanout";

interface Props {
  visual: CaseVisualKey;
  /** In view: run the visual's animation. */
  active: boolean;
  /** Narrow, inline version with larger type. */
  compact?: boolean;
  /**
   * On the sticky stage a visual shows its final state as soon as its
   * step is current; inline, a morphing visual waits until it is seen.
   */
  stage?: boolean;
  title: string;
}

/** Maps a content key to its diagram. Register new visuals here. */
export function CaseVisual({ visual, active, compact = false, stage = false, title }: Props) {
  switch (visual) {
    case "tenancy-isolated":
      return <MultiTenancy state="isolated" active={active} compact={compact} crop={compact} title={title} />;
    case "tenancy-connected":
      return (
        <MultiTenancy
          state={stage || active ? "connected" : "isolated"}
          active={active}
          compact={compact}
          title={title}
        />
      );
    case "archive":
      return <ArchiveTimeline active={active} title={title} />;
    case "tournament-fanout":
      return <TournamentFanout active={active} compact={compact} title={title} />;
    case "extensible-schema":
      return <ExtensibleSchema active={active} title={title} />;
    case "pipeline":
      return <Pipeline active={active} title={title} />;
  }
}

/** Visuals that share one drawing and morph between states on the stage. */
export function visualFamily(visual: CaseVisualKey): string {
  return visual.startsWith("tenancy") ? "tenancy" : visual;
}
