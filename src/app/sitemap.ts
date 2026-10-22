import type { MetadataRoute } from "next";
import { seoPages, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // No synthetic lastModified dates: a deployment need not mean content changed.
  return Object.values(seoPages).map(({ path }) => ({ url: siteUrl(path) }));
}
