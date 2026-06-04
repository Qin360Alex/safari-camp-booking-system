import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold text-primary">Safari Camp</div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#accommodations" className="text-sm font-medium hover:text-primary transition">
              Accommodations
            </Link>
            <Link href="#experiences" className="text-sm font-medium hover:text-primary transition">
              Experiences
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition">
              About
            </Link>
            <Link href="/sign-in">
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Discover the <span className="text-primary">Wild Beauty</span> of Africa
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience luxury safari adventures in the heart of Africa&apos;s most pristine wilderness. Our expert guides, world-class accommodations, and unforgettable wildlife encounters await.
            </p>
            <Link href="/sign-in">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                Plan Your Adventure
              </Button>
            </Link>
          </div>
          <div className="relative h-96 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
              <div>
                <p className="text-xl font-serif mb-4">Experience luxury in nature&apos;s greatest theatre</p>
                <p className="text-sm opacity-80">Professional safari guides • Gourmet dining • Premium accommodations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Years of Excellence</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <p className="text-muted-foreground">Happy Guests</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section id="accommodations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Luxury Accommodations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intimate glamping tents to exclusive lodge suites, each accommodation offers unparalleled comfort and authentic African elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accommodations.map((acc) => (
            <div key={acc.id} className="group cursor-pointer">
              <div className="bg-muted rounded-lg overflow-hidden mb-4 h-64 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 group-hover:from-primary/50 group-hover:to-accent/50 transition"></div>
                <p className="text-white text-center text-sm font-medium relative z-10">{acc.name}</p>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{acc.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{acc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">${acc.price}/night</span>
                <span className="text-xs text-muted-foreground">{acc.capacity} guests</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Unforgettable Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in world-class safari adventures led by expert guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-card rounded-lg p-8 border border-border hover:border-primary transition">
                <div className="text-4xl mb-4">{exp.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{exp.title}</h3>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <p className="text-sm font-medium text-primary">{exp.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Why Choose Safari Camp?</h2>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="text-primary text-2xl flex-shrink-0">✓</div>
                  <div>
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready for Your Safari Adventure?</h2>
          <p className="text-lg mb-8 opacity-90">
            Book your dream African safari experience today. Our travel experts are ready to craft your perfect itinerary.
          </p>
          <Link href="/sign-in">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-lg font-semibold">
              Start Booking Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">Safari Camp</h3>
              <p className="text-sm opacity-80">Luxury African safari experiences crafted for unforgettable memories.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="#" className="hover:opacity-100 transition">Accommodations</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">Activities</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="#" className="hover:opacity-100 transition">Contact</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">FAQ</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">Policies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="#" className="hover:opacity-100 transition">Instagram</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">Facebook</Link></li>
                <li><Link href="#" className="hover:opacity-100 transition">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8">
            <p className="text-sm opacity-80 text-center">© 2026 Safari Camp Lodge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const accommodations = [
  {
    id: 1,
    name: 'Luxury Tent',
    description: 'Premium glamping with all modern amenities',
    price: 299,
    capacity: 2,
  },
  {
    id: 2,
    name: 'Safari Lodge',
    description: 'Spacious suites with panoramic views',
    price: 399,
    capacity: 2,
  },
  {
    id: 3,
    name: 'Private Cabin',
    description: 'Intimate retreats in the wilderness',
    price: 499,
    capacity: 4,
  },
  {
    id: 4,
    name: 'Presidential Suite',
    description: 'Exclusive luxury accommodation',
    price: 699,
    capacity: 4,
  },
]

const experiences = [
  {
    id: 1,
    icon: '🦁',
    title: 'Game Drives',
    description: 'Expert-guided safari tours featuring the Big Five and countless other species.',
    duration: '3-4 hours',
  },
  {
    id: 2,
    icon: '🌅',
    title: 'Bush Walks',
    description: 'Immersive guided nature walks through pristine African landscapes.',
    duration: '2-3 hours',
  },
  {
    id: 3,
    icon: '🔭',
    title: 'Night Safaris',
    description: 'Discover the nocturnal wonders of the African bush.',
    duration: '4 hours',
  },
]

const features = [
  {
    title: 'Expert Guides',
    description: 'Our guides have decades of combined experience in wildlife tracking and education.',
  },
  {
    title: 'World-Class Dining',
    description: 'Gourmet meals crafted from local ingredients by professional chefs.',
  },
  {
    title: '24/7 Support',
    description: 'Dedicated concierge service to ensure your complete comfort and satisfaction.',
  },
  {
    title: 'Sustainable Tourism',
    description: 'We are committed to preserving wildlife and supporting local communities.',
  },
]
