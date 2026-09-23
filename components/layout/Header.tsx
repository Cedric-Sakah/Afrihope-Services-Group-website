"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { businessUnits } from "@/content/business-units";

/**
 * Sticky site header. Condenses padding on scroll, exposes a hover/click
 * dropdown for the seven business units on desktop, and a keyboard-operable
 * mobile drawer (focus-trapped, ESC to close, aria-expanded kept in sync).
 *
 * The two "fixed" overlays (the dropdown's scrim and the mobile drawer) are
 * rendered as siblings of <header>, not nested inside it. <header> carries
 * `backdrop-blur`, and `backdrop-filter` (like `filter`/`transform`) makes
 * an element the containing block for any `position: fixed` descendant —
 * nesting a full-screen `fixed inset-0` overlay inside it means "fixed"
 * resolves against the header's own small box instead of the viewport,
 * squeezing the overlay into the navbar and forcing it to scroll internally.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Header is part of the root layout, so it stays mounted across route
  // changes — its open/closed state doesn't reset on its own. Force both
  // the drawer and the dropdown closed on every navigation, however it was
  // triggered (link click, back/forward button, etc.), so neither can be
  // left stuck open on the new page. Adjusted during render (React's
  // documented pattern for resetting state in response to a changed value)
  // rather than in an effect, which would cost an extra cascading render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setUnitsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!unitsOpen) return;
    function onClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUnitsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [unitsOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setUnitsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const drawer = mobileDrawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();

    function onKeydown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    drawer?.addEventListener("keydown", onKeydown);
    return () => {
      document.body.style.overflow = "";
      drawer?.removeEventListener("keydown", onKeydown);
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur transition-[padding] duration-200 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Container className="flex items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="nav-sweep text-sm font-medium text-ink hover:text-teal">
              Home
            </Link>
            <Link href="/about" className="nav-sweep text-sm font-medium text-ink hover:text-teal">
              About us
            </Link>

            <div
              ref={dropdownRef}
              className="relative"
              onBlur={(event) => {
                // Close once focus leaves the button+panel entirely (e.g.
                // Tab past the last link) — without this, tabbing away left
                // the panel floating open over the page underneath it.
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  setUnitsOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={unitsOpen}
                aria-haspopup="true"
                onClick={() => setUnitsOpen((value) => !value)}
                className="nav-sweep flex items-center gap-1 text-sm font-medium text-ink hover:text-teal"
              >
                Business units
                <svg
                  aria-hidden
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  className={`transition-transform duration-150 ${unitsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 6L10 0" fill="currentColor" />
                </svg>
              </button>
              {unitsOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-72 border border-rule bg-white py-2">
                  {businessUnits.map((unit) => (
                    <Link
                      key={unit.slug}
                      href={`/business-units/${unit.slug}`}
                      onClick={() => setUnitsOpen(false)}
                      className="block px-4 py-2 text-sm text-ink hover:bg-mist hover:text-teal"
                    >
                      {unit.name}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-rule pt-1">
                    <Link
                      href="/business-units"
                      onClick={() => setUnitsOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-teal hover:bg-mist"
                    >
                      View all business units
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="nav-sweep text-sm font-medium text-ink hover:text-teal">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" className="text-xs">
              Get in touch
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-button p-2.5 text-ink lg:hidden"
          >
            <span className="sr-only">Open menu</span>
            <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </Container>
      </header>

      {/* Scrim behind the open dropdown — without it, the panel floated
          directly over the page content underneath (e.g. the Home hero
          heading) with nothing to signal it was an intentional overlay
          rather than a rendering glitch. */}
      {unitsOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/20"
          aria-hidden
          onClick={() => setUnitsOpen(false)}
        />
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div
            id="mobile-menu"
            ref={mobileDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center p-2.5 text-ink"
              >
                <span className="sr-only">Close menu</span>
                <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule py-3 text-lg font-medium text-ink"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule py-3 text-lg font-medium text-ink"
              >
                About us
              </Link>
              <span className="pt-3 text-sm font-medium text-ink-muted">Business units</span>
              {businessUnits.map((unit) => (
                <Link
                  key={unit.slug}
                  href={`/business-units/${unit.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-rule py-3 pl-4 text-base text-ink"
                >
                  {unit.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="border-b border-rule py-3 text-lg font-medium text-ink"
              >
                Contact
              </Link>
            </nav>
            <div className="mt-8">
              <Button href="/contact" className="w-full">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
