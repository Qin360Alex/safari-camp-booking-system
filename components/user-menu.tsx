'use client'

import Link from 'next/link'
import { ChevronDown, LayoutDashboard, Shield, User } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { canAccessAdminPortal, parseRole, roleLabel } from '@/lib/rbac'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/logout-button'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

type UserMenuProps = {
  variant?: 'light' | 'dark'
}

export function UserMenu({ variant = 'dark' }: UserMenuProps) {
  const { data: session, isPending } = authClient.useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isLight = variant === 'light'

  if (isPending) {
    return (
      <div
        className={cn(
          'h-9 w-24 rounded-md animate-pulse',
          isLight ? 'bg-white/20' : 'bg-muted'
        )}
      />
    )
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/auth/sign-in">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'border',
              isLight
                ? 'border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm'
                : 'border-border'
            )}
          >
            Sign In
          </Button>
        </Link>
        <Link href="/book">
          <Button
            size="sm"
            className={cn(
              isLight
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg'
                : 'bg-primary hover:bg-primary/90'
            )}
          >
            Book Now
          </Button>
        </Link>
      </div>
    )
  }

  const role = parseRole((session.user as { role?: string }).role)
  const initials = session.user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex items-center gap-3" ref={ref}>
      <Link href="/book" className="hidden sm:block">
        <Button
          size="sm"
          className={cn(
            isLight
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              : 'bg-primary hover:bg-primary/90'
          )}
        >
          Book Now
        </Button>
      </Link>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex items-center gap-2 rounded-full pl-1 pr-2 py-1 border transition',
            isLight
              ? 'border-white/30 bg-white/10 hover:bg-white/20 text-white'
              : 'border-border bg-card hover:bg-muted text-foreground'
          )}
        >
          <span
            className={cn(
              'size-8 rounded-full flex items-center justify-center text-xs font-bold',
              isLight ? 'bg-white/20' : 'bg-primary/10 text-primary'
            )}
          >
            {initials || <User className="size-4" />}
          </span>
          <span className="text-sm font-medium max-w-[100px] truncate hidden sm:inline">
            {session.user.name?.split(' ')[0]}
          </span>
          <ChevronDown className="size-4 opacity-70" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-semibold truncate">{session.user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {session.user.email}
              </p>
              {canAccessAdminPortal(role) && (
                <p className="text-xs text-primary mt-1">{roleLabel(role)}</p>
              )}
            </div>
            <Link
              href="/guest/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard className="size-4" />
              My Bookings
            </Link>
            <Link
              href="/guest/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition"
              onClick={() => setOpen(false)}
            >
              <User className="size-4" />
              Profile
            </Link>
            {canAccessAdminPortal(role) && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition"
                onClick={() => setOpen(false)}
              >
                <Shield className="size-4" />
                Admin Portal
              </Link>
            )}
            <div className="border-t border-border mt-1 pt-1 px-1">
              <LogoutButton variant="menu" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
