import { redirect } from 'next/navigation'
import { SiteHeader } from '@/components/landing/site-header'
import { LandingFooter } from '@/components/landing/landing-footer'
import { GuestSidebar } from '@/components/guest-sidebar'
import { StaffSupportBanner } from '@/components/staff-support-banner'
import { getAuthContext } from '@/lib/session'

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ctx = await getAuthContext()
  if (!ctx) {
    redirect('/auth/sign-in?callbackUrl=/guest/dashboard')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <StaffSupportBanner role={ctx.role} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <GuestSidebar role={ctx.role} emailVerified={ctx.emailVerified} />

          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>

      <LandingFooter />
    </div>
  )
}
