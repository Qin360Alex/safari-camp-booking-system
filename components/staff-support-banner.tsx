'use client'

import Link from 'next/link'
import { Shield, Search } from 'lucide-react'
import { isStaffRole, roleLabel, type UserRole } from '@/lib/rbac'

type StaffSupportBannerProps = {
  role: UserRole
}

export function StaffSupportBanner({ role }: StaffSupportBannerProps) {
  if (!isStaffRole(role)) return null

  return (
    <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-start gap-3">
        <Shield className="size-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Staff access — {roleLabel(role)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Use Guest Support to look up customer bookings in a controlled way.
            Admin portal remains the hub for full operations.
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Link
          href="/guest/support"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          <Search className="size-3.5" />
          Guest Support
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-medium px-3 py-2 rounded-md border border-border hover:bg-muted transition"
        >
          Admin Portal
        </Link>
      </div>
    </div>
  )
}
