import { z } from "zod";
import { businessUnitSlugs } from "@/content/business-units";

/** "general" covers a visitor who isn't sure which unit fits yet. */
export const GENERAL_ENQUIRY_VALUE = "general";
export const enquiryUnitValues = [...businessUnitSlugs, GENERAL_ENQUIRY_VALUE];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(6, "Enter a valid phone number, including country code."),
  unit: z
    .string()
    .refine((value) => enquiryUnitValues.includes(value), {
      message: "Select the business unit you'd like to reach.",
    }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about what you need — at least 10 characters."),
  // Honeypot — real visitors never see or fill this field. Any value here
  // means the submission is almost certainly automated.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
