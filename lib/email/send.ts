import {
  getEmailConfig,
  isEmailConfigured,
  shouldSendRealEmail,
} from './config'
import { sendViaGmail } from './providers/gmail'
import { sendViaMailjet } from './providers/mailjet'
import type { OutboundEmail, SendEmailResult } from './types'

function logEmailToConsole(message: OutboundEmail, reason: string): SendEmailResult {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📧 EMAIL (${reason})`)
  console.log(`   To: ${message.to}`)
  console.log(`   Subject: ${message.subject}`)
  if (message.replyTo) console.log(`   Reply-To: ${message.replyTo}`)
  console.log('   --- text preview ---')
  console.log(message.text.slice(0, 500))
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  return { success: true, provider: 'log' }
}

async function tryProvider(
  provider: 'mailjet' | 'gmail',
  config: ReturnType<typeof getEmailConfig>,
  message: OutboundEmail
): Promise<void> {
  if (provider === 'mailjet') {
    if (!config.mailjet.enabled) throw new Error('Mailjet not configured')
    await sendViaMailjet(config, message)
    return
  }
  if (!config.gmail.enabled) throw new Error('Gmail SMTP not configured')
  await sendViaGmail(config, message)
}

/**
 * Send email: Mailjet (primary) → Gmail SMTP (fallback) → console log (dev).
 * Does not throw — returns result so auth hooks stay non-blocking-safe.
 */
export async function sendEmail(message: OutboundEmail): Promise<SendEmailResult> {
  const config = getEmailConfig()

  if (config.forceProvider === 'log') {
    return logEmailToConsole(message, 'EMAIL_FORCE_PROVIDER=log')
  }

  if (!shouldSendRealEmail()) {
    if (!isEmailConfigured()) {
      return logEmailToConsole(message, 'no provider configured')
    }
    return logEmailToConsole(
      message,
      'dev mode — set EMAIL_SEND_IN_DEV=true to send live'
    )
  }

  const order: Array<'mailjet' | 'gmail'> = []
  if (config.forceProvider === 'mailjet' && config.mailjet.enabled) {
    order.push('mailjet')
  } else if (config.forceProvider === 'gmail' && config.gmail.enabled) {
    order.push('gmail')
  } else {
    if (config.mailjet.enabled) order.push('mailjet')
    if (config.gmail.enabled) order.push('gmail')
  }

  if (order.length === 0) {
    return logEmailToConsole(message, 'no provider configured')
  }

  const errors: string[] = []

  for (const provider of order) {
    try {
      await tryProvider(provider, config, message)
      return { success: true, provider }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(`${provider}: ${msg}`)
      console.error(`[email] ${provider} failed:`, msg)
    }
  }

  return {
    success: false,
    provider: order[order.length - 1],
    error: errors.join(' | '),
  }
}

/** Fire-and-forget wrapper for Better Auth (avoid timing attacks on await) */
export function dispatchEmail(message: OutboundEmail): void {
  void sendEmail(message).then((result) => {
    if (!result.success) {
      console.error('[email] dispatch failed:', result.error)
    }
  })
}

/** Throws on failure — use in server actions where the caller must know */
export async function sendEmailOrThrow(message: OutboundEmail): Promise<SendEmailResult> {
  const result = await sendEmail(message)
  if (!result.success) {
    throw new Error(result.error ?? 'Failed to send email')
  }
  return result
}

export { getEmailConfig, isEmailConfigured, shouldSendRealEmail } from './config'
export * from './templates'
