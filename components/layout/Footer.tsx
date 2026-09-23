import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { site, footerNav } from "@/content/site";
import { businessUnits } from "@/content/business-units";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-mist">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="measure mt-4 text-sm leading-relaxed text-ink-muted">
            {site.mottoShort}
          </p>

          {site.socials.length > 0 && (
            <ul className="mt-6 flex items-center gap-4">
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    className="text-sm text-ink-muted hover:text-teal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-ink">Quick links</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-muted hover:text-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-ink">Business units</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {businessUnits.map((unit) => (
              <li key={unit.slug}>
                <Link
                  href={`/business-units/${unit.slug}`}
                  className="text-sm text-ink-muted hover:text-teal"
                >
                  {unit.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-ink">Contact</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-muted">
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-teal">
                {site.contact.email}
              </a>
            </li>
            {site.contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-teal">
                  {phone}
                </a>
              </li>
            ))}
            {/* TODO(client): physical office address — see content/site.ts */}
          </ul>
        </div>
      </Container>

      <div className="border-t border-rule">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>© {year} Afrihope Group. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
