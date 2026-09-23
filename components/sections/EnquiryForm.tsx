"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import { GENERAL_ENQUIRY_VALUE } from "@/lib/schemas/enquiry";
import { initialEnquiryFormState } from "@/lib/schemas/enquiry-state";
import { Button } from "@/components/ui/Button";
import { type BusinessUnit } from "@/content/business-units";

const inputClasses =
  "w-full border border-rule bg-white px-4 py-3 text-base text-ink placeholder:text-ink-muted transition-colors focus:border-teal";

type EnquiryFormProps = {
  units: BusinessUnit[];
  /** Preselects the unit dropdown when arriving via /contact?unit=<slug>. */
  defaultUnit?: string;
};

/**
 * Enquiry form as a Server Action, progressively enhanced with
 * useActionState for inline validation and pending/success/error states.
 * Inputs are uncontrolled (defaultValue) so entered values survive a
 * failed submission without any extra state wiring.
 */
export function EnquiryForm({ units, defaultUnit }: EnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitEnquiry, initialEnquiryFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success, state.message]);

  const fieldError = (field: string) => state.fieldErrors?.[field];

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      {/* Honeypot — visually hidden, never presented to real visitors. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="min-h-6">
        {state.message && !state.fieldErrors && (
          <p className={`text-sm font-medium ${state.success ? "text-teal" : "text-amber"}`}>
            {state.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="font-display text-sm font-semibold text-ink">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={`mt-2 ${inputClasses}`}
          aria-invalid={Boolean(fieldError("name"))}
          aria-describedby="name-error"
        />
        <p id="name-error" className="mt-1 min-h-5 text-sm text-amber">
          {fieldError("name")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="font-display text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`mt-2 ${inputClasses}`}
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby="email-error"
          />
          <p id="email-error" className="mt-1 min-h-5 text-sm text-amber">
            {fieldError("email")}
          </p>
        </div>

        <div>
          <label htmlFor="phone" className="font-display text-sm font-semibold text-ink">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={`mt-2 ${inputClasses}`}
            aria-invalid={Boolean(fieldError("phone"))}
            aria-describedby="phone-error"
          />
          <p id="phone-error" className="mt-1 min-h-5 text-sm text-amber">
            {fieldError("phone")}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="unit" className="font-display text-sm font-semibold text-ink">
          Business unit of interest
        </label>
        <select
          id="unit"
          name="unit"
          required
          defaultValue={defaultUnit ?? ""}
          className={`mt-2 ${inputClasses}`}
          aria-invalid={Boolean(fieldError("unit"))}
          aria-describedby="unit-error"
        >
          <option value="" disabled>
            Select a business unit
          </option>
          {units.map((unit) => (
            <option key={unit.slug} value={unit.slug}>
              {unit.name}
            </option>
          ))}
          <option value={GENERAL_ENQUIRY_VALUE}>Not sure — general enquiry</option>
        </select>
        <p id="unit-error" className="mt-1 min-h-5 text-sm text-amber">
          {fieldError("unit")}
        </p>
      </div>

      <div>
        <label htmlFor="message" className="font-display text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`mt-2 ${inputClasses}`}
          aria-invalid={Boolean(fieldError("message"))}
          aria-describedby="message-error"
        />
        <p id="message-error" className="mt-1 min-h-5 text-sm text-amber">
          {fieldError("message")}
        </p>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
