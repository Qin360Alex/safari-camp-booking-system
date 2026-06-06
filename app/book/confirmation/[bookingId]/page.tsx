'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getBookingById } from '@/app/actions/bookings'
import {
  CheckCircle,
  Download,
  Calendar,
  MapPin,
  Users,
  AlertCircle,
  Mail,
  Phone,
} from 'lucide-react'

interface Booking {
  id: string
  status: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  paymentStatus: string
  accommodationName?: string
  specialRequests?: string
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.bookingId as string

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await getBookingById(bookingId)
        if (!data) {
          setError('Booking not found')
          return
        }
        setBooking(data)
      } catch (err) {
        setError('Failed to load booking confirmation')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  const nights =
    booking && new Date(booking.checkOutDate) > new Date(booking.checkInDate)
      ? Math.ceil(
          (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <p className="text-muted-foreground">Loading confirmation...</p>
        </Card>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-12 text-center max-w-md">
          <AlertCircle className="size-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Link href="/">
            <Button className="w-full">Back to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl"></div>
              <div className="relative bg-white rounded-full p-4 border-4 border-green-400">
                <CheckCircle className="size-12 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your safari adventure has been successfully booked
          </p>
        </div>

        {/* Confirmation Number */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Booking Reference Number</p>
            <p className="text-3xl font-mono font-bold text-primary">{bookingId.slice(0, 12).toUpperCase()}...</p>
            <p className="text-xs text-muted-foreground">
              Save this number for your records
            </p>
          </div>
        </Card>

        {/* What&apos;s Next */}
        <Card className="p-8">
          <h2 className="text-xl font-serif font-bold text-foreground mb-6">What&apos;s Next</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve sent a detailed confirmation email to your inbox with all booking details
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Complete Payment</h3>
                <p className="text-sm text-muted-foreground">
                  {booking.paymentStatus === 'paid'
                    ? 'Your payment has been processed successfully'
                    : 'Click below to complete your payment and secure your reservation'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 text-primary font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Prepare for Your Trip</h3>
                <p className="text-sm text-muted-foreground">
                  Receive pre-trip information, packing lists, and safari tips closer to your departure date
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Summary */}
        <Card className="p-8">
          <h2 className="text-xl font-serif font-bold text-foreground mb-6">Booking Summary</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-foreground mb-3">{booking.accommodationName || 'Safari Experience'}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>
                    {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    to{' '}
                    {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="size-4" />
                  <span>{nights} night{nights !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                <p className="text-sm font-semibold text-foreground mb-2">Special Requests</p>
                <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
              </div>
            )}

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ${Math.round(booking.totalPrice * 0.9)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="font-semibold text-foreground">
                  ${Math.round(booking.totalPrice * 0.1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-3xl font-serif font-bold text-primary">
                  ${booking.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-8 bg-secondary/5 border-secondary/20">
          <h2 className="text-lg font-bold text-foreground mb-4">Need Help?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Mail className="size-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">Email Us</p>
                <p className="text-sm text-muted-foreground">
                  bookings@safaricamp.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="size-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => window.print()}
          >
            <Download className="size-4" />
            Print Confirmation
          </Button>
          <Link href={`/guest/bookings/${bookingId}`}>
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              View Booking Details
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
