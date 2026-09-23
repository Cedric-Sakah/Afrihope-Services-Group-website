import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  /** Short page title — the root layout's title.template appends " | Afrihope Group". */
  title: string;
  description: string;
  /** Root-relative path, e.g. "/about", or "/" for the home page. */
  path: string;
  /**
   * Root-relative Open Graph image path. Omit on routes that have their own
   * opengraph-image.tsx (Home, /business-units/[slug]) — Next's file
   * convention attaches those automatically, and setting `images` here
   * would take precedence over it instead of the dynamic one.
   */
  image?: string;
  /** Set true for thin placeholder pages (phase-2 shells) — keeps them out of search results (but still crawlable/followable) until they have real content. */
  noindex?: boolean;
};

/**
 * Builds the description/canonical/OpenGraph/Twitter metadata every page
 * shares, from that page's own title, description, and path. Centralized
 * here rather than repeated per page, since Next.js metadata merging is
 * shallow — a page that sets its own `openGraph` object replaces the root
 * layout's entirely rather than merging field-by-field, so every page needs
 * to be self-sufficient.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: PageMetadataInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Default OG image for routes without their own dynamic opengraph-image.tsx. */
export const DEFAULT_OG_IMAGE = "/og-default.png";
