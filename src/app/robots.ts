import type { MetadataRoute } from "next";
import { getContent } from "@/content";

export default function robots(): MetadataRoute.Robots {
  const { url } = getContent().meta;
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml` };
}
