import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverted";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-deep focus-visible:bg-teal-deep",
  secondary:
    "border border-ink text-ink hover:border-teal hover:text-teal",
  ghost: "text-teal hover:text-teal-deep underline underline-offset-4",
  // For use on dark teal bands — a white fill reads as confident against
  // teal-deep and keeps text contrast well above AA (unlike amber-on-white
  // text, an amber *fill* with white text fails contrast at this size).
  inverted: "bg-white text-teal-deep hover:bg-mist",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 font-display text-sm font-semibold tracking-tight transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Renders as a Link when `href` is passed, otherwise as a native button.
 * Small radius (3px, via --radius-button) — the only rounded element in
 * the design system per the brief's "buttons only" rule.
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
