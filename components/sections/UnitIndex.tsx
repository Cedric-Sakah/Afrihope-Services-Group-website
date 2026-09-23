import Link from "next/link";
import Image from "next/image";
import { type BusinessUnit } from "@/content/business-units";

type UnitIndexProps = {
  units: BusinessUnit[];
  className?: string;
};

export function UnitIndex({ units, className = "" }: UnitIndexProps) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {units.map((unit, index) => (
        <Link
          key={unit.slug}
          href={`/business-units/${unit.slug}`}
          className="unit-card group overflow-hidden border border-rule bg-white transition duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-[0_16px_35px_rgba(8,75,70,0.12)] focus-visible:-translate-y-1 focus-visible:border-teal focus-visible:shadow-[0_16px_35px_rgba(8,75,70,0.12)]"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={unit.image.src}
              alt={unit.image.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="unit-card-image object-cover"
            />
            <span className="absolute left-4 top-4 bg-amber px-2 py-1 font-display text-xs font-bold uppercase tracking-[0.14em] text-ink">
              0{index + 1}
            </span>
          </div>
          <div className="p-5 sm:p-6">
            <span className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-teal">
              {unit.name}
            </span>
            <span className="mt-2 block text-sm font-medium text-teal">{unit.offering}</span>
            <span className="mt-3 block text-base leading-relaxed text-ink-muted">
              {unit.tagline}
            </span>
            <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-ink">
              Explore unit <span aria-hidden className="text-lg text-amber">-&gt;</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
