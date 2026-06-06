'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, User, FileText, Settings } from 'lucide-react'

export function GuestSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/sign-out', { method: 'POST' })
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <aside className="lg:col-span-1">
      <div className="bg-card border border-border rounded-lg overflow-hidden sticky top-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-serif font-bold text-foreground">Guest Portal</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/guest/dashboard">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 transition text-foreground font-medium cursor-pointer">
              <FileText className="size-5" />
              <span>My Bookings</span>
            </div>
          </Link>
          <Link href="/guest/profile">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 transition text-foreground font-medium cursor-pointer">
              <User className="size-5" />
              <span>Profile</span>
            </div>
          </Link>
          <Link href="/guest/settings">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 transition text-foreground font-medium cursor-pointer">
              <Settings className="size-5" />
              <span>Settings</span>
            </div>
          </Link>
        </nav>
        <div className="border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition font-medium"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
