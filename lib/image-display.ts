/** Shared tuning for sharp, retina-ready photography across the site */

export const IMAGE_QUALITY = {
  /** Hero / full-bleed editorial */
  hero: 92,
  /** Cards, grids, panels */
  standard: 90,
  /** Logos & small UI marks */
  logo: 95,
} as const

/**
 * Tells Next.js Image what width to generate (must match rendered CSS size × ~2 for retina).
 * @see https://nextjs.org/docs/app/api-reference/components/image#sizes
 */
export const IMAGE_SIZES = {
  /** Full viewport width — cinematic hero, CTA backgrounds */
  fullBleed: '100vw',
  /** Half-page column on desktop */
  halfPage:
    '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px',
  /** Accommodation / booking cards in a 4-col grid */
  cardGrid:
    '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 400px',
  /** Taller cards in 2-col booking layout */
  cardLarge:
    '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px',
  /** Experience row (3 columns) */
  experience:
    '(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 480px',
  /** Auth side panel */
  authPanel: '(max-width: 1024px) 0px, 480px',
  /** Booking list thumbnails */
  thumbnail: '(max-width: 768px) 100vw, 400px',
  /** Wide header strip */
  banner: '100vw',
} as const

export type ImagePreset = keyof typeof IMAGE_SIZES

export function presetQuality(preset: ImagePreset): number {
  if (preset === 'fullBleed' || preset === 'halfPage' || preset === 'banner') {
    return IMAGE_QUALITY.hero
  }
  return IMAGE_QUALITY.standard
}
