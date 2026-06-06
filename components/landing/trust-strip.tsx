import { Shield, Leaf, Star, Lock } from 'lucide-react'
import { trustHighlights } from '@/lib/landing-data'

const icons = [Star, Shield, Lock, Leaf] as const

export function TrustStrip() {
  return (
    <section className="py-10 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustHighlights.map((label, i) => {
            const Icon = icons[i] ?? Star
            return (
              <div
                key={label}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-foreground/90">
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
