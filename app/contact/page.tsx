import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { businessUnits } from "@/content/business-units";
import { enquiryUnitValues } from "@/lib/schemas/enquiry";
import { pageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo";

const DESCRIPTION =
  "Get in touch with Afrihope Group — reach the right business unit or send a general enquiry.";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: DESCRIPTION,
  path: "/contact",
  image: DEFAULT_OG_IMAGE,
});

export default async function ContactPage(props: PageProps<"/contact">) {
  const searchParams = await props.searchParams;
  const unitParam = typeof searchParams.unit === "string" ? searchParams.unit : undefined;
  const defaultUnit = unitParam && enquiryUnitValues.includes(unitParam) ? unitParam : undefined;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: DESCRIPTION,
    url: `${site.url}/contact`,
    email: site.contact.email,
    telephone: site.contact.phones[0],
    // Physical address intentionally omitted — see content/site.ts's
    // TODO(client) note; add a PostalAddress here once it's confirmed.
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />

      <section className="py-20 sm:py-28">
        <Container>
          <span aria-hidden className="block h-1 w-24 bg-teal" />
          <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Contact us
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
            Tell us what you&apos;re trying to solve and we&apos;ll route your enquiry to the team
            best placed to help.
          </p>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <EnquiryForm units={businessUnits} defaultUnit={defaultUnit} />
            </div>
            <div className="lg:col-span-5">
              <ContactDetails />
              <div className="mt-8">
                <MapEmbed />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
