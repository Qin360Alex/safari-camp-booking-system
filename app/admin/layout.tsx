import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { requireAdmin } from '@/lib/session'
import { brandImages, resolveImageSrc } from '@/lib/images'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()
  if (!admin) {
    redirect('/sign-in?callbackUrl=/admin')
  }
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card p-6">
        <div className="mb-8">
          <Image
            src={resolveImageSrc(brandImages.logoMark)}
            alt={brandImages.logoMark.alt}
            width={160}
            height={56}
            className="h-10 w-auto object-contain object-left"
          />
          <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wide">
            Admin
          </p>
        </div>
        <nav className="space-y-2">
          <NavLink href="/admin" label="Dashboard" />
          <NavLink href="/admin/bookings" label="Bookings" />
          <NavLink href="/admin/guests" label="Guests" />
          <NavLink href="/admin/accommodations" label="Accommodations" />
          <NavLink href="/admin/guides" label="Guides" />
          <NavLink href="/admin/activities" label="Activities" />
          <NavLink href="/admin/transfers" label="Transfers" />
          <NavLink href="/admin/reports" label="Reports" />
          <NavLink href="/admin/settings" label="Settings" />
        </nav>

        <div className="mt-12 pt-6 border-t border-border">
          <Button variant="outline" className="w-full" size="sm">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Management Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">{admin.name}</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition">
      {label}
    </Link>
  )
}
