'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { hasPermission, isStaffRole, type UserRole } from '@/lib/rbac'
import {
  User,
  FileText,
  Settings,
  Search,
  ShieldAlert,
  Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type GuestSidebarProps = {
  role: UserRole
  emailVerified: boolean
}

export function GuestSidebar({ role, emailVerified }: GuestSidebarProps) {
  const pathname = usePathname()
  const isStaff = isStaffRole(role)

  const links = [
    { href: '/guest/dashboard', label: 'My Bookings', icon: FileText },
    { href: '/guest/profile', label: 'Profile', icon: User },
    { href: '/guest/settings', label: 'Settings', icon: Settings },
    ...(hasPermission(role, 'guest:support')
      ? [{ href: '/guest/support', label: 'Guest Support', icon: Search }]
      : []),
  ]

  return (
    <aside className="lg:col-span-1">
      <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-serif font-bold text-foreground">
            {isStaff ? 'Guest Portal' : 'My Account'}
          </h2>
          {isStaff && (
            <p className="text-xs text-muted-foreground mt-1">
              Staff view — personal bookings & support tools
            </p>
          )}
        </div>

        {!emailVerified && (
          <div className="mx-4 mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex gap-2">
            <Mail className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground">Verify your email</p>
              <Link
                href="/auth/verify-email?callbackUrl=/guest/dashboard"
                className="text-xs text-primary hover:underline"
              >
                Required before booking
              </Link>
            </div>
          </div>
        )}

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const active = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium cursor-pointer',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-secondary/10'
                  )}
                >
                  <Icon className="size-5" />
                  <span>{link.label}</span>
                </div>
              </Link>
            )
          })}

          {isStaff && (
            <Link href="/admin">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 transition text-foreground font-medium cursor-pointer mt-2 border border-dashed border-border">
                <ShieldAlert className="size-5 text-primary" />
                <span>Admin Portal</span>
              </div>
            </Link>
          )}
        </nav>

        <div className="border-t border-border p-4">
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
