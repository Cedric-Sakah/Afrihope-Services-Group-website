import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValueList } from "@/components/sections/ValueList";
import { CTABlock } from "@/components/sections/CTABlock";
import { site, coreValues, siteImages } from "@/content/site";
import { businessUnits, getBusinessUnitBySlug } from "@/content/business-units";
import { pageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "Afrihope Group is a Cameroon-based multi-sector holding group operating seven business units under one mark, all held to the same standard of trust and quality.",
  path: "/about",
  image: DEFAULT_OG_IMAGE,
});

// Used to anchor the "group structure" section with a photograph distinct
// from the one in the hero, rather than reusing the same image twice on
// one page.
const consultingUnit = getBusinessUnitBySlug("consulting")!;

export default function AboutPage() {
  return (
    <>
      {/* Hero — typographic heading paired with a photo, same asymmetric
          rhythm as Home's hero-adjacent moments. */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <span aria-hidden className="block h-1 w-24 bg-teal" />
              <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                About Afrihope Group
              </h1>
              <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
                Afrihope Group is a Cameroon-based multi-sector holding group
                built around one working idea: complex problems deserve a
                specialist, not a generalist stretched thin. Seven business
                units operate under one mark, each built to solve a specific
                kind of problem, all held to the same standard of trust and
                quality.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:col-span-5">
              <Image
                src={siteImages.groupIntro.src}
                alt={siteImages.groupIntro.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission and vision — the two most important sentences in the
          brief, given a real graphic moment: a full-bleed dark manifesto
          band, large serif type in white (the one place large serif
          appears — everywhere else, big statements are sans display). */}
      <section className="bg-teal-deep py-20 sm:py-28">
        <Container>
          <div>
            <span aria-hidden className="block h-1 w-16 bg-amber-bright" />
            <h2 className="mt-4 font-display text-sm font-semibold text-white/80">Mission</h2>
            <p className="mt-4 max-w-4xl font-body text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
              {site.mission}
            </p>
          </div>

          <div className="mt-16 border-t border-white/15 pt-16">
            <span aria-hidden className="block h-1 w-16 bg-amber-bright" />
            <h2 className="mt-4 font-display text-sm font-semibold text-white/80">Vision</h2>
            <p className="mt-4 max-w-4xl font-body text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
              {site.vision}
            </p>
          </div>
        </Container>
      </section>

      {/* The five core values, explained */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Our values</SectionHeading>
          <ValueList values={coreValues} className="mt-10" />
        </Container>
      </section>

      {/* Group structure — paired with a photograph (distinct from the hero's)
          and a light roster rather than a repeat of the full ruled index
          that already lives on Home and the hub. About's job is explaining
          the structure conceptually, not re-enumerating every unit's
          offering and tagline a third time. */}
      <section className="border-t border-rule bg-mist py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:col-span-5">
              <Image
                src={consultingUnit.image.src}
                alt={consultingUnit.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <SectionHeading
                level="h2"
                lede="Every business unit operates with its own specialists and its own focus, but all seven sit under one mark and answer to the same group-wide standard. That structure is what lets a client bring us a logistics problem, a branding problem, or a produce order, and get the same standard of delivery each time."
              >
                One mark, seven units
              </SectionHeading>

              <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-rule pt-6 text-lg text-ink">
                {businessUnits.map((unit, index) => (
                  <li key={unit.slug} className="flex items-center gap-4">
                    <Link
                      href={`/business-units/${unit.slug}`}
                      className="font-display font-semibold hover:text-teal"
                    >
                      {unit.name}
                    </Link>
                    {index < businessUnits.length - 1 && (
                      <span aria-hidden className="h-4 w-px bg-rule" />
                    )}
                  </li>
                ))}
              </ul>

              <Link
                href="/business-units"
                className="nav-sweep mt-8 inline-block text-sm font-medium text-teal"
              >
                See what each unit offers
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Positioning statement — reuses Home's photo-plus-panel device (the
          same skyline, the same guaranteed-contrast panel) so the two pages
          share a recognizable closing motif rather than each inventing a
          one-off treatment. */}
      <section className="relative overflow-hidden bg-teal-deep py-20 sm:py-28">
        <Image src={siteImages.hero.src} alt="" fill className="object-cover opacity-90" />
        <Container className="relative z-10">
          <div className="max-w-3xl bg-teal-deep/90 px-6 py-8 sm:px-10 sm:py-10">
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl">
              {site.positioning}
            </p>
          </div>
        </Container>
      </section>

      <CTABlock
        heading="Have a question about the group?"
        body="Reach out and we'll connect you with the right business unit."
        ctaLabel="Get in touch"
        ctaHref="/contact"
        precededByDarkSection
      />
    </>
  );
}
