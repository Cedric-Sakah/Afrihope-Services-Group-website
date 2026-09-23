import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnitIndex } from "@/components/sections/UnitIndex";
import { ValueList } from "@/components/sections/ValueList";
import { CTABlock } from "@/components/sections/CTABlock";
import { JsonLd } from "@/components/JsonLd";
import { site, coreValues, siteImages } from "@/content/site";
import { businessUnits } from "@/content/business-units";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | ${site.mottoShort}`,
  description: site.mission,
  path: "/",
  // No `image` — app/opengraph-image.tsx supplies this route's OG image.
});

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.mission,
    email: site.contact.email,
    telephone: site.contact.phones[0],
    subOrganization: businessUnits.map((unit) => ({
      "@type": "Organization",
      name: unit.name,
      description: unit.tagline,
      url: `${site.url}/business-units/${unit.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />

      {/* Hero — typographic, not decorative. The one orchestrated load-in
          moment on the whole site: the rule draws, the lines settle. */}
      <section className="py-20 sm:py-28">
        <Container>
          <span aria-hidden className="hero-rule block h-1 w-24 bg-teal" />
          <h1
            className="hero-rise mt-8 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.1s" }}
          >
            {site.motto}
          </h1>
          <p
            className="hero-rise measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl"
            style={{ animationDelay: "0.25s" }}
          >
            {site.mission}
          </p>

          <div className="hero-rise mt-8" style={{ animationDelay: "0.4s" }}>
            <Button href="/business-units">Explore our business units</Button>
          </div>

          <nav
            aria-label="Business units directory"
            className="hero-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-rule pt-6 text-sm text-ink-muted"
            style={{ animationDelay: "0.55s" }}
          >
            {businessUnits.map((unit, index) => (
              <span key={unit.slug} className="flex items-center gap-4">
                <Link href={`/business-units/${unit.slug}`} className="hover:text-teal">
                  {unit.name}
                </Link>
                {index < businessUnits.length - 1 && (
                  <span aria-hidden className="h-4 w-px bg-rule" />
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>

      {/* Seven business units, one mark — visualised directly, rather than
          decorated: one equal-width photograph per unit, edge to edge, in
          full color. Hover/focus lifts the image slightly and surfaces the
          unit name, like a directory wall rather than a card hover. */}
      <section
        className="hero-rise border-y border-rule"
        style={{ animationDelay: "0.65s" }}
        aria-label="Our seven business units"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
          {businessUnits.map((unit, index) => (
            <Link
              key={unit.slug}
              href={`/business-units/${unit.slug}`}
              className="photo-tile group relative aspect-[3/4] overflow-hidden focus-visible:z-10"
            >
              <Image
                src={unit.image.src}
                alt={unit.image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
              {/* Visible by default below lg (touch devices have no hover
                  state, so a hover-only reveal would leave them unable to
                  see which unit a tile is until after tapping through);
                  hidden-until-hover only once a mouse is the primary
                  input, at lg and up. */}
              <span className="absolute inset-x-0 bottom-0 translate-y-0 bg-teal-deep/90 px-3 py-2 font-display text-xs font-semibold text-white transition-transform duration-300 lg:translate-y-full lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0">
                {unit.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Group introduction — image and text in an asymmetric pairing,
          reversed from the hero's arrangement so the two moments differ. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:order-1 lg:col-span-5">
              <Image
                src={siteImages.groupIntro.src}
                alt={siteImages.groupIntro.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-2 lg:col-span-7">
              <SectionHeading level="h2" withRule>
                One group, seven experts
              </SectionHeading>
              <p className="measure mt-6 text-lg leading-relaxed text-ink-muted">
                {site.introduction}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The ruled index — the organising device for the whole site */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <SectionHeading
            level="h2"
            lede="Each unit is an expert in its field, all held to the same standard of trust and quality."
          >
            Our business units
          </SectionHeading>
          <UnitIndex units={businessUnits} className="mt-10" />
        </Container>
      </section>

      {/* Why Afrihope */}
      <section className="border-t border-rule bg-mist py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Why Afrihope</SectionHeading>
          <ValueList values={coreValues} className="mt-10" />
        </Container>
      </section>

      {/* Positioning statement — a photographic backdrop rather than flat
          color, but the pull-quote sits on its own solid panel rather than
          directly on the photo. A photo's brightness varies pixel to pixel
          (a pale building facade can sit right behind a word), so no single
          scrim opacity can guarantee AA contrast everywhere without also
          washing the photo back out. A panel sidesteps that trade-off
          entirely: contrast is guaranteed by a known, controlled color. */}
      <section className="relative overflow-hidden bg-teal-deep pt-20 pb-12 sm:pt-28 sm:pb-16">
        <Image src={siteImages.hero.src} alt="" fill className="object-cover opacity-90" />
        <Container className="relative z-10">
          <div className="max-w-3xl bg-teal-deep/90 px-6 py-8 sm:px-10 sm:py-10">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
              {site.positioning}
            </p>
          </div>
        </Container>
      </section>

      {/* Closing CTA — same dark passage as the positioning statement above,
          split by a hairline rather than stacking two full section gaps */}
      <CTABlock
        heading="Ready to work with the right business unit?"
        body="Tell us what you're trying to solve and we'll route your enquiry to the team best placed to help."
        ctaLabel="Get in touch"
        ctaHref="/contact"
        precededByDarkSection
      />
    </>
  );
}
