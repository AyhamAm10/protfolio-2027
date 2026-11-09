# Prompt — Portfolio Build Session

> انسخ كل شي تحت الخط وحطو كأول رسالة بالمحادثة الجديدة (بنفس المجلد `C:\protfolio`).

---

Use the **frontend-design** skill for this whole session. Reply to me in Syrian Arabic; write all code, comments and site copy in English.

## Context
I'm Ayham Ashram, a Full-Stack Engineer (5+ years: Node.js, TypeORM, PostgreSQL, React, Next.js, React Native). I'm building my personal portfolio. **Read `README.md` in this folder first and read all of it.** It's the single source of truth for my profile, projects, case studies, positioning and visual identity. Don't invent facts, numbers or projects that aren't in it. Where something is marked ❓, use a clearly marked placeholder.

**The core message:** *"He can take an idea and ship it as a complete, clean, scalable system used by thousands."* My strongest work is architecture, specifically multi-tenant SaaS. My flagship is **Markaz** (a university library platform, 11,000+ students, 4 faculties). The second flagship is **AM Arena**.

## Goal
Build a portfolio that's genuinely distinctive and senior-level. It must not look like a template, and it must not look like the generic AI-generated "dark + purple gradient + glassmorphism" portfolio. It should feel **cinematic, editorial and confident**, like a luxury brand campaign crossed with an engineer's blueprint.

## Visual identity — "Oxblood Noir"
The palette comes from my portrait (black suit, oxblood tie, white shirt, steel watch, warm amber city bokeh). Use exactly these as CSS design tokens:

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E0B0A` | page background (warm near-black, never pure #000) |
| `--espresso` | `#1A1412` | surfaces/cards |
| `--umber` | `#2A211D` | borders, hairlines |
| `--oxblood` | `#7A1F2B` | primary accent |
| `--claret` | `#A3364A` | hover/focus/links |
| `--amber` | `#C9945B` | glow, key numbers, small highlights |
| `--bone` | `#EDE6DC` | primary text (warm white) |
| `--steel` | `#8E979C` | secondary text, metadata |

Rule: ~85% ink/espresso, ~10% bone, ~5% accents. Accents are rare, and that's why they hit. No blue, purple, neon or cyan. Every pairing must pass WCAG AA contrast.

**Typography** (propose 2 pairings and let me choose before you lock one in):
- A high-contrast **editorial serif** for big display headlines (e.g. Instrument Serif / Fraunces / PP Editorial-style feel).
- A clean **grotesk** for UI/body (not Inter, not Roboto).
- A **monospace** for "system" details: labels, metrics, code snippets, architecture annotations. This is where the engineer side shows.
- Large, confident type scale. Generous whitespace. A visible grid system.

**Texture & motion:** subtle film grain, warm amber light leaks/bokeh glows, hairline borders, a blueprint-style grid used sparingly. Motion is smooth and intentional, never bouncy. Think masked text reveals, scroll-linked transitions, a magnetic cursor or buttons where it fits. Respect `prefers-reduced-motion`.

## The portrait
File: `file/Cinematic Urban Portrait in Burgundy Tie (1).png`.
- Copy it to `public/images/ayham-portrait.*` with a clean name and serve an optimized version (AVIF/WebP via `next/image`). Keep the original file.
- It should be a **hero-level element** with a cinematic treatment. Ideas: a mask/clip reveal on load, a slight scroll parallax, the warm grade preserved, an edge fade into `--ink`, an oxblood light accent echoing the tie, grain on top. Never put it in a generic circle avatar.
- Show it prominently once (Hero or a dedicated "About" moment). Don't scatter it everywhere.

## Concept — the site as a system
I'm a systems engineer, so let the structure reflect that. Explore this as the narrative spine: scrolling moves **layer by layer: Database → API → Dashboard → Mobile**, mirroring how I build. Projects can read like "services/tenants" in an architecture map, with mono annotations (`// tenant: faculty-of-pharmacy`, `status: live`, `users: 11,000+`). Keep it elegant and readable. The concept serves the content, not the other way around.

## Sections (from README §6.2)
1. **Hero**: name, headline, portrait, a live-feeling counter `11,000+ students served`, CTAs (View work / Contact).
2. **What I build**: SaaS platforms · Mobile apps · System architecture.
3. **Flagship case studies**: Markaz and AM Arena as rich scroll stories (problem → role → solution → challenges → impact → stack → links). Include an animated **multi-tenancy diagram** and a **time-based archiving** visual for Markaz, and a **CI/CD pipeline** visual for AM Arena.
4. **More work**: SaaS Institute Platform (badge "Building now"), korrasat.ai, ISS institute systems (image slider, with placeholders until I add screenshots), ITM Core, Ya Suria, MyCar, Courses Platform.
5. **Architecture philosophy**: how I think (layers, multi-tenancy, extensible schemas, maintainability). This is the differentiator.
6. **Experience**: no dates.
7. **Lab**: small, light section for UI/3D experiments (Damac, Apple, 3D Portfolio), clearly labeled as UI studies.
8. **Stack + Certifications** (IBM Back-End, Meta Front-End).
9. **Contact**: GitHub, LinkedIn, email placeholder.

## Tech
- Next.js (App Router) + TypeScript + Tailwind CSS (tokens as CSS variables) + Framer Motion. Add React Three Fiber only if a 3D moment truly earns its place, and keep it light.
- Content lives in a typed data file (`src/content/*.ts`), not hard-coded in components, so I can edit text and projects easily. Structure it to be i18n-ready, since an Arabic/RTL version may come later.
- Clean component architecture (I care about this: layered, compound components where it fits). Strict TypeScript.
- Performance: Lighthouse 90+, optimized images and fonts, no layout shift. Accessibility: semantic HTML, keyboard nav, focus states. Responsive from 360px up.
- SEO: metadata, Open Graph image, sitemap.

## How we work (important)
Step by step, and I approve each step:
1. Read README.md. Summarize your understanding in 5 lines.
2. Propose **2–3 distinct Hero directions** (layout + portrait treatment + motion idea) and the **2 font pairings**. Wait for my choice.
3. Scaffold the project and design tokens, then build the Hero only. Preview it in the browser (desktop + mobile) and show me.
4. Then one section at a time, with my feedback in between.

Before building each section, ask yourself: *"Would a senior designer at a top studio ship this, or does it look like every other portfolio?"* If it's the latter, push further.
