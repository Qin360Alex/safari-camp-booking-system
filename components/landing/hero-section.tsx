'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteImage } from '@/components/site-image'
import { heroStats } from '@/lib/landing-data'
import { homeImages } from '@/lib/images'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 hero-ken-burns">
        <SiteImage
          slot={homeImages.hero}
          preset="fullBleed"
          priority
          objectPosition="center 40%"
          wrapperClassName="absolute inset-0"
        />
      </div>

      <div className="absolute inset-0 hero-cinematic-overlay" aria-hidden />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pb-12 flex-1 flex flex-col justify-end">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary mb-4 md:mb-5">
            East Africa&apos;s Premier Lodge Experience
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.06] mb-5 md:mb-6 text-balance">
            Where the wild meets{' '}
            <span className="text-secondary">world-class comfort</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mb-8 md:mb-10">
            Curated safaris, luxury accommodations, and expert guides — seamless
            booking and memories crafted for a lifetime at Safari Camp Lodge.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="#accommodations">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-semibold shadow-xl"
              >
                Explore Stays
              </Button>
            </Link>
            <Link href="/book">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/50 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-sm px-8 py-6 text-base font-semibold"
              >
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#how-it-works"
        className="relative z-10 flex justify-center pb-6 text-white/60 hover:text-white transition-colors animate-bounce-slow"
        aria-label="Scroll to explore"
      >
        <ChevronDown className="size-8" strokeWidth={1.5} />
      </a>
    </section>
  )
}
