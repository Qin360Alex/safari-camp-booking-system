import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'
import { requireAdmin } from '@/lib/session'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()
  if (!admin) {
    redirect('/auth/sign-in?callbackUrl=/admin')
  }
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-border bg-card px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <h2 className="text-lg font-semibold text-foreground">Management Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">{admin.name || 'Admin'}</div>
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
