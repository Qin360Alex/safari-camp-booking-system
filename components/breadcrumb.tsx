'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Link href="/" className="hover:text-primary transition">
          Home
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="size-4" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
