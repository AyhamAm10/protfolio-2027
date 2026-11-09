import { heroTimeline, intro } from "@/lib/motion";

/** Column rules at quarters of the content width, plus header/footer rules. */
const columns = [0, 25, 50, 75, 100];
const rows = ["5.25rem", "calc(100% - 4.5rem)"];

/** Drawn with CSS so the intro costs no main-thread time. */
export function BlueprintGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="relative mx-auto h-full max-w-[1520px] px-[var(--gutter)]">
        <div className="relative h-full">
          {columns.map((left, i) => (
            <span
              key={left}
              className="intro intro-draw-y absolute top-0 bottom-0 w-px origin-top bg-umber/70"
              style={{ left: `${left}%`, ...intro(heroTimeline.grid + i * 0.06, 1.4) }}
            />
          ))}
        </div>
      </div>
      {rows.map((top, i) => (
        <span
          key={top}
          className="intro intro-draw-x absolute inset-x-0 h-px origin-left bg-umber/70"
          style={{ top, ...intro(heroTimeline.grid + 0.15 + i * 0.1, 1.4) }}
        />
      ))}
    </div>
  );
}
