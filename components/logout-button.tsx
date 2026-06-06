'use client'

import { authClient } from '@/lib/auth-client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type LogoutButtonProps = {
  className?: string
  variant?: 'sidebar' | 'menu'
}

export function LogoutButton({ className, variant = 'sidebar' }: LogoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await authClient.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'menu') {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className={cn(
          'w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition',
          className
        )}
      >
        {loading ? 'Signing out…' : 'Sign out'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={cn(
        'w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition font-medium text-sm disabled:opacity-60',
        className
      )}
    >
      <LogOut className="size-4" />
      {loading ? 'Signing out…' : 'Logout'}
    </button>
  )
}
