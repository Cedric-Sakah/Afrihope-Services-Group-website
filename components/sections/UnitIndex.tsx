import Link from "next/link";
import { type BusinessUnit } from "@/content/business-units";

type UnitIndexProps = {
  units: BusinessUnit[];
  className?: string;
};

/**
 * The organising device for the whole site: seven units under one mark,
 * presented as a full-width ruled index rather than a grid of identical
 * cards — see brief §4. Each row is one link; hairlines separate rows
 * instead of shadows or borders-as-cards. Deliberately text-only — the
 * photography budget is spent elsewhere (the home page's seven-slice
 * filmstrip), so this stays the one purely typographic device on the page.
 */
export function UnitIndex({ units, className = "" }: UnitIndexProps) {
  return (
    <div className={`divide-y divide-rule border-y border-rule ${className}`}>
      {units.map((unit) => (
        <Link
          key={unit.slug}
          href={`/business-units/${unit.slug}`}
          className="group grid grid-cols-1 gap-2 py-6 transition-colors hover:bg-mist focus-visible:bg-mist sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-8"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-teal sm:col-span-3">
            {unit.name}
          </span>
          <span className="text-sm text-ink-muted sm:col-span-3">{unit.offering}</span>
          <span className="text-base leading-relaxed text-ink-muted sm:col-span-6">
            {unit.tagline}
          </span>
        </Link>
      ))}
    </div>
  );
}
