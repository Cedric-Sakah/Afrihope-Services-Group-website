import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type CTABlockProps = {
  heading: ReactNode;
  body?: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** "dark" is a full-bleed teal-deep band; "light" sits on the page background. */
  tone?: "dark" | "light";
  /**
   * When this block follows another dark section directly (e.g. the
   * positioning statement), a full top padding stacks two gaps into one
   * dead-space gulf. Set this to trade that top padding for a hairline
   * divider instead, keeping the two dark passages as one visual block.
   */
  precededByDarkSection?: boolean;
};

export function CTABlock({
  heading,
  body,
  ctaLabel,
  ctaHref,
  tone = "dark",
  precededByDarkSection = false,
}: CTABlockProps) {
  const isDark = tone === "dark";
  const topSpacing =
    isDark && precededByDarkSection
      ? "border-t border-white/15 pt-12 pb-16 sm:pt-16 sm:pb-24"
      : "py-16 sm:py-24";
  return (
    <section className={isDark ? `bg-teal-deep ${topSpacing}` : topSpacing}>
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
        <div className="max-w-2xl">
          <h2
            className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
              isDark ? "text-white" : "text-ink"
            }`}
          >
            {heading}
          </h2>
          {body && (
            <p className={`measure mt-4 text-lg leading-relaxed ${isDark ? "text-white/80" : "text-ink-muted"}`}>
              {body}
            </p>
          )}
        </div>
        <Button href={ctaHref} variant={isDark ? "inverted" : "primary"} className="shrink-0">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
