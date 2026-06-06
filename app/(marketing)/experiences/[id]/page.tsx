'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { experiences } from '@/lib/landing-data'
import { Clock, MapPin, Camera, Binoculars } from 'lucide-react'
import { notFound } from 'next/navigation'

const experienceDetails: Record<number, {
  description: string
  fullDescription: string
  bestTime: string
  difficulty: string
  includes: string[]
  highlights: string[]
}> = {
  1: {
    description: 'Game Drives',
    fullDescription: 'Experience the thrill of safari in our open-air vehicles with expert guides. Our game drives combine bush craft knowledge, patience, and a deep understanding of wildlife behavior to deliver unforgettable encounters with Africa&apos;s iconic species.',
    bestTime: 'Early morning & late afternoon',
    difficulty: 'Easy to Moderate',
    includes: [
      'Professional guide with binoculars',
      'Open-air vehicle with premium seating',
      'Complimentary beverages',
      'Photography support',
      'Wildlife information booklet',
    ],
    highlights: [
      'Spot the Big Five in their natural habitat',
      'Learn wildlife tracking techniques from expert guides',
      'Capture stunning wildlife photography moments',
      'Experience the African sunset from the bush',
    ],
  },
  2: {
    description: 'Bush Walks',
    fullDescription: 'Venture into the African wilderness on foot with armed rangers and naturalists. Bush walks offer intimate encounters with smaller wildlife, plants, and ecosystems that vehicles cannot reach. Feel the earth beneath your feet and connect with nature at a deeper level.',
    bestTime: 'Early morning',
    difficulty: 'Moderate',
    includes: [
      'Armed ranger for safety',
      'Naturalist guide with field expertise',
      'Walking sticks and sun protection',
      'Light refreshments',
      'Field identification guides',
    ],
    highlights: [
      'Discover medicinal plants and their traditional uses',
      'Track animals through their spoor',
      'Observe insects, birds, and small mammals up close',
      'Connect with nature on a deeper personal level',
    ],
  },
  3: {
    description: 'Night Safaris',
    fullDescription: 'Discover the nocturnal world of African wildlife under the stars. Our night safaris reveal a completely different ecosystem of predators, prey, and behaviors. Experience the magic of the bush after dark with specialized spotlight equipment and guides trained in nocturnal wildlife.',
    bestTime: '7 PM - 11 PM',
    difficulty: 'Easy',
    includes: [
      'Professional night-driving guide',
      'Advanced spotlight equipment',
      'Warm blankets and comfort items',
      'Star constellation guide',
      'Night wildlife checklist',
    ],
    highlights: [
      'Spot elusive nocturnal predators hunting',
      'Marvel at star-filled African skies',
      'Listen to the night chorus of the bush',
      'Experience the magic of darkness under professional guidance',
    ],
  },
}

export default function ExperienceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const experienceId = parseInt(params.id)
  const experience = experiences.find(exp => exp.id === experienceId)
  const details = experienceDetails[experienceId]

  if (!experience || !details) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb
        items={[
          { label: 'Experiences', href: '/experiences' },
          { label: experience.title },
        ]}
      />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="bg-gradient-to-br from-accent/30 to-primary/30 rounded-lg aspect-video flex items-center justify-center mb-8 border border-border">
              <div className="text-center">
                <p className="text-muted-foreground">Gallery for {experience.title}</p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-12">
              <h1 className="text-5xl font-serif font-bold text-foreground mb-4">
                {experience.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {details.fullDescription}
              </p>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <Card className="p-6 bg-muted/50 border-border">
                  <p className="text-sm text-muted-foreground mb-2">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-primary" />
                    <span className="text-lg font-bold">{experience.duration}</span>
                  </div>
                </Card>
                <Card className="p-6 bg-muted/50 border-border">
                  <p className="text-sm text-muted-foreground mb-2">Best time</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-accent" />
                    <span className="text-lg font-bold">{details.bestTime}</span>
                  </div>
                </Card>
              </div>

              {/* What's Included */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">What&apos;s included</h2>
                <ul className="space-y-3">
                  {details.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Binoculars className="size-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Experience highlights</h2>
                <ul className="space-y-3">
                  {details.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Camera className="size-5 text-accent flex-shrink-0 mt-0.5" />
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
            <Card className="p-6 border-border sticky top-28 mb-6">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4">Add to your trip</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Combine this experience with one of our accommodation packages for the perfect African adventure.
              </p>
              <Link href={`/book?experience=${experienceId}`} className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                  Add experience
                </Button>
              </Link>
            </Card>

            {/* Info Card */}
            <Card className="p-6 border-border">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">Difficulty level</h3>
              <p className="text-primary font-semibold mb-4">{details.difficulty}</p>

              <h3 className="font-serif text-lg font-bold text-foreground mb-3 pt-4 border-t border-border">Questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our team for specific questions about this experience.
              </p>
              <Button variant="outline" className="w-full">
                Contact us
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Experiences */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Other experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences
              .filter(exp => exp.id !== experienceId)
              .map(exp => (
                <Link key={exp.id} href={`/experiences/${exp.id}`}>
                  <Card className="p-6 border-border hover:border-primary transition h-full cursor-pointer">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <p className="text-sm flex items-center gap-2 text-primary font-medium">
                      <Clock className="size-4" />
                      {exp.duration}
                    </p>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
