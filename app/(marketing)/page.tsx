import Link from 'next/link'
import { HeroSection } from '@/components/landing/hero-section'
import { TrustStrip } from '@/components/landing/trust-strip'
import { HowItWorksSection } from '@/components/landing/how-it-works'
import { PackageCard } from '@/components/landing/package-card'
import { ExperienceCard } from '@/components/landing/experience-card'
import { SectionHeader } from '@/components/landing/section-header'
import { SiteImage } from '@/components/site-image'
import { Button } from '@/components/ui/button'
import {
  experiences,
  features,
  lodgePackages,
} from '@/lib/landing-data'
import { homeImages, isCustomImage } from '@/lib/images'

export default function Home() {
  const showCtaBackground = isCustomImage(homeImages.ctaBackground)

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <HowItWorksSection />

      {/* Signature stays */}
      <section
        id="accommodations"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <SectionHeader
          eyebrow="Curated collections"
          title="Signature lodge stays"
          description="Handpicked accommodations where African wilderness meets refined comfort — from glamping tents to exclusive suites."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {lodgePackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/accommodations">
            <Button
              variant="outline"
              size="lg"
              className="px-8 border-primary text-primary hover:bg-primary/5"
            >
              View all accommodations
            </Button>
          </Link>
        </div>
      </section>

      {/* Experiences */}
      <section
        id="experiences"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="In the wild"
            title="Unforgettable experiences"
            description="Immerse yourself in world-class safari adventures led by expert guides and naturalists."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                imageKey={exp.imageKey}
                title={exp.title}
                description={exp.description}
                duration={exp.duration}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="The Safari Camp difference"
              title="Why choose Safari Camp?"
              description="A legacy of excellence in hospitality, conservation, and authentic African safari experiences."
              align="left"
            />
            <ul className="space-y-5 mt-10">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative photo-frame aspect-[4/5] lg:aspect-[4/5] overflow-hidden">
            <SiteImage
              slot={homeImages.whyChooseUs}
              preset="halfPage"
              objectPosition="center"
              wrapperClassName="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-primary-foreground overflow-hidden">
        {showCtaBackground ? (
          <>
            <SiteImage
              slot={homeImages.ctaBackground}
              preset="fullBleed"
              objectPosition="center"
              wrapperClassName="absolute inset-0"
            />
            <div className="absolute inset-0 bg-foreground/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Start planning"
            title="Ready for your safari adventure?"
            description="Book your dream African escape today. Our team is ready to craft your perfect itinerary."
            light
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/book">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 px-10 py-6 text-base font-semibold shadow-xl"
              >
                Start Booking Now
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white px-10 py-6 text-base"
              >
                Create an account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
