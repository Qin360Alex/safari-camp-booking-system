import type { EmailConfig } from '../config'
import type { OutboundEmail } from '../types'

export async function sendViaMailjet(
  config: EmailConfig,
  message: OutboundEmail
): Promise<void> {
  const { apiKey, apiSecret } = config.mailjet

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: config.fromEmail,
            Name: config.fromName,
          },
          To: [{ Email: message.to }],
          Subject: message.subject,
          TextPart: message.text,
          HTMLPart: message.html,
          ...(message.replyTo
            ? { ReplyTo: { Email: message.replyTo } }
            : {}),
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(
      `Mailjet error ${response.status}${body ? `: ${body.slice(0, 200)}` : ''}`
    )
  }
}
