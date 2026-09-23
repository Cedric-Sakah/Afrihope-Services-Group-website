import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { pageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "News and insights from Afrihope Group — coming soon.",
  path: "/insights",
  image: DEFAULT_OG_IMAGE,
  // Thin placeholder content — keep it out of search results until real
  // articles exist, per this page's own comment below.
  noindex: true,
});

/** Phase-2 shell. Real articles/insights content is planned but not yet written. */
export default function InsightsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <span aria-hidden className="block h-1 w-24 bg-teal" />
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Insights
        </h1>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
          News and insights from across Afrihope Group are being prepared for publication. Check
          back soon, or get in touch if you have a question in the meantime.
        </p>
      </Container>
    </section>
  );
}
