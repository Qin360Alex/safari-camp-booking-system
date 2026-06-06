'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  IMAGE_QUALITY,
  IMAGE_SIZES,
  presetQuality,
  type ImagePreset,
} from '@/lib/image-display'
import { IMAGE_FALLBACK, resolveImageSrc, type ImageSlot } from '@/lib/images'

type SiteImageProps = {
  slot: ImageSlot
  className?: string
  wrapperClassName?: string
  /** Responsive width hint — picks quality + sizes automatically */
  preset?: ImagePreset
  priority?: boolean
  sizes?: string
  quality?: number
  objectPosition?: string
  variant?: 'fill' | 'intrinsic'
  width?: number
  height?: number
  /** Premium shadow + ring frame */
  framed?: boolean
}

export function SiteImage({
  slot,
  className,
  wrapperClassName,
  preset = 'halfPage',
  priority = false,
  sizes,
  quality,
  objectPosition = 'center',
  variant = 'fill',
  width,
  height,
  framed = false,
}: SiteImageProps) {
  const [failed, setFailed] = useState(false)
  const src = failed ? IMAGE_FALLBACK : resolveImageSrc(slot)
  const resolvedSizes = sizes ?? IMAGE_SIZES[preset]
  const resolvedQuality = quality ?? presetQuality(preset)

  const imageClass = cn(
    'object-cover will-change-transform',
    className
  )

  const imageProps = {
    src,
    alt: slot.alt,
    priority,
    sizes: resolvedSizes,
    quality: resolvedQuality,
    onError: () => setFailed(true),
    style: { objectPosition } as const,
  }

  if (variant === 'intrinsic' && width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
        className={imageClass}
      />
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        framed && 'photo-frame',
        wrapperClassName
      )}
    >
      <Image {...imageProps} fill className={imageClass} />
    </div>
  )
}
