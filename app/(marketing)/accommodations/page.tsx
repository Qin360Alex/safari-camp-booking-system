'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/breadcrumb'
import { SectionHeader } from '@/components/landing/section-header'
import { PackageCard } from '@/components/landing/package-card'
import { lodgePackages } from '@/lib/landing-data'

export default function AccommodationsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const filters = ['All', 'Glamping', 'Lodge', 'Cabin', 'Exclusive']

  const filteredAccommodations = selectedFilter && selectedFilter !== 'All'
    ? lodgePackages.filter(pkg => 
        pkg.locations.some(loc => 
          loc.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      )
    : lodgePackages

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumb items={[{ label: 'Accommodations' }]} />

      {/* Header Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-20 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Sleep in style"
          title="Signature lodge stays"
          description="Discover our curated collection of luxury accommodations where African wilderness meets refined comfort. From intimate glamping tents to exclusive presidential suites."
        />

        {/* Filters */}
        <div className="flex gap-3 flex-wrap mt-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter === 'All' ? null : filter)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                (filter === 'All' && selectedFilter === null) || selectedFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Accommodations Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAccommodations.map(pkg => (
            <Link key={pkg.id} href={`/accommodations/${pkg.id}`}>
              <PackageCard pkg={pkg} />
            </Link>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No accommodations found for the selected filter.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-primary/5 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Ready to book your escape?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Find your perfect accommodation and start planning your safari adventure today.
          </p>
          <Link href="/book">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
