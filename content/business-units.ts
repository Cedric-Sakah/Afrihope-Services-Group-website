/**
 * Single source of truth for all seven Afrihope Group business units.
 *
 * Every unit page under /business-units/[slug] is generated from this file
 * via generateStaticParams — adding an eighth unit means adding one object
 * here, not touching route files.
 */

export type ProofType = "portfolio" | "fleet" | "product-range" | "delivery-record";

export type BusinessUnitService = {
  title: string;
  description: string;
};

export type ProofSlot = {
  type: ProofType;
  /** Rendered only when no real proof content exists yet. Never fabricate this. */
  emptyStateMessage: string;
};

export type UnitImage = {
  src: string;
  /**
   * Descriptive alt text only — never a location or client claim. These are
   * sourced stock photographs standing in for real Afrihope photography;
   * see the README's content-editing guide for how to swap them.
   */
  alt: string;
};

export type BusinessUnit = {
  slug: string;
  name: string;
  /** Short offering line used in the ruled index and nav dropdown. */
  offering: string;
  tagline: string;
  image: UnitImage;
  /** Overview copy, one paragraph per array entry. */
  overview: string[];
  services: BusinessUnitService[];
  /** Named client types this unit serves — never specific client names. */
  servedClients: string[];
  proof: ProofSlot;
  ctaLabel: string;
};

