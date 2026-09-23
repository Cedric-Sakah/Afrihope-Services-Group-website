import { Resend } from "resend";

export type SendMailParams = {
  subject: string;
  /** Plain-text body — the enquiry form sends plain text, not HTML. */
  text: string;
  replyTo?: string;
};

export type SendMailResult = { success: true } | { success: false; error: string };

/**
 * Mail-sending abstraction so the provider can be swapped without touching
 * any calling code. Currently backed by Resend; set RESEND_API_KEY,
 * MAIL_FROM_ADDRESS and MAIL_TO_ADDRESS in .env.local to enable real
 * sending. Without a configured API key, this logs the message to the
 * server console instead of throwing — safe for local development and
 * demos, but replace before launch.
 */
export async function sendMail({ subject, text, replyTo }: SendMailParams): Promise<SendMailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM_ADDRESS;
  const to = process.env.MAIL_TO_ADDRESS;

  if (!apiKey || !from || !to) {
    console.info(
      "[mailer] RESEND_API_KEY / MAIL_FROM_ADDRESS / MAIL_TO_ADDRESS not set — logging instead of sending.",
      { subject, text, replyTo },
    );
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo,
    });

    if (result.error) {
      console.error("[mailer] Resend returned an error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("[mailer] Failed to send mail:", error);
    return { success: false, error: "Failed to send message. Please try again shortly." };
  }
}
