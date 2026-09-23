# Afrihope-Services-Group-website

# Afrihope Group — corporate website

Public corporate site for Afrihope Group, a Cameroon-based multi-sector holding
group operating seven business units. Built with Next.js 16 (App Router,
TypeScript, Tailwind CSS v4).

## Setup

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Environment variables

Copy the block below into a new `.env.local` file at the project root (this
repo's sandbox would not let the agent create a literal `.env.example` file,
so it's documented here instead — the values are the same either way):

```
# Resend (https://resend.com) — powers the Contact page enquiry form via
# lib/mailer.ts. Without these set, submissions are logged to the server
# console instead of sent — safe for local development, but required
# before launch.
RESEND_API_KEY=
MAIL_FROM_ADDRESS=
MAIL_TO_ADDRESS=afrihopeservices@gmail.com
```

Without `RESEND_API_KEY` set, the enquiry form still works end-to-end (validation,
honeypot, rate limiting) — it just logs the message to the server console
instead of emailing it. Set all three variables before launch.

## Content-editing guide (no code changes needed)

Everything a non-technical editor needs to change lives in two files:

- **`content/site.ts`** — group-wide copy: motto, mission, vision, positioning
  statement, core values, contact phone numbers/email, physical address (currently
  `null` — see Open items below), and social media links (currently empty).
- **`content/business-units.ts`** — one object per business unit. Each unit has:
  a `name`, `offering` (short line shown in the nav and index), `tagline`, an
  `image` (path under `public/images/` + alt text), `overview` paragraphs,
  `services` (3–4 items), `servedClients` (named client types, never specific
  client names), a `proof` slot (see below), and a `ctaLabel`.

**To add an eighth business unit:** add one object to the `businessUnits` array
in `content/business-units.ts` with a unique `slug`. Its page at
`/business-units/<slug>` is generated automatically — no other file needs to
change. Add a photo to `public/images/` first and reference it in the new
object's `image.src`.

**To update the proof slot for a unit** (case studies, fleet details, product
range, delivery record) once real content exists: edit that unit's `proof`
field. **Never invent** client names, statistics, testimonials, or case
studies — an honest "being prepared for publication" placeholder is safer for
a corporate credibility site than a fabricated one. The component rendering
this is `components/sections/ProofSlot.tsx`.

**To swap the logo** for real artwork: `components/ui/Logo.tsx` is the single
place the text wordmark is rendered — replace its contents with an `<Image>`
or inline SVG and every page picks it up automatically.

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket and import it in Vercel, or
   run `vercel` from the project root.
2. Add the three environment variables above in the Vercel project's
   Settings → Environment Variables.
3. Vercel auto-detects Next.js — no build configuration needed.

## Open items to confirm with the client before launch

These are called out inline in the code (search for `TODO(client)`) and were
left as clearly-marked placeholders per the build brief rather than guessed at:

- **Physical office address** — omitted; `components/sections/MapEmbed.tsx`
  renders nothing until `content/site.ts`'s `contact.address` is set.
- **Social media handles** — `content/site.ts`'s `socials` array is empty; the
  footer renders no icons until it's populated.
- **Logo artwork** — a text wordmark stands in for the real logo (see above).
- **Exact brand hex codes** — the palette in `app/globals.css` (`@theme`
  block) is derived from the logo colors and marked as provisional pending
  confirmation.
- **Photography** — every photograph on the site (the seven business-unit
  images, the hero/positioning-statement skyline, the group photo) is sourced
  stock photography standing in for real Afrihope photography. None of it
  depicts actual Afrihope staff, offices, vehicles, or products — swap these
  out via each unit's `image` field in `content/business-units.ts` (and
  `siteImages` in `content/site.ts`) once real photography exists.
- **Two naming inconsistencies in the source brief, already resolved here:**
  the brief's source document said "six business units" in one place but
  listed seven — seven is what's built. It also named two units
  inconsistently ("Afrihope Mobility" vs "Auto Mobile", "Afrihope Foods" vs
  "Agri-Business") — this build standardizes on **Mobility** and **Foods**.
  Please confirm both naming decisions with the client before launch.

## CMS path

Content currently lives in two typed TypeScript files (`content/site.ts`,
`content/business-units.ts`) rather than a database, by design — see the brief.
Both files export plain typed data with no framework-specific code, so a
headless CMS (Sanity, Payload, etc.) can be dropped in behind the same types
later: point `getBusinessUnitBySlug`/`businessUnits` at a CMS fetch instead of
a static array, and every page that imports from `content/business-units.ts`
keeps working unchanged.

## Stack

Next.js 16 (App Router, Turbopack, TypeScript strict), Tailwind CSS v4
(CSS-first `@theme` config, no `src/` directory), Zod for form validation,
Resend for outbound email (behind `lib/mailer.ts`), self-hosted fonts via
`next/font` (Archivo + Source Serif 4).
