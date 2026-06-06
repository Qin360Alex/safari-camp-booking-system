import { SiteHeader } from '@/components/landing/site-header'
import { LandingFooter } from '@/components/landing/landing-footer'
import { GuestSidebar } from '@/components/guest-sidebar'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <GuestSidebar />

          {/* Main Content */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>

      <LandingFooter />
    </div>
  )
}
