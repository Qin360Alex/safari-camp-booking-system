'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

// Initialize payment session
export async function initiatePayment(bookingId: string, amount: number) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')

  try {
    // In a real app, this would call Stripe or M-Pesa API
    // For now, we'll create a mock payment intent
    const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return {
      success: true,
      paymentIntentId,
      amount,
      bookingId,
      clientSecret: `${paymentIntentId}_secret_${Math.random().toString(36).substr(2, 12)}`,
      // In production, this would be a Stripe client secret or M-Pesa session token
    }
  } catch (error) {
    console.error('Payment initiation error:', error)
    throw new Error('Failed to initiate payment')
  }
}

// Confirm payment and update booking
export async function confirmPayment(bookingId: string, paymentIntentId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')

  try {
    // Update booking status to paid
    await db
      .update(bookings)
      .set({
        paymentStatus: 'paid',
        status: 'confirmed',
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId))

    return { success: true, message: 'Payment confirmed' }
  } catch (error) {
    console.error('Payment confirmation error:', error)
    throw new Error('Failed to confirm payment')
  }
}

// Get payment status
export async function getPaymentStatus(bookingId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')

  try {
    const booking = await db
      .select({
        id: bookings.id,
        paymentStatus: bookings.paymentStatus,
        totalPrice: bookings.totalPrice,
      })
      .from(bookings)
      .where(eq(bookings.id, bookingId))

    if (!booking.length) throw new Error('Booking not found')

    return booking[0]
  } catch (error) {
    console.error('Payment status error:', error)
    throw new Error('Failed to get payment status')
  }
}

// Mock M-Pesa payment handler
export async function initiateM2MPayment(bookingId: string, phone: string, amount: number) {
  try {
    // In a real app, this would call M-Pesa STK Push API
    const transactionId = `M2M_${Date.now()}`

    return {
      success: true,
      transactionId,
      bookingId,
      phone,
      amount,
      message: 'M-Pesa prompt sent to your phone',
    }
  } catch (error) {
    console.error('M2M payment error:', error)
    throw new Error('Failed to initiate M-Pesa payment')
  }
}

// Mock email notification
export async function sendConfirmationEmail(bookingId: string, userEmail: string) {
  try {
    // In a real app, this would integrate with SendGrid, Resend, or similar
    console.log(`[EMAIL] Confirmation sent to ${userEmail} for booking ${bookingId}`)

    return {
      success: true,
      message: 'Confirmation email sent',
    }
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error('Failed to send confirmation email')
  }
}
