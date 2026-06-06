export type OutboundEmail = {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

export type SendEmailResult = {
  success: boolean
  provider: 'mailjet' | 'gmail' | 'log'
  error?: string
}
