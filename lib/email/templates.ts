export type OutboundEmail = {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

const BRAND = {
  primary: '#8B4513',
  accent: '#D4A574',
  dark: '#1a1a1a',
  muted: '#6b7280',
}

function layout(content: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Safari Camp Lodge</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ec;font-family:Georgia,'Times New Roman',serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1ec;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:${BRAND.primary};padding:28px 32px;text-align:center;">
              <p style="margin:0;color:#fff;font-size:22px;font-weight:bold;letter-spacing:0.5px;">Safari Camp Lodge</p>
              <p style="margin:8px 0 0;color:${BRAND.accent};font-size:13px;font-family:Arial,sans-serif;">Luxury African Safari</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;font-family:Arial,Helvetica,sans-serif;color:${BRAND.dark};font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#faf9f7;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;font-size:12px;color:${BRAND.muted};font-family:Arial,sans-serif;">
                © ${new Date().getFullYear()} Safari Camp Lodge · Maasai Mara, Kenya
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px auto;">
    <tr>
      <td style="border-radius:8px;background:${BRAND.primary};">
        <a href="${href}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;border-radius:8px;">${label}</a>
      </td>
    </tr>
  </table>`
}

export function verificationEmail(params: {
  name: string
  url: string
}): Pick<OutboundEmail, 'subject' | 'text' | 'html'> {
  const greeting = params.name ? `Hi ${params.name},` : 'Hi there,'
  const subject = 'Verify your Safari Camp Lodge email'
  const text = `${greeting}

Please verify your email address to complete bookings at Safari Camp Lodge:

${params.url}

If you did not create an account, you can safely ignore this email.

— Safari Camp Team`

  const html = layout(
    `
    <p style="margin:0 0 16px;">${greeting}</p>
    <p style="margin:0 0 8px;color:${BRAND.muted};">Welcome to Safari Camp Lodge. Confirm your email to secure your safari bookings and manage your reservations.</p>
    ${button(params.url, 'Verify email address')}
    <p style="margin:0;font-size:13px;color:${BRAND.muted};">Or copy this link into your browser:<br/><a href="${params.url}" style="color:${BRAND.primary};word-break:break-all;">${params.url}</a></p>
    <p style="margin:24px 0 0;font-size:13px;color:${BRAND.muted};">If you did not sign up, you can ignore this message.</p>
  `,
    'Verify your email to complete safari bookings'
  )

  return { subject, text, html }
}

export function bookingConfirmationEmail(params: {
  name: string
  bookingId: string
  checkIn: string
  checkOut: string
  total: string
  dashboardUrl: string
}): Pick<OutboundEmail, 'subject' | 'text' | 'html'> {
  const subject = `Booking confirmed — Safari Camp Lodge (#${params.bookingId.slice(0, 8)})`
  const text = `Hi ${params.name},

Your safari booking is confirmed!

Booking reference: ${params.bookingId}
Check-in: ${params.checkIn}
Check-out: ${params.checkOut}
Total: ${params.total}

View your booking: ${params.dashboardUrl}

We look forward to welcoming you to the bush.

— Safari Camp Team`

  const html = layout(
    `
    <p style="margin:0 0 16px;">Hi ${params.name},</p>
    <p style="margin:0 0 20px;font-size:17px;font-weight:bold;color:${BRAND.primary};">Your safari booking is confirmed!</p>
    <table role="presentation" width="100%" style="background:#faf9f7;border-radius:8px;padding:20px;margin-bottom:24px;">
      <tr><td style="padding:4px 0;font-size:13px;color:${BRAND.muted};">Reference</td></tr>
      <tr><td style="padding:4px 0;font-family:monospace;font-size:14px;">${params.bookingId}</td></tr>
      <tr><td style="padding:12px 0 4px;font-size:13px;color:${BRAND.muted};">Dates</td></tr>
      <tr><td style="padding:4px 0;">${params.checkIn} → ${params.checkOut}</td></tr>
      <tr><td style="padding:12px 0 4px;font-size:13px;color:${BRAND.muted};">Total paid</td></tr>
      <tr><td style="padding:4px 0;font-size:18px;font-weight:bold;color:${BRAND.primary};">${params.total}</td></tr>
    </table>
    ${button(params.dashboardUrl, 'View my booking')}
  `,
    `Booking confirmed — ${params.checkIn} to ${params.checkOut}`
  )

  return { subject, text, html }
}

export function contactFormEmail(params: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Pick<OutboundEmail, 'subject' | 'text' | 'html'> {
  const subject = `[Contact] ${params.subject}`
  const text = `New contact form submission

From: ${params.name} <${params.email}>
Phone: ${params.phone || '—'}
Subject: ${params.subject}

Message:
${params.message}`

  const html = layout(
    `
    <p style="margin:0 0 8px;font-weight:bold;">New contact form message</p>
    <table role="presentation" width="100%" style="font-size:14px;">
      <tr><td style="padding:6px 0;color:${BRAND.muted};width:100px;">From</td><td>${params.name} &lt;${params.email}&gt;</td></tr>
      <tr><td style="padding:6px 0;color:${BRAND.muted};">Phone</td><td>${params.phone || '—'}</td></tr>
      <tr><td style="padding:6px 0;color:${BRAND.muted};">Subject</td><td>${params.subject}</td></tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#faf9f7;border-radius:8px;white-space:pre-wrap;">${params.message.replace(/</g, '&lt;')}</div>
  `,
    `Contact from ${params.name}: ${params.subject}`
  )

  return { subject, text, html }
}

export function contactAutoReplyEmail(params: {
  name: string
}): Pick<OutboundEmail, 'subject' | 'text' | 'html'> {
  const subject = 'We received your message — Safari Camp Lodge'
  const text = `Hi ${params.name},

Thank you for contacting Safari Camp Lodge. Our team has received your message and will respond within one business day.

— Safari Camp Team`

  const html = layout(
    `
    <p style="margin:0 0 16px;">Hi ${params.name},</p>
    <p style="margin:0;">Thank you for reaching out. Our concierge team has received your message and will get back to you within one business day.</p>
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:14px;">For urgent safari enquiries, please call us directly.</p>
  `,
    'We received your message'
  )

  return { subject, text, html }
}
