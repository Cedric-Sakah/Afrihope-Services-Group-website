import { site } from "@/content/site";

/**
 * Map embed for the office location. Renders nothing until a physical
 * address is confirmed — see content/site.ts's TODO(client) note.
 *
 * TODO(client): once the address is confirmed, replace the null return
 * below with a real embed (Google Maps iframe or similar), keyed off
 * site.contact.address.
 */
export function MapEmbed() {
  if (!site.contact.address) {
    return null;
  }

  return (
    <div className="aspect-[4/3] w-full border border-rule bg-mist">
      {/* Real map embed goes here once the address is confirmed. */}
    </div>
  );
}
