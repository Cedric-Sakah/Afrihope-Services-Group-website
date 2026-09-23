import { type ReactNode } from "react";

type SectionHeadingProps = {
  /** Rendered as the heading element — pass level to keep hierarchy correct per page. */
  children: ReactNode;
  level?: "h1" | "h2" | "h3";
  lede?: ReactNode;
  className?: string;
  /** Draws a short teal rule above the heading instead of an eyebrow label. */
  withRule?: boolean;
};

export function SectionHeading({
  children,
  level = "h2",
  lede,
  className = "",
  withRule = false,
}: SectionHeadingProps) {
  const Heading = level;
  const sizeClasses =
    level === "h1"
      ? "text-4xl sm:text-5xl lg:text-6xl"
      : level === "h2"
        ? "text-3xl sm:text-4xl"
        : "text-2xl sm:text-3xl";

  return (
    <div className={className}>
      {withRule && <span aria-hidden className="mb-4 block h-px w-16 bg-teal" />}
      <Heading
        className={`font-display font-semibold tracking-tight text-ink ${sizeClasses}`}
      >
        {children}
      </Heading>
      {lede && (
        <p className="measure mt-4 text-lg leading-relaxed text-ink-muted">{lede}</p>
      )}
    </div>
  );
}
