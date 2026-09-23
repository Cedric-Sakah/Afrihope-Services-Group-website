import { type CoreValue } from "@/content/site";

export function ValueList({ values, className = "" }: { values: CoreValue[]; className?: string }) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {values.map((value, index) => (
        <li
          key={value.name}
          className="value-card border border-rule bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-amber hover:shadow-[0_16px_35px_rgba(224,138,5,0.12)] sm:p-6"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <span className="flex h-11 w-11 items-center justify-center border border-amber font-display text-sm font-bold text-teal">
            0{index + 1}
          </span>
          <span className="mt-6 block font-display text-xl font-semibold tracking-tight text-ink">
            {value.name}
          </span>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {value.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
