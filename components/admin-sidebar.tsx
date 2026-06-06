'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  Home,
  Navigation,
  Zap,
  BarChart3,
  Settings,
  LogOut,
  MapPin,
  Compass,
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    group: 'Overview',
  },
  {
    label: 'Bookings',
    href: '/admin/bookings',
    icon: FileText,
    group: 'Operations',
  },
  {
    label: 'Guests',
    href: '/admin/guests',
    icon: Users,
    group: 'Operations',
  },
  {
    label: 'Accommodations',
    href: '/admin/accommodations',
    icon: Home,
    group: 'Content',
  },
  {
    label: 'Guides',
    href: '/admin/guides',
    icon: Compass,
    group: 'Content',
  },
  {
    label: 'Drivers & Vehicles',
    href: '/admin/vehicles',
    icon: Navigation,
    group: 'Operations',
  },
  {
    label: 'Transfers',
    href: '/admin/transfers',
    icon: MapPin,
    group: 'Operations',
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    group: 'Reports',
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    group: 'System',
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  // Group items by category
  const groupedItems = navItems.reduce(
    (acc, item) => {
      const group = acc.find((g) => g.name === item.group)
      if (group) {
        group.items.push(item)
      } else {
        acc.push({ name: item.group, items: [item] })
      }
      return acc
    },
    [] as Array<{ name: string; items: typeof navItems }>
  )

  return (
    <aside className="w-64 bg-card border-r border-border h-screen overflow-y-auto sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-serif font-bold">S</span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-foreground">Safari Camp</h3>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-6">
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

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition font-medium text-sm">
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
