'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SiteImage } from '@/components/site-image'
import { createBooking } from '@/app/actions/bookings'
import { bookImages, getAccommodationImage, isCustomImage } from '@/lib/images'

const accommodations = [
  {
    id: '1',
    name: 'Luxury Tent',
    type: 'tent',
    description: 'Premium glamping with all modern amenities',
    price: 299,
    capacity: 2,
    amenities: ['WiFi', 'En-suite Bathroom', 'Indoor Heating', 'King Bed'],
  },
  {
    id: '2',
    name: 'Safari Lodge',
    type: 'lodge',
    description: 'Spacious suites with panoramic views',
    price: 399,
    capacity: 2,
    amenities: ['WiFi', 'Private Balcony', 'Air Conditioning', 'Minibar'],
  },
  {
    id: '3',
    name: 'Private Cabin',
    type: 'cabin',
    description: 'Intimate retreats in the wilderness',
    price: 499,
    capacity: 4,
    amenities: ['WiFi', 'Living Room', 'Kitchen', 'Private Deck'],
  },
  {
    id: '4',
    name: 'Presidential Suite',
    type: 'glamping',
    description: 'Exclusive luxury accommodation',
    price: 699,
    capacity: 4,
    amenities: ['WiFi', 'Jacuzzi', 'Private Chef', 'Concierge'],
  },
]

export default function BookPage() {
  const router = useRouter()
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selected = selectedAccommodation ? accommodations.find(a => a.id === selectedAccommodation) : null
  const nights = checkInDate && checkOutDate 
    ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const totalPrice = selected ? selected.price * nights : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!selectedAccommodation || !checkInDate || !checkOutDate) {
        throw new Error('Please fill in all required fields')
      }

      if (new Date(checkInDate) >= new Date(checkOutDate)) {
        throw new Error('Check-out date must be after check-in date')
      }

      const bookingId = await createBooking({
        accommodationId: selectedAccommodation,
        checkInDate,
        checkOutDate,
        totalPrice,
        specialRequests: specialRequests || undefined,
      })

      router.push(`/bookings/${bookingId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  const showBanner = isCustomImage(bookImages.headerBanner)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        {showBanner && (
          <div className="relative h-52 md:h-72 w-full">
            <SiteImage
              slot={bookImages.headerBanner}
              preset="banner"
              objectPosition="center 35%"
              wrapperClassName="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Book Your Safari Adventure</h1>
          <p className="text-muted-foreground mt-2">Choose your accommodation and dates</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left side - Accommodation selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Select Your Accommodation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {accommodations.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccommodation(acc.id)}
                  className={`rounded-lg border-2 cursor-pointer transition overflow-hidden ${
                    selectedAccommodation === acc.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <SiteImage
                      slot={getAccommodationImage(acc.id)}
                      preset="cardLarge"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                  <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">{acc.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{acc.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="text-primary font-semibold">${acc.price}</span>/night</p>
                    <p className="text-sm text-muted-foreground">Up to {acc.capacity} guests</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {acc.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Date and request form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary bg-card text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary bg-card text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Special Requests (Optional)</label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell us about any special requests, dietary restrictions, or preferences..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary bg-card text-foreground min-h-24"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
                disabled={loading || !selectedAccommodation || !checkInDate || !checkOutDate}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </form>
          </div>

          {/* Right side - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-foreground mb-6">Booking Summary</h3>

              {selected ? (
                <>
                  <div className="space-y-4 pb-6 border-b border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Accommodation</p>
                      <p className="font-semibold text-foreground">{selected.name}</p>
                    </div>
                    {checkInDate && checkOutDate && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">{nights} night{nights !== 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Dates</p>
                          <p className="font-semibold text-foreground text-sm">
                            {new Date(checkInDate).toLocaleDateString()} - {new Date(checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {nights > 0 && (
                    <div className="space-y-4 pt-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">${selected.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                        <span className="font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & fees</span>
                        <span className="font-semibold text-foreground">${(totalPrice * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-4 flex justify-between">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="font-bold text-primary text-lg">${(totalPrice * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select an accommodation to see pricing</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
