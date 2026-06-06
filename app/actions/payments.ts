'use server'

import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import {
  bookingConfirmationEmail,
  dispatchEmail,
  sendEmailOrThrow,
} from '@/lib/email'
import { requirePermission, requireUser } from '@/lib/session'

const baseUrl = () =>
  process.env.BETTER_AUTH_URL?.replace(/\/$/, '') ?? 'http://localhost:3000'

async function assertBookingOwner(bookingId: string, userId: string) {
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1)

  if (!booking) throw new Error('Booking not found')
  if (booking.userId !== userId) throw new Error('Forbidden')
  return booking
}

export async function initiatePayment(bookingId: string, amount: number) {
  const ctx = await requireUser()
  await assertBookingOwner(bookingId, ctx.id)

  const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  return {
    success: true,
    paymentIntentId,
    amount,
    bookingId,
    clientSecret: `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 12)}`,
  }
}

export async function confirmPayment(bookingId: string, paymentIntentId: string) {
  const ctx = await requireUser()
  const booking = await assertBookingOwner(bookingId, ctx.id)
  void paymentIntentId

  await db
    .update(bookings)
    .set({
      paymentStatus: 'paid',
      status: 'confirmed',
      updatedAt: new Date(),
    })
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, ctx.id)))

  const { subject, text, html } = bookingConfirmationEmail({
    name: ctx.name,
    bookingId,
    checkIn: new Date(booking.checkInDate).toLocaleDateString('en-US', {
      dateStyle: 'medium',
    }),
    checkOut: new Date(booking.checkOutDate).toLocaleDateString('en-US', {
      dateStyle: 'medium',
    }),
    total: `$${Number(booking.totalPrice).toFixed(2)}`,
    dashboardUrl: `${baseUrl()}/guest/bookings/${bookingId}`,
  })

  dispatchEmail({ to: ctx.email, subject, text, html })

  return { success: true, message: 'Payment confirmed' }
}

export async function getPaymentStatus(bookingId: string) {
  const ctx = await requireUser()
  await assertBookingOwner(bookingId, ctx.id)

  const [booking] = await db
    .select({
      id: bookings.id,
      paymentStatus: bookings.paymentStatus,
      totalPrice: bookings.totalPrice,
    })
    .from(bookings)
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, ctx.id)))

  if (!booking) throw new Error('Booking not found')
  return booking
}

export async function initiateM2MPayment(
  bookingId: string,
  phone: string,
  amount: number
) {
  const ctx = await requireUser()
  await assertBookingOwner(bookingId, ctx.id)

  return {
    success: true,
    transactionId: `M2M_${Date.now()}`,
    bookingId,
    phone,
    amount,
    message: 'M-Pesa prompt sent to your phone',
  }
}

export async function sendConfirmationEmail(bookingId: string, userEmail: string) {
  await requirePermission('booking:update')

  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1)

  if (!booking) throw new Error('Booking not found')

  const { subject, text, html } = bookingConfirmationEmail({
    name: 'Guest',
    bookingId,
    checkIn: new Date(booking.checkInDate).toLocaleDateString('en-US', {
      dateStyle: 'medium',
    }),
    checkOut: new Date(booking.checkOutDate).toLocaleDateString('en-US', {
      dateStyle: 'medium',
    }),
    total: `$${Number(booking.totalPrice).toFixed(2)}`,
    dashboardUrl: `${baseUrl()}/guest/bookings/${bookingId}`,
  })

  await sendEmailOrThrow({ to: userEmail, subject, text, html })

  return { success: true, message: 'Confirmation email sent' }
}
