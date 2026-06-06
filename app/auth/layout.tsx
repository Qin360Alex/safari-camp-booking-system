import Link from 'next/link'
import { SiteHeader } from '@/components/landing/site-header'
import { LandingFooter } from '@/components/landing/landing-footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <LandingFooter />
    </div>
  )
}
