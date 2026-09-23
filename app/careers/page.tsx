import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { pageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: "Careers at Afrihope Group — coming soon.",
  path: "/careers",
  image: DEFAULT_OG_IMAGE,
  // Thin placeholder content — keep it out of search results until real
  // listings exist, per this page's own comment below.
  noindex: true,
});

/** Phase-2 shell. Real listings are planned but not yet published. */
export default function CareersPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <span aria-hidden className="block h-1 w-24 bg-teal" />
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Careers
        </h1>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
          Open roles across Afrihope Group&apos;s seven business units are being prepared for
          publication. Check back soon, or get in touch if you&apos;d like to introduce yourself
          ahead of time.
        </p>
      </Container>
    </section>
  );
}
