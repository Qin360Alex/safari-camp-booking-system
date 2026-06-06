import nodemailer from 'nodemailer'
import type { EmailConfig } from '../config'
import type { OutboundEmail } from '../types'

let transporter: nodemailer.Transporter | null = null

function getTransporter(config: EmailConfig): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.gmail.user,
        pass: config.gmail.appPassword,
      },
    })
  }
  return transporter
}

export async function sendViaGmail(
  config: EmailConfig,
  message: OutboundEmail
): Promise<void> {
  const transport = getTransporter(config)

  await transport.sendMail({
    from: `"${config.fromName}" <${config.gmail.fromEmail}>`,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    replyTo: message.replyTo,
  })
}

export async function verifyGmailConnection(
  config: EmailConfig
): Promise<boolean> {
  try {
    await getTransporter(config).verify()
    return true
  } catch {
    return false
  }
}
