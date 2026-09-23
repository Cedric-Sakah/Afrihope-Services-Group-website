import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Set on dark backgrounds (e.g. footer, dark-teal bands) to flip contrast. */
  inverted?: boolean;
};

/**
 * Text-wordmark stand-in for the Afrihope Group logo — see brief §11.
 * This is the single swap point: once real logo SVGs exist, replace the
 * markup below with an <Image> or inline <svg> and every caller updates
 * automatically.
 */
export function Logo({ className = "", inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-display inline-flex flex-col leading-none font-bold tracking-tight ${className}`}
      aria-label="Afrihope Group — home"
    >
      <span className="text-xl sm:text-2xl">
        <span className={inverted ? "text-amber-bright" : "text-amber"}>Afri</span>
        <span className={inverted ? "text-white" : "text-ink"}>Hope</span>
      </span>
      <span
        aria-hidden
        className={`mt-1 h-[3px] w-10 ${inverted ? "bg-amber-bright" : "bg-teal"}`}
      />
    </Link>
  );
}
