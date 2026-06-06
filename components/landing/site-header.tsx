'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'
import { UserMenu } from '@/components/user-menu'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/accommodations', label: 'Stays' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/guides', label: 'Guides' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isLight = !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <SiteLogo variant={isLight ? 'light' : 'dark'} />

            <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors',
                    isLight
                      ? 'text-white/90 hover:text-white'
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <UserMenu variant={isLight ? 'light' : 'dark'} />
            </div>

            <button
              type="button"
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isLight
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-muted'
              )}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute top-[4.25rem] left-0 right-0 bg-background border-b border-border shadow-xl p-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <UserMenu variant="dark" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
