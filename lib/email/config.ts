export type EmailProvider = 'mailjet' | 'gmail' | 'log'

export type EmailConfig = {
  fromEmail: string
  fromName: string
  mailjet: {
    apiKey: string
    apiSecret: string
    enabled: boolean
  }
  gmail: {
    user: string
    appPassword: string
    fromEmail: string
    enabled: boolean
  }
  contactInbox: string
  sendInDev: boolean
  forceProvider: EmailProvider | null
}

function envFlag(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes'
}

export function getEmailConfig(): EmailConfig {
  const mailjetApiKey = process.env.MAILJET_API_KEY?.trim() ?? ''
  const mailjetApiSecret = process.env.MAILJET_API_SECRET?.trim() ?? ''
  const gmailUser = process.env.GMAIL_USER?.trim() ?? ''
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim() ?? ''

  const fromEmail =
    process.env.MAILJET_FROM_EMAIL?.trim() ||
    process.env.GMAIL_FROM_EMAIL?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    gmailUser ||
    'hello@safaricamplodge.com'

  const fromName =
    process.env.MAILJET_FROM_NAME?.trim() ||
    process.env.EMAIL_FROM_NAME?.trim() ||
    'Safari Camp Lodge'

  const forceRaw = process.env.EMAIL_FORCE_PROVIDER?.trim().toLowerCase()
  const forceProvider: EmailProvider | null =
    forceRaw === 'mailjet' || forceRaw === 'gmail' || forceRaw === 'log'
      ? forceRaw
      : null

  return {
    fromEmail,
    fromName,
    mailjet: {
      apiKey: mailjetApiKey,
      apiSecret: mailjetApiSecret,
      enabled: Boolean(mailjetApiKey && mailjetApiSecret),
    },
    gmail: {
      user: gmailUser,
      appPassword: gmailAppPassword,
      fromEmail: process.env.GMAIL_FROM_EMAIL?.trim() || gmailUser || fromEmail,
      enabled: Boolean(gmailUser && gmailAppPassword),
    },
    contactInbox:
      process.env.CONTACT_INBOX_EMAIL?.trim() ||
      process.env.MAILJET_FROM_EMAIL?.trim() ||
      'hello@safaricamplodge.com',
    sendInDev: envFlag('EMAIL_SEND_IN_DEV'),
    forceProvider,
  }
}

export function isEmailConfigured(): boolean {
  const cfg = getEmailConfig()
  return cfg.mailjet.enabled || cfg.gmail.enabled
}

export function shouldSendRealEmail(): boolean {
  const cfg = getEmailConfig()
  if (cfg.forceProvider === 'log') return false
  if (!isEmailConfigured()) return false
  if (process.env.NODE_ENV === 'production') return true
  return cfg.sendInDev
}
