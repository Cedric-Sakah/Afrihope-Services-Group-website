/**
 * Group-level brand copy for Afrihope Group.
 * Business-unit content lives in ./business-units.ts — this file holds
 * everything that describes the group as a whole.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Group-level imagery. These are sourced stock photographs standing in for
 * real Afrihope photography — see the README's content-editing guide for
 * how to swap them once real photography of offices, sites, and teams
 * exists. Never caption these with a specific claimed location.
 */
export const siteImages = {
  hero: {
    src: "/images/hero-city-skyline.jpg",
    alt: "Aerial view of a modern city skyline",
  },
  groupIntro: {
    src: "/images/group-team-meeting.jpg",
    alt: "A team in discussion around a table",
  },
} as const;

export type CoreValue = {
  name: string;
  description: string;
};

export const site = {
  name: "Afrihope Group",
  legalName: "Afrihope Group",
  motto: "Innovating Hope & Driving Sustainable Solutions for Africa",
  mottoShort: "Innovating Hope, Driving Solutions",

  mission:
    "Afrihope Group exists to deliver trusted, high-quality solutions and products — from strategic consulting to everyday essentials — empowering businesses, institutions, and communities across Africa to solve real problems and thrive.",

  vision:
    "To be Africa's most trusted multi-sector group, where every business unit is synonymous with reliability, innovation, and impact.",

  positioning:
    "Whatever challenge you're facing — strategic, technical, logistical, or everyday — there's an Afrihope business unit built to solve it, backed by a group-wide standard of trust and quality.",

  introduction:
    "Afrihope Group is a Cameroon-based multi-sector holding group operating seven business units across consulting, technology, public contracting, brand design, mobility, food production, and real estate. Each unit is an expert in its own field. All of them answer to the same standard: trust, excellence, and measurable impact.",

  url: "https://www.afrihopegroup.com",

  contact: {
    phones: ["+237 6 79 44 49 85", "+237 6 72 58 55 26"],
    email: "afrihopeservices@gmail.com",
    // TODO(client): Confirm physical office address before launch.
    // Once confirmed, populate this field and wire it into components/sections/ContactDetails
    // and components/sections/MapEmbed (component scaffolded, currently renders nothing).
    address: null as string | null,
  },

  // Empty on purpose — see AGENTS.md §11. Footer social icons render only for
  // handles present in this array, so leaving it empty renders none.
  socials: [] as SocialLink[],
} as const;

export const coreValues: CoreValue[] = [
  {
    name: "Trust",
    description:
      "We do what we say we will do. Every unit is held to commitments that clients, partners, and institutions can rely on without having to check twice.",
  },
  {
    name: "Excellence",
    description:
      "Good enough isn't. We hold every product, project, and engagement to a standard worth putting our name on.",
  },
  {
    name: "Innovation",
    description:
      "We look for better ways to solve old problems — in how we consult, build, distribute, and manage — rather than defaulting to how things have always been done.",
  },
  {
    name: "Accessibility",
    description:
      "Trusted solutions should reach the people who need them, not just those who can already afford access. We design for reach across markets and budgets.",
  },
  {
    name: "Impact",
    description:
      "We measure our work by what changes for the businesses, institutions, and communities we serve — not by activity for its own sake.",
  },
];

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Business units", href: "/business-units" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Business units", href: "/business-units" },
  { label: "Contact", href: "/contact" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];
