import { type ProofSlot as ProofSlotData, type ProofType } from "@/content/business-units";

const PROOF_LABELS: Record<ProofType, string> = {
  portfolio: "Case studies",
  fleet: "Fleet",
  "product-range": "Product range",
  "delivery-record": "Delivery record",
};

/**
 * Renders a unit's proof slot (portfolio, fleet, product range, delivery
 * record). Every unit currently has an honest empty state here — never
 * fabricate a case study, statistic, or client name to fill this in.
 * When real proof content exists for a unit, replace this with the actual
 * content while keeping the same heading.
 */
export function ProofSlot({ proof }: { proof: ProofSlotData }) {
  return (
    <div className="border border-rule bg-mist px-6 py-10 sm:px-10">
      <p className="font-display text-sm font-semibold text-ink">{PROOF_LABELS[proof.type]}</p>
      <p className="measure mt-2 text-base leading-relaxed text-ink-muted">
        {proof.emptyStateMessage}
      </p>
    </div>
  );
}
