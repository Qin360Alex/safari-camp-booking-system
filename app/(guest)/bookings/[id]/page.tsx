'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { getBookingById, cancelBooking } from '@/app/actions/bookings'
import {
  Calendar,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Edit,
  Trash2,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'

interface BookingDetail {
  id: string
  status: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  paymentStatus: string
  specialRequests?: string
  createdAt: string
  accommodationName?: string
  accommodationType?: string
  roomsBooked?: number
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)

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
        setError('Failed to load booking details')
        console.error('Error fetching booking:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return
    }

    setCancelling(true)
    try {
      await cancelBooking(bookingId)
      setBooking((prev) => (prev ? { ...prev, status: 'cancelled' } : null))
    } catch (err) {
      setError('Failed to cancel booking')
      console.error('Error cancelling booking:', err)
    } finally {
      setCancelling(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="size-6 text-green-600" />
      case 'pending':
        return <Clock className="size-6 text-amber-600" />
      case 'cancelled':
        return <XCircle className="size-6 text-red-600" />
      default:
        return <AlertCircle className="size-6 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Paid</span>
      case 'unpaid':
        return <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Pending Payment</span>
      case 'refunded':
        return <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Refunded</span>
      default:
        return <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{status}</span>
    }
  }

  const nights =
    booking && new Date(booking.checkOutDate) > new Date(booking.checkInDate)
      ? Math.ceil(
          (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: 'My Bookings', href: '/guest/dashboard' }, { label: `Booking ${bookingId.slice(0, 8)}...` }]} />

      <div className="flex items-center justify-between">
        <Link href="/guest/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Bookings
          </Button>
        </Link>
      </div>

      {loading && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading booking details...</p>
        </Card>
      )}

      {error && (
        <Card className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="size-5 text-red-600" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </Card>
      )}

      {!loading && booking && (
        <div className="space-y-6">
          {/* Booking Header */}
          <Card className="p-8 border-2 border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {getStatusIcon(booking.status)}
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Booking Status</p>
                  <h1 className="text-3xl font-serif font-bold text-foreground">{getStatusText(booking.status)}</h1>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Booking Reference</p>
                <p className="text-xl font-mono font-bold text-primary">{bookingId.slice(0, 12).toUpperCase()}...</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Check-in</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Check-out</p>
                <p className="text-lg font-semibold text-foreground">
                  {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Duration</p>
                <p className="text-lg font-semibold text-foreground">{nights} night{nights !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Rooms</p>
                <p className="text-lg font-semibold text-foreground">{booking.roomsBooked || 1}</p>
              </div>
            </div>
          </Card>

          {/* Accommodation Details */}
          <Card className="p-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Accommodation Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{booking.accommodationName || 'Safari Experience'}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="size-5" />
                    <span>{booking.accommodationType || 'Premium Accommodation'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="size-5" />
                    <span>For {booking.roomsBooked || 1} guest{booking.roomsBooked !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="size-5" />
                    <span>Booked on {new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-foreground mb-3">Special Requests</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{booking.specialRequests}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Pricing Summary */}
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Pricing Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">${Math.round(booking.totalPrice * 0.9)}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="font-semibold text-foreground">${Math.round(booking.totalPrice * 0.1)}</span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-xl font-bold text-foreground">Total</span>
                <span className="text-4xl font-serif font-bold text-primary">${booking.totalPrice}</span>
              </div>
              <div className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  {booking.paymentStatus === 'paid' ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <Clock className="size-5 text-amber-600" />
                  )}
                  <span className="font-semibold text-foreground">Payment Status</span>
                </div>
                {getPaymentStatusBadge(booking.paymentStatus)}
              </div>
            </div>
          </Card>

          {/* Actions */}
          {booking.status !== 'cancelled' && (
            <Card className="p-8 bg-secondary/5 border-secondary/20">
              <h2 className="text-lg font-bold text-foreground mb-4">Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="gap-2">
                  <Download className="size-4" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="gap-2">
                  <Edit className="size-4" />
                  Modify Booking
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-red-600 hover:text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleCancel}
                  disabled={cancelling}
                >
                  <Trash2 className="size-4" />
                  {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
