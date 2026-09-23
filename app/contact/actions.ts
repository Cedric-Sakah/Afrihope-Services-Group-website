"use server";

import { headers } from "next/headers";
import { enquirySchema, GENERAL_ENQUIRY_VALUE } from "@/lib/schemas/enquiry";
import { type EnquiryFormState } from "@/lib/schemas/enquiry-state";
import { getBusinessUnitBySlug } from "@/content/business-units";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mailer";

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    unit: formData.get("unit")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but never send the message or touch the mailer.
  if (raw.company) {
    return {
      success: true,
      message: "Thanks — we've received your enquiry and will be in touch shortly.",
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return {
      success: false,
      message: "You've submitted a few requests already — please wait a few minutes and try again.",
    };
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { name, email, phone, unit, message } = parsed.data;
  const unitLabel =
    unit === GENERAL_ENQUIRY_VALUE ? "General enquiry" : (getBusinessUnitBySlug(unit)?.name ?? unit);

  const result = await sendMail({
    subject: `New enquiry: ${unitLabel} — ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Business unit: ${unitLabel}`,
      "",
      message,
    ].join("\n"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Something went wrong on our end — please try again shortly, or email us directly.",
    };
  }

  return {
    success: true,
    message: "Thanks — we've received your enquiry and will be in touch shortly.",
  };
}
