'use server'

import { getEmailConfig, sendEmailOrThrow, contactFormEmail, contactAutoReplyEmail } from '@/lib/email'

export async function submitContactForm(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const name = data.name.trim()
  const email = data.email.trim().toLowerCase()
  const subject = data.subject.trim()
  const message = data.message.trim()
  const phone = data.phone?.trim()

  if (!name || !email || !subject || !message) {
    throw new Error('Please fill in all required fields')
  }

  if (!email.includes('@')) {
    throw new Error('Please enter a valid email address')
  }

  const config = getEmailConfig()
  const staff = contactFormEmail({ name, email, phone, subject, message })
  const autoReply = contactAutoReplyEmail({ name })

  await sendEmailOrThrow({
    to: config.contactInbox,
    replyTo: email,
    ...staff,
  })

  await sendEmailOrThrow({
    to: email,
    ...autoReply,
  })

  return { success: true }
}