export const businessUnits: BusinessUnit[] = [
  {
    slug: "consulting",
    name: "Afrihope Consulting",
    offering: "Consultancy, organizational training, research",
    tagline:
      "Strategic clarity and practical training that help your organization make better decisions and grow.",
    image: {
      src: "/images/unit-consulting.jpg",
      alt: "Colleagues in discussion around a table in a glass-walled meeting room",
    },
    overview: [
      "Afrihope Consulting works with organizations that need more than an opinion — they need a defensible answer, backed by research, that their board, funders, or regulators will accept.",
      "We combine strategic advisory with hands-on organizational training and applied research, so the recommendations we hand over come with the internal capacity to act on them, not just a report to file away.",
    ],
    services: [
      {
        title: "Strategy & advisory",
        description:
          "Structured support for decisions that carry real weight — market entry, restructuring, growth planning — grounded in evidence rather than assumption.",
      },
      {
        title: "Organizational training",
        description:
          "Practical, role-specific training that builds capacity inside your organization instead of leaving it dependent on outside advisors.",
      },
      {
        title: "Applied research",
        description:
          "Primary and secondary research designed around a decision you need to make, not research for its own sake.",
      },
      {
        title: "Monitoring & evaluation",
        description:
          "Frameworks that tell you honestly whether a program is working, built to standards funders and institutions recognize.",
      },
    ],
    servedClients: [
      "Government ministries and agencies",
      "NGOs and development partners",
      "Small and growing enterprises",
      "Cooperatives and associations",
    ],
    proof: {
      type: "portfolio",
      emptyStateMessage: "Case studies are being prepared for publication.",
    },
    ctaLabel: "Request a consultation",
  },
  {
    slug: "tech",
    name: "Afrihope Tech",
    offering: "Technology solutions",
    tagline: "Technology solutions built to solve real operational problems.",
    image: {
      src: "/images/unit-tech.jpg",
      alt: "A team gathered around a computer screen, discussing a project together",
    },
    overview: [
      "Afrihope Tech builds and integrates the systems organizations actually run on — not technology for its own sake, but software and infrastructure sized to a real operational problem.",
      "We work across custom platforms, systems integration, and ongoing support, and we build for the constraints of the markets we operate in: patchy connectivity, mixed device capability, and teams that need something they can actually maintain.",
    ],
    services: [
      {
        title: "Custom software & web platforms",
        description:
          "Web and business applications built around how your organization actually operates, not a generic template.",
      },
      {
        title: "Systems integration",
        description:
          "Connecting the tools you already use — payments, CRM, reporting — so data moves between them without manual re-entry.",
      },
      {
        title: "IT infrastructure & support",
        description:
          "Networks, servers, and device fleets set up and maintained so operations don't stall on preventable technical failures.",
      },
      {
        title: "Digital transformation advisory",
        description:
          "A clear-eyed assessment of what to digitize first, in what order, and at what cost — before any code is written.",
      },
    ],
    servedClients: [
      "Businesses digitizing core operations",
      "Public institutions",
      "NGOs and development programs",
      "Other Afrihope business units",
    ],
    proof: {
      type: "portfolio",
      emptyStateMessage: "Case studies are being prepared for publication.",
    },
    ctaLabel: "Discuss a project",
  },
  {
    slug: "contracts",
    name: "Afrihope Contracts",
    offering: "Public contracts",
    tagline:
      "A dependable partner for public-sector projects, delivered to standard and on time.",
    image: {
      src: "/images/unit-contracts.jpg",
      alt: "A construction worker in a hard hat framing a building structure",
    },
    overview: [
      "Afrihope Contracts delivers public-sector projects the way institutional buyers need them delivered: to specification, on schedule, and with a paper trail that holds up to audit.",
      "We handle the procurement discipline, site management, and compliance reporting that public contracting demands, so government and institutional partners get certainty from tender to handover.",
    ],
    services: [
      {
        title: "Public works & infrastructure delivery",
        description:
          "End-to-end delivery of public-sector works, managed to the specification and timeline set by the contracting authority.",
      },
      {
        title: "Procurement & tendering support",
        description:
          "Tender preparation and procurement compliance handled to the standard institutional buyers require.",
      },
      {
        title: "Project & site management",
        description:
          "On-the-ground project management that keeps a public contract moving and accountable at every stage.",
      },
      {
        title: "Compliance & reporting",
        description:
          "Documentation and reporting built for audit — nothing left informal that a funder or regulator will ask to see.",
      },
    ],
    servedClients: [
      "Government ministries and agencies",
      "Local councils and municipalities",
      "Development partners funding public projects",
      "Prime contractors seeking a subcontracting partner",
    ],
    proof: {
      type: "delivery-record",
      emptyStateMessage: "Delivery records are being prepared for publication.",
    },
    ctaLabel: "Partner with us",
  },
  {
    slug: "brand-studio",
    name: "Afrihope Brand Studio",
    offering: "Branding and identity design",
    tagline: "Brand identities that make businesses memorable and trusted.",
    image: {
      src: "/images/unit-brand-studio.jpg",
      alt: "Color swatches, a mood board, and a tablet sketch on a designer's desk",
    },
    overview: [
      "Afrihope Brand Studio builds brand identities that hold up under real use — on a storefront, an invoice, a uniform, a billboard — not just on a presentation slide.",
      "We work from positioning through to the full visual system, so a new or repositioned business leaves with an identity it can apply consistently across every touchpoint from day one.",
    ],
    services: [
      {
        title: "Brand identity & visual design",
        description:
          "Logo, color, and visual system design built around what the business actually needs to communicate.",
      },
      {
        title: "Naming & positioning",
        description:
          "Clear naming and market positioning for businesses launching or repositioning, grounded in how the target audience actually decides.",
      },
      {
        title: "Brand guidelines & systems",
        description:
          "Documented guidelines that keep a brand consistent across every team and vendor that touches it after launch.",
      },
      {
        title: "Marketing collateral & campaign design",
        description:
          "Campaign and collateral design that stays on-brand across print, digital, and point-of-sale.",
      },
    ],
    servedClients: [
      "Startups launching a new brand",
      "Established businesses rebranding",
      "Public institutions",
      "Other Afrihope business units",
    ],
    proof: {
      type: "portfolio",
      emptyStateMessage: "Case studies are being prepared for publication.",
    },
    ctaLabel: "Start a project",
  },
  {
    slug: "mobility",
    name: "Afrihope Mobility",
    offering: "Car rentals",
    tagline: "Reliable vehicles, whenever and wherever you need them.",
    image: {
      src: "/images/unit-mobility.jpg",
      alt: "A vehicle parked in a well-lit covered parking facility",
    },
    overview: [
      "Afrihope Mobility keeps businesses, missions, and travelers moving with vehicles that show up on time and in the condition promised.",
      "Whether it's a single self-drive booking or a standing corporate account, we treat vehicle reliability as the whole product — not an afterthought to a rental transaction.",
    ],
    services: [
      {
        title: "Self-drive rentals",
        description:
          "Well-maintained vehicles available for short and extended self-drive hire.",
      },
      {
        title: "Chauffeur-driven rentals",
        description:
          "Vetted drivers for clients who need a vehicle handled, not just supplied.",
      },
      {
        title: "Corporate & long-term leasing",
        description:
          "Standing vehicle accounts for organizations with ongoing transport needs, billed on predictable terms.",
      },
      {
        title: "Airport transfer service",
        description:
          "Scheduled and on-demand airport transfers for business travelers and visiting teams.",
      },
    ],
    servedClients: [
      "Business travelers",
      "Corporate accounts",
      "NGOs and development missions",
      "Event organizers",
    ],
    proof: {
      type: "fleet",
      emptyStateMessage: "Fleet details are being prepared for publication.",
    },
    ctaLabel: "Book a vehicle",
  },
  {
    slug: "foods",
    name: "Afrihope Foods",
    offering:
      "Production, branding, processing and distribution of natural foods",
    tagline: "Quality you can taste, from farm to table.",
    image: {
      src: "/images/unit-foods.jpg",
      alt: "Fresh kale, apple, lemon, ginger, cucumber, lettuce, and celery arranged on a clean surface",
    },
    overview: [
      "Afrihope Foods produces, processes, and distributes natural food products under a standard we control from sourcing through to the shelf.",
      "We handle production and processing in-house and manage branding and distribution as one connected chain, so wholesale buyers and distributor partners get consistent quality at the volume they need.",
    ],
    services: [
      {
        title: "Food production & processing",
        description:
          "Natural food products produced and processed to a consistent quality standard, batch after batch.",
      },
      {
        title: "Packaging & branding",
        description:
          "Packaging and branding handled in-house, so product presentation matches product quality on the shelf.",
      },
      {
        title: "Wholesale distribution",
        description:
          "Reliable wholesale supply for buyers who need volume and consistency, not one-off orders.",
      },
      {
        title: "Distributor & retail partnerships",
        description:
          "Standing partnerships for distributors and retailers who want to carry the Afrihope Foods range.",
      },
    ],
    servedClients: [
      "Wholesale food buyers",
      "Retailers and supermarkets",
      "Distributors",
      "Institutional caterers",
    ],
    proof: {
      type: "product-range",
      emptyStateMessage: "Our product range is being prepared for publication.",
    },
    ctaLabel: "Order or become a distributor",
  },
  {
    slug: "real-estate",
    name: "Afrihope Real Estate",
    offering:
      "Property brokerage, property management, development, facilities management",
    tagline: "Building value and creating futures.",
    image: {
      src: "/images/unit-real-estate.jpg",
      alt: "Exterior of a modern multi-storey residential building with balconies",
    },
    overview: [
      "Afrihope Real Estate covers the full property lifecycle — brokerage, management, development, and facilities management — under one accountable partner.",
      "That range means a client doesn't have to hand a property off between unrelated vendors: the team that manages an asset understands how it was built, and the team that develops it understands how it will need to be run.",
    ],
    services: [
      {
        title: "Property brokerage & sales",
        description: "Sale and letting of residential and commercial property, handled end to end.",
      },
      {
        title: "Property management",
        description:
          "Day-to-day management for landlords and investors who want returns without operational involvement.",
      },
      {
        title: "Real estate development",
        description:
          "Development delivery from planning through to handover, for residential and commercial projects.",
      },
      {
        title: "Facilities management",
        description:
          "Ongoing facilities management that keeps commercial and institutional properties running to standard.",
      },
    ],
    servedClients: [
      "Property buyers and sellers",
      "Landlords and investors",
      "Developers seeking a delivery partner",
      "Corporate tenants",
    ],
    proof: {
      type: "portfolio",
      emptyStateMessage:
        "Property listings and developments are being prepared for publication.",
    },
    ctaLabel: "Talk to our team",
  },
];

export function getBusinessUnitBySlug(slug: string): BusinessUnit | undefined {
  return businessUnits.find((unit) => unit.slug === slug);
}

export const businessUnitSlugs: string[] = businessUnits.map((unit) => unit.slug);
