import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'
import { requirePortalAccess } from '@/lib/session'
import { roleLabel } from '@/lib/rbac'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requirePortalAccess()
  if (!admin) {
    redirect('/auth/sign-in?callbackUrl=/admin')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar role={admin.role} userName={admin.name} />

      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Management Dashboard
            </h2>
            <p className="text-xs text-muted-foreground">
              {roleLabel(admin.role)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/guest/dashboard"
              className="text-sm text-muted-foreground hover:text-primary transition hidden sm:inline"
            >
              Guest Portal
            </a>
            <div className="text-sm text-muted-foreground">
              {admin.name || 'Staff'}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">{children}</div>
      </div>
    </div>
  )
}
