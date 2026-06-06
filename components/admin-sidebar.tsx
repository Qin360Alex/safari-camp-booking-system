'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiteLogo } from '@/components/site-logo'
import { LogoutButton } from '@/components/logout-button'
import {
  ADMIN_NAV_PERMISSIONS,
  hasPermission,
  roleLabel,
  type UserRole,
} from '@/lib/rbac'
import {
  LayoutDashboard,
  FileText,
  Users,
  Home,
  Navigation,
  BarChart3,
  Settings,
  MapPin,
  Compass,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, group: 'Overview' },
  { label: 'Bookings', href: '/admin/bookings', icon: FileText, group: 'Operations' },
  { label: 'Guests', href: '/admin/guests', icon: Users, group: 'Operations' },
  { label: 'Accommodations', href: '/admin/accommodations', icon: Home, group: 'Content' },
  { label: 'Guides', href: '/admin/guides', icon: Compass, group: 'Content' },
  { label: 'Drivers & Vehicles', href: '/admin/vehicles', icon: Navigation, group: 'Operations' },
  { label: 'Transfers', href: '/admin/transfers', icon: MapPin, group: 'Operations' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, group: 'Reports' },
  { label: 'Settings', href: '/admin/settings', icon: Settings, group: 'System' },
]

type AdminSidebarProps = {
  role: UserRole
  userName?: string
}

export function AdminSidebar({ role, userName }: AdminSidebarProps) {
  const pathname = usePathname()

  const visibleItems = navItems.filter((item) => {
    const perm = ADMIN_NAV_PERMISSIONS[item.href]
    return perm ? hasPermission(role, perm) : false
  })

  const groupedItems = visibleItems.reduce(
    (acc, item) => {
      const group = acc.find((g) => g.name === item.group)
      if (group) group.items.push(item)
      else acc.push({ name: item.group, items: [item] })
      return acc
    },
    [] as Array<{ name: string; items: typeof navItems }>
  )

  return (
    <aside className="w-64 bg-card border-r border-border h-screen overflow-y-auto sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <SiteLogo href="/admin" variant="dark" />
        <p className="text-xs text-muted-foreground mt-2">Admin Portal</p>
        <p className="text-xs font-medium text-primary mt-1">{roleLabel(role)}</p>
      </div>

      <nav className="p-4 space-y-6 flex-1">
        {groupedItems.map((group) => (
          <div key={group.name}>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
              {group.name}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-secondary/10'
                      }`}
                    >
                      <Icon className="size-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border bg-card space-y-2">
        {userName && (
          <p className="text-xs text-muted-foreground px-1 truncate">{userName}</p>
        )}
        <LogoutButton />
      </div>
    </aside>
  )
}
