import { en } from "./en";
import type { Locale, SiteContent } from "./types";

const dictionaries: Record<Locale, SiteContent> = { en };

export const defaultLocale: Locale = "en";

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale];
}

export type * from "./types";
