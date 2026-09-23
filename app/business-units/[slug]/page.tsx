import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValueList } from "@/components/sections/ValueList";
import { ProofSlot } from "@/components/sections/ProofSlot";
import { CTABlock } from "@/components/sections/CTABlock";
import { businessUnitSlugs, getBusinessUnitBySlug } from "@/content/business-units";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return businessUnitSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/business-units/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const unit = getBusinessUnitBySlug(slug);
  if (!unit) return {};

  return pageMetadata({
    title: unit.name,
    description: unit.tagline,
    path: `/business-units/${unit.slug}`,
    // No `image` — this route's own opengraph-image.tsx supplies it.
  });
}

export default async function BusinessUnitPage(props: PageProps<"/business-units/[slug]">) {
  const { slug } = await props.params;
  const unit = getBusinessUnitBySlug(slug);
  if (!unit) notFound();

  const serviceItems = unit.services.map((service) => ({
    name: service.title,
    description: service.description,
  }));

  return (
    <>
      {/* Hero — typographic first, same rhythm as Home. The unit's photo
          gets its own full-color band right below rather than sitting
          behind the heading, so legibility never depends on where the
          text happens to land on the image. */}
      <section className="py-16 sm:py-24">
        <Container>
          <Breadcrumb
            items={[{ label: "Business units", href: "/business-units" }, { label: unit.name }]}
          />
          <span aria-hidden className="mt-6 block h-1 w-24 bg-teal" />
          <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {unit.name}
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
            {unit.tagline}
          </p>
        </Container>
      </section>

      <section className="border-y border-rule">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={unit.image.src}
            alt={unit.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Overview</SectionHeading>
          <div className="measure mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            {unit.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="border-t border-rule bg-mist py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Services</SectionHeading>
          <ValueList values={serviceItems} className="mt-10" />
        </Container>
      </section>

      {/* Who it serves */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Who we serve</SectionHeading>
          <ul className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-rule pt-6 text-base text-ink-muted">
            {unit.servedClients.map((client, index) => (
              <li key={client} className="flex items-center gap-4">
                <span>{client}</span>
                {index < unit.servedClients.length - 1 && (
                  <span aria-hidden className="h-4 w-px bg-rule" />
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Proof slot — honest empty state, never fabricated */}
      <section className="border-t border-rule bg-mist py-16 sm:py-24">
        <Container>
          <SectionHeading level="h2">Proof of work</SectionHeading>
          <div className="mt-8">
            <ProofSlot proof={unit.proof} />
          </div>
        </Container>
      </section>

      <CTABlock
        heading={`Ready to work with ${unit.name}?`}
        body={unit.tagline}
        ctaLabel={unit.ctaLabel}
        ctaHref={`/contact?unit=${unit.slug}`}
      />
    </>
  );
}
