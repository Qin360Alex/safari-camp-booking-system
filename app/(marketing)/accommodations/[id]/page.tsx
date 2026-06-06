'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { lodgePackages } from '@/lib/landing-data'
import { SiteImage } from '@/components/site-image'
import { getAccommodationImage } from '@/lib/images'
import { Check, MapPin, Users, Wifi, UtensilsCrossed, Dumbbell } from 'lucide-react'
import { notFound } from 'next/navigation'

const amenities = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: UtensilsCrossed, label: 'Fine Dining' },
  { icon: Dumbbell, label: 'Fitness Center' },
  { icon: MapPin, label: 'Scenic Views' },
]

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    text: 'An unforgettable experience! The luxury and attention to detail exceeded our expectations.',
  },
  {
    id: 2,
    author: 'James K.',
    rating: 5,
    text: 'Pristine accommodation with world-class service. Highly recommend to anyone seeking luxury safari.',
  },
  {
    id: 3,
    author: 'Emma L.',
    rating: 4,
    text: 'Beautiful property and stunning views. The guides were incredibly knowledgeable.',
  },
]

export default function AccommodationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const accommodation = lodgePackages.find(pkg => pkg.id === params.id)

  if (!accommodation) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: 'Accommodations', href: '/accommodations' },
          { label: accommodation.name },
        ]}
      />

      {/* Hero with Image */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery Placeholder */}
            <div className="photo-frame rounded-lg aspect-video mb-8 overflow-hidden relative">
              <SiteImage
                slot={getAccommodationImage(accommodation.id)}
                preset="detailHero"
                wrapperClassName="absolute inset-0"
              />
            </div>

            {/* Description */}
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                {accommodation.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {accommodation.longDescription}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {amenities.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Key Details */}
              <Card className="p-6 bg-muted/50 border-border mb-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                    <p className="text-2xl font-bold flex items-center gap-2">
                      <Users className="size-6 text-primary" />
                      {accommodation.capacity} guests
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minimum stay</p>
                    <p className="text-lg font-medium">{accommodation.nightsLabel}</p>
                  </div>
                </div>
              </Card>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {[
                    'En-suite bathrooms with luxury amenities',
                    'Private deck with panoramic views',
                    'Climate-controlled interiors',
                    'Personalized concierge service',
                    'Premium bedding and furnishings',
                  ].map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="size-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <Card className="p-6 border-border sticky top-28">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">From</p>
                <p className="text-4xl font-bold text-primary">
                  ${accommodation.price}
                </p>
                <p className="text-sm text-muted-foreground">per night</p>
              </div>

              <Link href={`/book?accommodation=${accommodation.id}`} className="block mb-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                  Book this stay
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                Free cancellation up to 14 days before arrival
              </p>
            </Card>

            {/* Contact Card */}
            <Card className="p-6 border-border mt-6">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">Questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our expert team is ready to help craft your perfect safari experience.
              </p>
              <Button variant="outline" className="w-full">
                Contact us
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Guest reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <Card key={review.id} className="p-6 border-border">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4">{review.text}</p>
                <p className="text-sm font-medium text-muted-foreground">— {review.author}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Accommodations */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Other exceptional stays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lodgePackages
            .filter(pkg => pkg.id !== accommodation.id)
            .slice(0, 2)
            .map(pkg => (
              <Link key={pkg.id} href={`/accommodations/${pkg.id}`}>
                <Card className="p-6 border-border hover:border-primary transition cursor-pointer h-full">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <p className="text-lg font-bold text-primary">${pkg.price}/night</p>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
