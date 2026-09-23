import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Kept for compatibility with existing call sites; the supplied logo asset is fixed. */
  inverted?: boolean;
};

export function Logo({ className = "", inverted: _inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Afrihope Group — home"
    >
      <Image
        src="/images/afrihope-logo.png"
        alt="Afrihope Group"
        width={312}
        height={86}
        priority
        className="h-8 w-auto sm:h-10"
      />
    </Link>
  );
}
