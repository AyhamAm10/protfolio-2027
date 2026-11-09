/**
 * Content model. Every string the site renders lives in a locale file
 * that satisfies `SiteContent`, so an Arabic (RTL) locale can be added
 * later without touching components.
 */

export type Locale = "en";

export interface Link {
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Placeholder {
  /** Marks content still missing from README §9 so it is easy to find. */
  placeholder: true;
  note: string;
}

/** A point on the portrait (percent of the 4:5 frame) and what it annotates. */
export interface PortraitAnnotation {
  id: string;
  /** Rendered as a code comment, e.g. `// users`. */
  key: string;
  anchor: { x: number; y: number };
  value: string;
  /** When set, `value` is replaced by a count-up to this number. */
  countTo?: number;
  countSuffix?: string;
  detail: string;
  status?: string;
}

export interface HeroContent {
  name: [first: string, last: string];
  headline: string;
  summary: string;
  primaryCta: Link;
  secondaryCta: Link;
  portrait: { src: string; alt: string; width: number; height: number };
  annotations: PortraitAnnotation[];
  /** The stack, listed bottom layer first, as a path. */
  stackPath: string[];
  scrollCue: string;
}

/** The four layers every product passes through, listed foundation first. */
export type LayerId = "database" | "api" | "dashboard" | "mobile";

export interface StackLayer {
  id: LayerId;
  name: string;
  tech: string[];
}

export interface Offering {
  id: string;
  title: string;
  description: string;
  /** Layers this kind of work runs through. */
  layers: LayerId[];
  examples: string[];
}

export interface BuildContent {
  id: string;
  title: string;
  intro: string;
  /** Foundation first: database, api, dashboard, mobile. */
  layers: StackLayer[];
  offerings: Offering[];
  /** Screen-reader prefix before an offering's layer list. */
  layersLabel: string;
}

/** Visuals a case study step can show. New diagrams register a key here. */
export type CaseVisual =
  | "tenancy-isolated"
  | "tenancy-connected"
  | "archive"
  | "tournament-fanout"
  | "extensible-schema"
  | "pipeline";

export interface CaseStep {
  id: string;
  /** Problem, solution, challenge, and so on, as a short code comment. */
  kind: string;
  heading: string;
  body: string;
  visual: CaseVisual;
  caption: string;
}

export interface CaseFact {
  label: string;
  value: string;
}

export interface CaseImpact {
  value: string;
  countTo?: number;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  /** Position among the flagship case studies. */
  index: number;
  total: number;
  name: string;
  summary: string;
  facts: CaseFact[];
  steps: CaseStep[];
  impact: CaseImpact[];
  stack: string[];
  /** Entries still to confirm, shown as visible placeholders. */
  stackPending?: string[];
  links: Link[];
  linksNote?: string;
  screens: { label: string; kind: "phone" | "browser"; image?: ImageAsset }[];
  screensPendingNote: string;
}

export interface WorkContent {
  id: string;
  title: string;
  cases: CaseStudy[];
}

export interface Project {
  id: string;
  name: string;
  /** One line, shown in the collapsed row. */
  summary: string;
  /** Where it was built: a company, freelance, or own product. */
  context: string;
  role: string;
  status?: { kind: "building" | "live"; label: string };
  details: string[];
  quote?: string;
  stack?: string[];
  links: Link[];
  /** Facts still missing, rendered as visible placeholders. */
  pending?: string[];
  gallery?: { label: string; note: string; image?: ImageAsset }[];
}

export interface MoreWorkContent {
  id: string;
  title: string;
  intro: string;
  columns: { project: string; summary: string; context: string; status: string };
  labels: { role: string; stack: string; links: string; pending: string; previous: string; next: string };
  projects: Project[];
}

export interface Principle {
  id: string;
  title: string;
  body: string;
  sketch: {
    /** File-ish name shown on the panel tab, e.g. `lectures/`. */
    file: string;
    /** Lines of code; text after `//` or `--` renders as a comment. */
    lines: string[];
    /** Honest provenance: a sketch of the pattern, or real source. */
    source: string;
  };
  seenIn: string[];
}

export interface PhilosophyContent {
  id: string;
  title: string;
  intro: string;
  seenInLabel: string;
  principles: Principle[];
  closing: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  summary: string;
  points: string[];
  /** Links into the work shown higher up the page. */
  work: Link[];
  /** Layers of the stack this role covered. */
  layers: LayerId[];
}

export interface ExperienceContent {
  id: string;
  title: string;
  intro: string;
  note: string;
  columns: { layers: string; company: string; work: string };
  layerNames: Record<LayerId, string>;
  entries: ExperienceEntry[];
}

export interface LabItem {
  id: string;
  name: string;
  kind: string;
  description: string;
  link: Link;
}

export interface LabContent {
  id: string;
  title: string;
  intro: string;
  disclaimer: string;
  items: LabItem[];
}

export interface StackGroup {
  id: string;
  label: string;
  items: string[];
}

export interface Certification {
  id: string;
  issuer: string;
  name: string;
  platform: string;
  /** Verification URL; undefined renders a visible placeholder. */
  credentialUrl?: string;
}

export interface StackContent {
  id: string;
  title: string;
  intro: string;
  groups: StackGroup[];
  certificationsTitle: string;
  certifications: Certification[];
  labels: { verify: string; pending: string };
}

export interface ContactContent {
  id: string;
  title: string;
  body: string;
  /** Leave undefined until confirmed; a visible placeholder renders instead. */
  email?: string;
  emailLabel: string;
  emailPending: string;
  links: Link[];
  footer: { owner: string; built: string; backToTop: string };
}

export interface SiteContent {
  locale: Locale;
  dir: "ltr" | "rtl";
  meta: { title: string; description: string; url: string };
  nav: { home: Link; links: Link[]; skip: string };
  hero: HeroContent;
  build: BuildContent;
  work: WorkContent;
  moreWork: MoreWorkContent;
  philosophy: PhilosophyContent;
  experience: ExperienceContent;
  lab: LabContent;
  stack: StackContent;
  contact: ContactContent;
}
