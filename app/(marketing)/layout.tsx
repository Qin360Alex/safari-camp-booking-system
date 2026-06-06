'use client'

import { SiteHeader } from '@/components/landing/site-header'
import { LandingFooter } from '@/components/landing/landing-footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <LandingFooter />
    </div>
  )
}
