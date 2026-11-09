import type { MetadataRoute } from "next";
import { getContent } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getContent().meta;
  return [{ url, changeFrequency: "monthly", priority: 1 }];
}
