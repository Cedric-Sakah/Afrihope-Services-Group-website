import { site } from "@/content/site";

/**
 * Group contact details — phone/WhatsApp numbers, email, and (once
 * confirmed) the physical office address. See content/site.ts for the
 * address TODO(client).
 */
export function ContactDetails() {
  return (
    <dl className="space-y-6">
      <div>
        <dt className="font-display text-sm font-semibold text-ink">Email</dt>
        <dd className="mt-1">
          <a href={`mailto:${site.contact.email}`} className="text-lg text-teal hover:text-teal-deep">
            {site.contact.email}
          </a>
        </dd>
      </div>

      <div>
        <dt className="font-display text-sm font-semibold text-ink">Phone / WhatsApp</dt>
        <dd className="mt-1 space-y-1">
          {site.contact.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="block text-lg text-teal hover:text-teal-deep"
            >
              {phone}
            </a>
          ))}
        </dd>
      </div>

      {site.contact.address && (
        <div>
          <dt className="font-display text-sm font-semibold text-ink">Office</dt>
          <dd className="mt-1 text-lg text-ink-muted">{site.contact.address}</dd>
        </div>
      )}
      {/* TODO(client): confirm the physical office address, then it will
          render automatically above once content/site.ts is updated. */}
    </dl>
  );
}
