'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionHeader } from '@/components/landing/section-header'
import { SiteImage } from '@/components/site-image'
import { getGuideImage, isCustomImage, marketingImages } from '@/lib/images'
import { Award, Languages, Heart, Star, ArrowRight } from 'lucide-react'

const guides = [
  {
    id: 1,
    name: 'Samuel Kipchoge',
    title: 'Lead Safari Guide',
    image: 'SK',
    bio: 'With 18 years of safari guiding experience, Samuel is renowned for his exceptional wildlife tracking skills and entertaining storytelling.',
    specialties: ['Big Five', 'Bird watching', 'Photography'],
    languages: ['English', 'Swahili', 'French'],
    badge: 'Lead Guide',
    badgeColor: 'bg-amber-600',
    experience: '18 years',
    featured: true,
  },
  {
    id: 2,
    name: 'Grace Mutua',
    title: 'Naturalist Guide',
    image: 'GM',
    bio: 'Grace brings deep knowledge of ecosystems, plants, and wildlife behavior. Her bush walks are immersive journeys into African nature.',
    specialties: ['Ecosystems', 'Plant knowledge', 'Bush walks'],
    languages: ['English', 'Swahili'],
    badge: 'Naturalist',
    badgeColor: 'bg-emerald-600',
    experience: '12 years',
    featured: false,
  },
  {
    id: 3,
    name: 'Peter Omondi',
    title: 'Night Safari Specialist',
    image: 'PO',
    bio: 'Peter specializes in nocturnal wildlife encounters. His expertise in night driving and animal behavior makes evening safaris magical.',
    specialties: ['Nocturnal wildlife', 'Night driving', 'Astronomy'],
    languages: ['English', 'Swahili', 'German'],
    badge: 'Night Expert',
    badgeColor: 'bg-indigo-600',
    experience: '10 years',
    featured: false,
  },
  {
    id: 4,
    name: 'Amara Kiplagat',
    title: 'Cultural Guide',
    image: 'AK',
    bio: 'Amara shares the rich Maasai cultural heritage alongside wildlife expertise, creating unforgettable cross-cultural experiences.',
    specialties: ['Maasai culture', 'Heritage sites', 'Community engagement'],
    languages: ['English', 'Swahili', 'Maasai'],
    badge: 'Cultural Expert',
    badgeColor: 'bg-rose-600',
    experience: '14 years',
    featured: false,
  },
]

export default function GuidesPage() {
  const showHero = isCustomImage(marketingImages.guidesHero)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb items={[{ label: 'Guides' }]} />

      {showHero && (
        <div className="relative h-48 md:h-64 w-full">
          <SiteImage
            slot={marketingImages.guidesHero}
            preset="banner"
            wrapperClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/20" />
        </div>
      )}

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
            <div
              key={guide.id}
              className={`group relative transition-all duration-500 ${
                guide.featured ? 'md:col-span-1' : ''
              }`}
            >
              <Card className="border-border overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Image Container with Enhanced Overlay */}
                <div className="relative h-80 md:h-96 overflow-hidden bg-muted">
                  <SiteImage
                    slot={getGuideImage(String(guide.id))}
                    preset="guidePortrait"
                    wrapperClassName="absolute inset-0"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Layered Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  {/* Top Accent Bar with Badge */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`${guide.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm bg-opacity-95`}>
                      {guide.badge}
                    </div>
                  </div>

                  {/* Experience Indicator */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-white">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">{guide.experience} experience</span>
                  </div>

                  {/* Hover Reveal - Quick Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    <button
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition transform hover:scale-105 flex items-center gap-2"
                      onClick={() => (window.location.href = '/book')}
                    >
                      Book with {guide.name.split(' ')[0]}
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-tight">
                      {guide.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mt-1">{guide.title}</p>
                  </div>

                  <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed flex-grow">
                    {guide.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-5">
                    <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Award className="size-4 text-accent" />
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map(specialty => (
                        <span
                          key={specialty}
                          className="px-3 py-1.5 bg-muted border border-border rounded-full text-xs font-semibold text-foreground hover:bg-primary/10 hover:border-primary transition-colors duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <Languages className="size-4 text-accent" />
                      Languages
                    </p>
                    <p className="text-sm text-muted-foreground">{guide.languages.join(', ')}</p>
                  </div>
                </div>

                {/* CTA Button at Bottom */}
                <div className="px-6 md:px-8 pb-6">
                  <Link href="/book" className="block w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg">
                      Request {guide.name.split(' ')[0]} as Your Guide
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Why Our Guides Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-br from-muted/50 to-muted/20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Why Choose Our Guides?"
            title="Exceptional expertise & passion"
            description="Our guides aren't just tour operators—they're conservationists, storytellers, and your gateway to authentic African wilderness experiences."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: '🎓',
                title: 'Expert Training',
                description: 'Comprehensive wildlife, safety, and hospitality certifications',
                color: 'from-blue-500/10 to-cyan-500/10 border-blue-200/30',
              },
              {
                icon: '🌍',
                title: 'Local Knowledge',
                description: 'Deep understanding of ecosystems and wildlife behavior',
                color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/30',
              },
              {
                icon: '✨',
                title: 'Passionate Storytellers',
                description: 'Engaging narratives that bring the bush to life',
                color: 'from-amber-500/10 to-orange-500/10 border-amber-200/30',
              },
              {
                icon: '🛡️',
                title: 'Safety First',
                description: 'Professional protocols ensuring guest safety always',
                color: 'from-rose-500/10 to-red-500/10 border-rose-200/30',
              },
            ].map((benefit, idx) => (
              <Card
                key={idx}
                className={`p-6 border bg-gradient-to-br ${benefit.color} hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-foreground mb-3 text-lg">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 border border-primary/20 p-8 md:p-16">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Ready to explore with our guides?
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Book your safari adventure today and let our expert guides introduce you to the wonders of African wilderness. Each journey is personalized, immersive, and unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  Book an adventure
                </Button>
              </Link>
              <Link href="/experiences">
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-300 hover:bg-muted hover:shadow-lg hover:scale-105"
                >
                  Explore experiences
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
