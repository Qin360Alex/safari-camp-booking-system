'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { IMAGE_QUALITY } from '@/lib/image-display'
import { IMAGE_FALLBACK, brandImages, resolveImageSrc } from '@/lib/images'

type SiteLogoProps = {
  className?: string
  href?: string
  showWordmark?: boolean
  /** `light` = on dark backgrounds (hero/footer). `dark` = on light backgrounds. */
  variant?: 'light' | 'dark'
}

export function SiteLogo({
  className,
  href = '/',
  showWordmark = false,
  variant = 'dark',
}: SiteLogoProps) {
  const [failed, setFailed] = useState(false)
  const src = failed ? IMAGE_FALLBACK : resolveImageSrc(brandImages.logoMark)
  const isLight = variant === 'light'

  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={src}
        alt="Safari Camp Lodge"
        width={320}
        height={112}
        quality={IMAGE_QUALITY.logo}
        sizes="180px"
        className={cn(
          'h-9 sm:h-10 w-auto max-w-[180px] object-contain object-left transition-[filter] duration-300',
          isLight && 'brightness-0 invert'
        )}
        onError={() => setFailed(true)}
        priority
      />
      {showWordmark && (
        <span
          className={cn(
            'font-serif text-xl font-bold hidden sm:inline',
            isLight ? 'text-white' : 'text-primary'
          )}
        >
          Safari Camp
        </span>
      )}
    </span>
  )

  return href ? (
    <Link href={href} className="shrink-0">
      {content}
    </Link>
  ) : (
    content
  )
}
