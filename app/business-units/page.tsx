import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { UnitIndex } from "@/components/sections/UnitIndex";
import { CTABlock } from "@/components/sections/CTABlock";
import { businessUnits } from "@/content/business-units";
import { pageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

const INTRO =
  "Afrihope Group operates seven business units, each an expert in its field, all held to the same standard of trust and quality.";

export const metadata: Metadata = pageMetadata({
  title: "Business units",
  description: INTRO,
  path: "/business-units",
  image: DEFAULT_OG_IMAGE,
});

export default function BusinessUnitsPage() {
  return (
    <>
      {/* Hero — the count itself is the graphic device here, not a borrowed
          photo: this page's entire premise is "here are the seven," so it
          leads with the number rather than decorating around it. */}
      <section className="border-b border-rule py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <span aria-hidden className="block h-1 w-24 bg-teal" />
              <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Business units
              </h1>
              <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
                {INTRO}
              </p>
            </div>
            <div className="flex flex-col items-start lg:col-span-4 lg:items-end">
              <span className="font-display text-6xl font-semibold leading-none tracking-tight text-teal sm:text-7xl lg:text-9xl">
                7
              </span>
              <span className="mt-2 text-sm text-ink-muted">business units, one standard</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <UnitIndex units={businessUnits} />
        </Container>
      </section>

      <CTABlock
        heading="Not sure which unit fits?"
        body="Tell us what you're trying to solve and we'll route your enquiry to the team best placed to help."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}
