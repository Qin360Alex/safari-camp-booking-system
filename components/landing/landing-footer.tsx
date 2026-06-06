import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'
import { contactInfo } from '@/lib/landing-data'

export function LandingFooter() {
  return (
    <footer className="bg-foreground text-background py-14 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <SiteLogo variant="light" href="/" showWordmark />
            <p className="text-sm opacity-75 mt-4 leading-relaxed max-w-xs">
              Luxury African safari experiences crafted for unforgettable
              memories in the heart of the wilderness.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li>
                <Link href="#accommodations" className="hover:opacity-100 transition">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="#experiences" className="hover:opacity-100 transition">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:opacity-100 transition">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:opacity-100 transition">
                  About us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Guest services</h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              <li>
                <Link href="/book" className="hover:opacity-100 transition">
                  Book a stay
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:opacity-100 transition">
                  My bookings
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:opacity-100 transition">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2.5">
                <Mail className="size-4 mt-0.5 shrink-0 opacity-70" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:opacity-100 transition"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="size-4 mt-0.5 shrink-0 opacity-70" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="hover:opacity-100 transition"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 mt-0.5 shrink-0 opacity-70" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-70">
          <p>© {new Date().getFullYear()} Safari Camp Lodge. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-100 transition">
              Privacy
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
