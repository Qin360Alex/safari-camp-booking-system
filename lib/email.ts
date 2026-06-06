/**
 * Safari Camp outbound email — Mailjet (primary) + Gmail SMTP (fallback).
 *
 * Configure via .env.local — see .env.example
 */
export {
  sendEmail,
  sendEmailOrThrow,
  dispatchEmail,
  getEmailConfig,
  isEmailConfigured,
  shouldSendRealEmail,
  verificationEmail,
  bookingConfirmationEmail,
  contactFormEmail,
  contactAutoReplyEmail,
} from './email/send'

export type { OutboundEmail, SendEmailResult } from './email/types'

import { dispatchEmail, verificationEmail } from './email/send'

export function sendVerificationEmailMessage({
  to,
  name,
  url,
}: {
  to: string
  name: string
  url: string
}): void {
  const { subject, text, html } = verificationEmail({ name, url })
  dispatchEmail({ to, subject, text, html })
}
