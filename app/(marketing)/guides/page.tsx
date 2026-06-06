'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionHeader } from '@/components/landing/section-header'
import { Award, Languages, Heart } from 'lucide-react'

const guides = [
  {
    id: 1,
    name: 'Samuel Kipchoge',
    title: 'Lead Safari Guide',
    image: 'SK',
    bio: 'With 18 years of safari guiding experience, Samuel is renowned for his exceptional wildlife tracking skills and entertaining storytelling.',
    specialties: ['Big Five', 'Bird watching', 'Photography'],
    languages: ['English', 'Swahili', 'French'],
  },
  {
    id: 2,
    name: 'Grace Mutua',
    title: 'Naturalist Guide',
    image: 'GM',
    bio: 'Grace brings deep knowledge of ecosystems, plants, and wildlife behavior. Her bush walks are immersive journeys into African nature.',
    specialties: ['Ecosystems', 'Plant knowledge', 'Bush walks'],
    languages: ['English', 'Swahili'],
  },
  {
    id: 3,
    name: 'Peter Omondi',
    title: 'Night Safari Specialist',
    image: 'PO',
    bio: 'Peter specializes in nocturnal wildlife encounters. His expertise in night driving and animal behavior makes evening safaris magical.',
    specialties: ['Nocturnal wildlife', 'Night driving', 'Astronomy'],
    languages: ['English', 'Swahili', 'German'],
  },
  {
    id: 4,
    name: 'Amara Kiplagat',
    title: 'Cultural Guide',
    image: 'AK',
    bio: 'Amara shares the rich Maasai cultural heritage alongside wildlife expertise, creating unforgettable cross-cultural experiences.',
    specialties: ['Maasai culture', 'Heritage sites', 'Community engagement'],
    languages: ['English', 'Swahili', 'Maasai'],
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb items={[{ label: 'Guides' }]} />

      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Meet the team"
          title="Our expert guides"
          description="Our team of experienced safari guides bring decades of combined knowledge, passion, and storytelling to every adventure. They are the heart of Safari Camp Lodge."
        />
      </section>

      {/* Guides Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map(guide => (
            <Card key={guide.id} className="border-border overflow-hidden hover:border-primary transition">
              {/* Avatar */}
              <div className="h-48 bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">{guide.image}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground">{guide.name}</h3>
                  <p className="text-primary font-medium text-sm">{guide.title}</p>
                </div>

                <p className="text-muted-foreground mb-6">{guide.bio}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Award className="size-4 text-accent" />
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-muted rounded-full text-sm text-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Languages className="size-4 text-accent" />
                    Languages
                  </p>
                  <p className="text-sm text-muted-foreground">{guide.languages.join(', ')}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Our Guides Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Why our guides are exceptional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expert Training',
                description: 'Comprehensive wildlife, safety, and hospitality certifications',
              },
              {
                title: 'Local Knowledge',
                description: 'Deep understanding of ecosystems and wildlife behavior',
              },
              {
                title: 'Passionate Storytellers',
                description: 'Engaging narratives that bring the bush to life',
              },
              {
                title: 'Safety First',
                description: 'Professional protocols ensuring guest safety always',
              },
            ].map((benefit, idx) => (
              <Card key={idx} className="p-6 border-border">
                <Heart className="size-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-12 border border-border">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 text-center">
            Ready to explore with our guides?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Book your safari adventure today and let our expert guides introduce you to the wonders of African wilderness.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Book now
              </Button>
            </Link>
            <Link href="/experiences">
              <Button variant="outline" className="px-8 py-3">
                View experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
