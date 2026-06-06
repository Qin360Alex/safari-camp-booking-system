'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getUserBookings } from '@/app/actions/bookings'
import { Calendar, MapPin, Users, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Booking {
  id: string
  status: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  accommodationName?: string
}

export default function GuestDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getUserBookings()
        setBookings(data || [])
      } catch (err) {
        setError('Failed to load bookings')
        console.error('Error fetching bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const upcomingBookings = bookings.filter(b => new Date(b.checkInDate) > new Date())
  const pastBookings = bookings.filter(b => new Date(b.checkOutDate) < new Date())

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="size-5 text-green-600" />
      case 'pending':
        return <Clock className="size-5 text-amber-600" />
      case 'cancelled':
        return <XCircle className="size-5 text-red-600" />
      default:
        return <AlertCircle className="size-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground mt-2">Manage your safari adventure reservations</p>
        </div>
        <Link href="/book">
          <Button className="bg-primary hover:bg-primary/90 px-6 py-3 text-base font-semibold">
            + New Booking
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      )}

      {error && (
        <Card className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="size-5 text-red-600" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </Card>
      )}

      {!loading && !error && bookings.length === 0 && (
        <Card className="p-12 text-center">
          <Calendar className="size-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">Start your safari adventure by creating your first booking</p>
          <Link href="/book">
            <Button className="bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </Card>
      )}

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">Upcoming Trips</h2>
          <div className="grid gap-4">
            {upcomingBookings.map((booking) => (
              <Link key={booking.id} href={`/guest/bookings/${booking.id}`}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer border-primary/20 hover:border-primary/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {getStatusIcon(booking.status)}
                        <span className="text-sm font-semibold text-muted-foreground">
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                        {booking.accommodationName || 'Safari Experience'}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="size-4" />
                          <span className="text-sm">
                            {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })} to {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end text-right">
                      <div className="text-3xl font-serif font-bold text-primary">
                        ${booking.totalPrice}
                      </div>
                      <Button variant="outline" className="mt-4">
                        View Details →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-foreground">Past Trips</h2>
          <div className="grid gap-4">
            {pastBookings.map((booking) => (
              <Link key={booking.id} href={`/guest/bookings/${booking.id}`}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer opacity-75 hover:opacity-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                        {booking.accommodationName || 'Safari Experience'}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="size-4" />
                        <span className="text-sm">
                          {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })} to {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end text-right">
                      <div className="text-2xl font-serif font-bold text-muted-foreground">
                        ${booking.totalPrice}
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        View Details →
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
