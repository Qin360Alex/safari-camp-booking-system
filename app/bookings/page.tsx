'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getUserBookings } from '@/app/actions/bookings'
import Link from 'next/link'

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getUserBookings()
        setBookings(data)
      } catch (error) {
        console.error('Failed to fetch bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground mt-2">Manage your safari adventure reservations</p>
            </div>
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90">
                New Booking
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">No bookings yet</h2>
            <p className="text-muted-foreground mb-8">Start your African adventure by booking your first stay.</p>
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">Booking #{booking.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Price:</span>
                    <span className="font-semibold text-foreground">${Number(booking.totalPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className={booking.paymentStatus === 'paid' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                      {booking.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    View Details
                  </Button>
                  {booking.status === 'pending' && (
                    <Button variant="outline" className="w-full" size="sm">
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
