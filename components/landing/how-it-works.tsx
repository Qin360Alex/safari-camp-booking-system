import { SectionHeader } from '@/components/landing/section-header'
import { howItWorksSteps } from '@/lib/landing-data'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="How it works"
          title="Your luxury safari, simplified"
          description="From browsing to booking to arrival — every step designed for ease and elegance."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-14">
          {howItWorksSteps.map((item, index) => (
            <div
              key={item.step}
              className="relative group"
            >
              {index < howItWorksSteps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border"
                  aria-hidden
                />
              )}
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary font-serif text-xl font-bold mb-5 ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
