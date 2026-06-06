'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionHeader } from '@/components/landing/section-header'
import { ExperienceCard } from '@/components/landing/experience-card'
import { SiteImage } from '@/components/site-image'
import { experiences } from '@/lib/landing-data'
import { isCustomImage, marketingImages } from '@/lib/images'

export default function ExperiencesPage() {
  const showHero = isCustomImage(marketingImages.experiencesHero)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb items={[{ label: 'Experiences' }]} />

      {showHero && (
        <div className="relative h-48 md:h-64 w-full">
          <SiteImage
            slot={marketingImages.experiencesHero}
            preset="banner"
            wrapperClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />
        </div>
      )}

      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Unforgettable adventures"
          title="Safari experiences"
          description="Immerse yourself in world-class safari adventures led by expert guides. From game drives to bush walks, discover the African wilderness like never before."
        />
      </section>

      {/* Experiences Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map(experience => (
            <Link key={experience.id} href={`/experiences/${experience.id}`}>
              <ExperienceCard
                imageKey={experience.imageKey}
                title={experience.title}
                description={experience.description}
                duration={experience.duration}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Experience Details */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Why our experiences stand out</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Expert Guides</h3>
              <p className="text-muted-foreground">
                Our guides bring decades of combined experience in wildlife tracking, conservation, and guest engagement to every experience.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Small Groups</h3>
              <p className="text-muted-foreground">
                Limited group sizes ensure intimate encounters with wildlife and personalized attention from your guide throughout.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Premium Equipment</h3>
              <p className="text-muted-foreground">
                High-quality binoculars, cameras, and open-air vehicles equipped with comfortable seating and excellent visibility.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Flexible Scheduling</h3>
              <p className="text-muted-foreground">
                Early morning, afternoon, and night experiences to catch different wildlife behaviors and spectacular natural light.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-12 border border-border">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-center">
            Ready to experience the wilderness?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Book your safari adventure today. Combine multiple experiences with your accommodation to create the perfect African getaway.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Plan your trip
              </Button>
            </Link>
            <Link href="/accommodations">
              <Button variant="outline" className="px-8 py-3">
                View stays
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
