'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { createBooking } from '@/app/actions/bookings'
import { confirmPayment } from '@/app/actions/payments'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  clearBookingDraft,
  loadBookingDraft,
  type BookingDraft,
} from '@/lib/booking-draft'
import { AlertCircle, CheckCircle, CreditCard, Mail, Shield } from 'lucide-react'

export function BookPayClient() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [draft, setDraft] = useState<BookingDraft | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'review' | 'processing' | 'done'>('review')

  useEffect(() => {
    const stored = loadBookingDraft()
    if (!stored) {
      router.replace('/book')
      return
    }
    setDraft(stored)
  }, [router])

  if (isPending || !draft) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center text-muted-foreground">
        Loading your reservation…
      </div>
    )
  }

  const emailVerified = session?.user?.emailVerified ?? false
  const tax = draft.totalPrice * 0.1
  const grandTotal = draft.totalPrice + tax

  const handleConfirm = async () => {
    setError('')
    setLoading(true)
    setStep('processing')

    try {
      const bookingId = await createBooking({
        accommodationId: draft.accommodationId,
        checkInDate: draft.checkInDate,
        checkOutDate: draft.checkOutDate,
        totalPrice: grandTotal,
        specialRequests: draft.specialRequests,
      })

      await confirmPayment(bookingId, `mock_${Date.now()}`)
      clearBookingDraft()
      setStep('done')
      router.push(`/book/confirmation/${bookingId}`)
    } catch (err) {
      setStep('review')
      const message = err instanceof Error ? err.message : 'Payment failed'
      if (message.includes('Email verification')) {
        setError('Please verify your email before completing payment.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!session?.user) {
    return null
  }

  if (!emailVerified) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4">
        <Card className="p-8 text-center">
          <Mail className="size-12 text-amber-600 mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold mb-2">Verify your email</h1>
          <p className="text-muted-foreground mb-6">
            Email verification is required before we can confirm your safari booking.
            Check your inbox for the link we sent when you signed up.
          </p>
          <Link href={`/auth/verify-email?callbackUrl=${encodeURIComponent('/book/pay')}`}>
            <Button className="w-full mb-3">Resend verification email</Button>
          </Link>
          <Link href="/book">
            <Button variant="outline" className="w-full">
              Back to booking
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Step 2 of 2
        </p>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          Review &amp; pay
        </h1>
        <p className="text-muted-foreground mt-2">
          Signed in as {session.user.email}
        </p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">{draft.accommodationName}</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Check-in</dt>
            <dd className="font-medium">{new Date(draft.checkInDate).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Check-out</dt>
            <dd className="font-medium">{new Date(draft.checkOutDate).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-3">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>${draft.totalPrice.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Taxes &amp; fees</dt>
            <dd>${tax.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between text-base font-bold border-t border-border pt-3">
            <dt>Total</dt>
            <dd className="text-primary">${grandTotal.toFixed(2)}</dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6 mb-6 bg-muted/30">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Secure checkout</p>
            Payment is simulated for MVP. Your booking will be confirmed immediately
            after you complete this step.
          </div>
        </div>
      </Card>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-2">
          <AlertCircle className="size-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        className="w-full py-6 text-base gap-2"
        disabled={loading || step === 'processing'}
        onClick={handleConfirm}
      >
        <CreditCard className="size-5" />
        {loading ? 'Processing payment…' : `Pay $${grandTotal.toFixed(2)} & confirm`}
      </Button>

      <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
        <CheckCircle className="size-3.5" />
        Email verified · Ready to book
      </p>
    </div>
  )
}
