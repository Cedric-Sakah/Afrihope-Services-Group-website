import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { businessUnitSlugs } from "@/content/business-units";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // /insights and /careers are deliberately excluded — they're noindex
  // phase-2 placeholder shells (see their own metadata) until real content
  // exists, and a sitemap should only list indexable pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/business-units`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const unitRoutes: MetadataRoute.Sitemap = businessUnitSlugs.map((slug) => ({
    url: `${site.url}/business-units/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...unitRoutes];
}
