import { type CoreValue } from "@/content/site";

/**
 * Renders the five core values as scannable statements — the same ruled,
 * two-column idiom as UnitIndex (name / description), not a separate
 * numbered-list device. The values aren't a sequence, so nothing here
 * implies rank or order.
 */
export function ValueList({ values, className = "" }: { values: CoreValue[]; className?: string }) {
  return (
    <ul className={`divide-y divide-rule border-y border-rule ${className}`}>
      {values.map((value) => (
        <li key={value.name} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-6 sm:py-8">
          <span className="font-display text-xl font-semibold tracking-tight text-ink sm:col-span-3">
            {value.name}
          </span>
          <p className="measure text-base leading-relaxed text-ink-muted sm:col-span-9">
            {value.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
