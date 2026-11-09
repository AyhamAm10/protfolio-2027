import type { Principle } from "@/content";

/** Splits a line into code and a trailing `//` or `--` comment. */
function splitComment(line: string): [string, string] {
  const match = line.match(/^(.*?)(\s*(?:\/\/|--)\s.*)$/);
  return match ? [match[1] ?? "", match[2] ?? ""] : [line, ""];
}

/** A code sketch on a spec panel: file tab, numbered lines, provenance. */
export function Sketch({ sketch }: { sketch: Principle["sketch"] }) {
  return (
    <figure className="relative border border-umber bg-ink">
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
        <span key={c} aria-hidden="true" className={`absolute size-3 border-bone/60 ${c}`} />
      ))}
      <div className="flex items-center justify-between gap-4 border-b border-umber px-5 py-3 font-mono text-[0.75rem]">
        <span className="text-bone">{sketch.file}</span>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-umber" />
          <span className="size-1.5 rounded-full bg-umber" />
          <span className="size-1.5 rounded-full bg-oxblood" />
        </span>
      </div>
      <pre className="overflow-x-auto [scrollbar-color:var(--umber)_transparent] [scrollbar-width:thin] px-5 py-6 font-mono text-[0.75rem] leading-[1.9] sm:text-[0.8125rem]">
        <code>
          {sketch.lines.map((line, i) => {
            const [code, comment] = splitComment(line);
            return (
              <span key={i} className="grid grid-cols-[1.75rem_1fr]">
                <span aria-hidden="true" className="select-none text-umber">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  <span className="text-bone">{code}</span>
                  <span className="text-steel">{comment}</span>
                </span>
              </span>
            );
          })}
        </code>
      </pre>
      <figcaption className="border-t border-umber px-5 py-3 font-mono text-[0.6875rem] text-amber">
        {sketch.source}
      </figcaption>
    </figure>
  );
}
