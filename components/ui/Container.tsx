import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Use for full-bleed sections that still need padded content, e.g. dark bands. */
  as?: "div" | "section";
};

/**
 * Shared horizontal rhythm for the site. Every section's content sits inside
 * this container so the left edge lines up across the whole page — the
 * strict grid the design direction calls for.
 */
export function Container({ children, className = "", as = "div" }: ContainerProps) {
  const Tag = as;
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
