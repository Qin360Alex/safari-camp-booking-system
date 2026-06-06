import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteImage } from '@/components/site-image'
import { getAccommodationImage } from '@/lib/images'
import type { LodgePackage } from '@/lib/landing-data'

type PackageCardProps = {
  pkg: LodgePackage
  /** When set, card title links here (e.g. `/accommodations/1`) */
  detailHref?: string
}

export function PackageCard({ pkg, detailHref }: PackageCardProps) {
  return (
    <article className="group flex flex-col photo-frame bg-card overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden">
        {detailHref ? (
          <Link href={detailHref} className="absolute inset-0 z-[1]">
            <SiteImage
              slot={getAccommodationImage(pkg.id)}
              preset="cardGrid"
              objectPosition="center"
              wrapperClassName="absolute inset-0"
              className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </Link>
        ) : (
          <SiteImage
            slot={getAccommodationImage(pkg.id)}
            preset="cardGrid"
            objectPosition="center"
            wrapperClassName="absolute inset-0"
            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 photo-overlay-bottom opacity-80" />
        {pkg.badge && (
          <span className="absolute top-4 left-4 z-10 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary text-secondary-foreground shadow-md">
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-2">
          {pkg.locations.map((loc) => (
            <span
              key={loc}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/15 text-white backdrop-blur-sm border border-white/20"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-7">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span>{pkg.nightsLabel}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" />
            Up to {pkg.capacity}
          </span>
        </div>

        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {detailHref ? (
            <Link href={detailHref}>{pkg.name}</Link>
          ) : (
            pkg.name
          )}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
          {pkg.longDescription}
        </p>

        <div className="flex items-end justify-between gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">From</p>
            <p className="font-serif text-2xl font-bold text-primary">
              ${pkg.price}
              <span className="text-sm font-sans font-normal text-muted-foreground">
                /night
              </span>
            </p>
          </div>
          <Link href={detailHref ?? '/book'}>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 gap-1.5 shrink-0"
            >
              {detailHref ? 'View details' : 'View & Book'}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
