/**
 * =============================================================================
 * SAFARI CAMP — CENTRAL IMAGE REGISTRY
 * =============================================================================
 *
 * When you add a file under `public/`, set `recommendedSrc` (and optionally `src`).
 * The UI reads paths via `resolveImageSrc()` — `recommendedSrc` is used automatically.
 * Paths always start with `/` (served from `public/`).
 *
 * Until you add a real file, slots fall back to `/placeholder.svg`.
 *
 * Recommended: WebP or JPG, sRGB, compressed for web (< 400 KB hero, < 200 KB cards).
 */

export const IMAGE_FALLBACK = '/placeholder.svg'

export type ImageSlot = {
  /** Active path served to the UI — set to `recommendedSrc` once the file exists in `public/` */
  src: string
  /** Path to use after you add the file under `public/` (copy into `src`) */
  recommendedSrc: string
  /** Accessible alt text (required for SEO & a11y) */
  alt: string
  /** Pages / components that render this asset */
  usedOn: string[]
  /** Creative direction for photographers or stock selection */
  guidance: string
  /** Suggested aspect ratio (width : height) */
  aspectRatio: string
  /** Minimum width in pixels for acceptable quality */
  minWidth: number
}

function slot(
  partial: Omit<ImageSlot, 'src'> & { src?: string }
): ImageSlot {
  return {
    src: partial.src ?? partial.recommendedSrc ?? IMAGE_FALLBACK,
    recommendedSrc: partial.recommendedSrc,
    alt: partial.alt,
    usedOn: partial.usedOn,
    guidance: partial.guidance,
    aspectRatio: partial.aspectRatio,
    minWidth: partial.minWidth,
  }
}

/** Path actually rendered — prefers explicit `src`, then `recommendedSrc` */
export function resolveImageSrc(slot: ImageSlot): string {
  if (slot.src && slot.src !== IMAGE_FALLBACK) return slot.src
  if (slot.recommendedSrc) return slot.recommendedSrc
  return IMAGE_FALLBACK
}

/** Generated from `public/images/brand/logo.png` via `pnpm brand:icons` */
export const brandIcons = {
  light32: '/icon-light-32x32.png',
  dark32: '/icon-dark-32x32.png',
  apple: '/apple-icon.png',
  favicon: '/favicon.ico',
  pwa192: '/icon-192.png',
  pwa512: '/icon-512.png',
} as const

/** Brand, favicons, and social preview */
export const brandImages = {
  /**
   * WHERE: Site nav, admin sidebar, auth screens.
   * FILE:  `public/images/brand/logo.png`
   */
  logoMark: slot({
    recommendedSrc: '/images/brand/logo.png',
    alt: 'Safari Camp Lodge logo',
    usedOn: ['Nav (all pages)', 'Admin sidebar', 'Footer (future)'],
    guidance:
      'Primary wordmark or mark on transparent background. Warm safari palette.',
    aspectRatio: '16:9',
    minWidth: 256,
  }),

  /**
   * WHERE: Link previews (iMessage, WhatsApp, Twitter/X, Facebook).
   * FILE:  `public/images/brand/og-image.jpg`
   */
  openGraph: slot({
    recommendedSrc: '/images/brand/og-image.jpg',
    alt: 'Safari Camp Lodge — luxury African safari',
    usedOn: ['Social share previews (`app/layout.tsx` metadata)'],
    guidance:
      'Wide hero shot: lodge at golden hour, wildlife, or guests on game drive. No tiny text; safe zone center. Emotional, premium.',
    aspectRatio: '1.91:1',
    minWidth: 1200,
  }),
} as const

/** Landing page (`app/page.tsx`) */
export const homeImages = {
  /**
   * WHERE: Home → Hero section, right column (large panel beside headline).
   */
  hero: slot({
    recommendedSrc: '/images/home/hero2.jpg',
    alt: 'Golden savanna at sunset with wildlife on the African plains',
    usedOn: ['Home `/` → Cinematic full-bleed hero'],
    guidance:
      'Landscape hero: camp tents/lodge, golden hour, dramatic sky. Should feel expansive and aspirational. Avoid busy crowds.',
    aspectRatio: '4:5',
    minWidth: 1200,
  }),

  /**
   * WHERE: Home → "Why Choose Safari Camp?" section, right column.
   */
  whyChooseUs: slot({
    recommendedSrc: '/images/home/why-choose-us.jpg',
    alt: 'Safari guide with guests observing wildlife on the savanna',
    usedOn: ['Home `/` → Why Choose Us (right panel)'],
    guidance:
      'Human connection: guide + guests, binoculars or vehicle, respectful wildlife distance. Trust and expertise.',
    aspectRatio: '4:3',
    minWidth: 1000,
  }),

  /**
   * WHERE: Optional full-bleed behind final CTA (if you enable overlay in page).
   * Set `src` to empty string path only when file exists; otherwise section stays solid color.
   */
  ctaBackground: slot({
    recommendedSrc: '/images/home/cta-background.jpg',
    alt: '',
    usedOn: ['Home `/` → CTA section (optional background)'],
    guidance:
      'Soft, darkened landscape (sunset bush or starry sky) for text overlay. Low contrast, no focal faces.',
    aspectRatio: '21:9',
    minWidth: 1920,
  }),
} as const

/**
 * Accommodation cards — IDs match DB seed & `/book` page (`'1'`–`'4'`).
 * WHERE: Home accommodations grid, Book page selection cards, future admin/listings.
 */
export const accommodationImages = {
  '1': slot({
    recommendedSrc: '/images/accommodations/luxury-tent.jpg',
    alt: 'Luxury glamping tent interior with king bed and canvas walls',
    usedOn: [
      'Home `/` → Luxury Accommodations → Luxury Tent card',
      'Book `/book` → Luxury Tent card',
    ],
    guidance:
      'Premium tent: king bed, crisp linens, subtle lighting, en-suite glimpse. Cozy, not rustic-camping.',
    aspectRatio: '4:3',
    minWidth: 800,
  }),
  '2': slot({
    recommendedSrc: '/images/accommodations/safari-lodge.jpg',
    alt: 'Safari lodge suite with panoramic windows overlooking the bush',
    usedOn: [
      'Home `/` → Safari Lodge card',
      'Book `/book` → Safari Lodge card',
    ],
    guidance:
      'Lodge room: large windows, balcony, polished wood/stone. Emphasize view and space.',
    aspectRatio: '4:3',
    minWidth: 800,
  }),
  '3': slot({
    recommendedSrc: '/images/accommodations/private-cabin.jpg',
    alt: 'Private wilderness cabin with deck and surrounding trees',
    usedOn: [
      'Home `/` → Private Cabin card',
      'Book `/book` → Private Cabin card',
    ],
    guidance:
      'Standalone cabin: deck, forest/bush edge, warm interior visible through windows. Intimate, secluded.',
    aspectRatio: '4:3',
    minWidth: 800,
  }),
  '4': slot({
    recommendedSrc: '/images/accommodations/presidential-suite.jpg',
    alt: 'Presidential suite with private deck, plunge pool, and savanna views',
    usedOn: [
      'Home `/` → Presidential Suite card',
      'Book `/book` → Presidential Suite card',
    ],
    guidance:
      'Ultra-luxury: plunge pool/jacuzzi, private deck, butler-style details. Aspirational, magazine-quality.',
    aspectRatio: '4:3',
    minWidth: 800,
  }),
} as const

export type AccommodationImageId = keyof typeof accommodationImages

/**
 * Experience cards on home (replaces emoji placeholders when images are set).
 */
export const experienceImages = {
  gameDrives: slot({
    recommendedSrc: '/images/experiences/game-drive.jpg',
    alt: 'Open safari vehicle with guests viewing elephants on the savanna',
    usedOn: ['Home `/` → Unforgettable Experiences → Game Drives card'],
    guidance:
      'Classic 4x4 game drive, Big Five or elephants in mid-ground. Excitement, golden light, dust optional.',
    aspectRatio: '16:9',
    minWidth: 800,
  }),
  bushWalks: slot({
    recommendedSrc: '/images/experiences/bush-walk.jpg',
    alt: 'Armed ranger leading a small group on a guided bush walk',
    usedOn: ['Home `/` → Bush Walks card'],
    guidance:
      'Walking safari: ranger in front, 2–4 guests, close-up flora or animal tracks. Ground-level intimacy.',
    aspectRatio: '16:9',
    minWidth: 800,
  }),
  nightSafaris: slot({
    recommendedSrc: '/images/experiences/night-safari.jpg',
    alt: 'Safari vehicle at dusk with spotlight illuminating bush at night',
    usedOn: ['Home `/` → Night Safaris card'],
    guidance:
      'Blue hour or night: spotlight, predator eyes optional, stars. Mysterious but safe/professional tone.',
    aspectRatio: '16:9',
    minWidth: 800,
  }),
} as const

export type ExperienceImageId = keyof typeof experienceImages

/** Auth screens */
export const authImages = {
  /**
   * WHERE: Sign-in / Sign-up (`components/auth-form.tsx`) — side panel on desktop.
   */
  panel: slot({
    recommendedSrc: '/images/auth/welcome-panel.jpg',
    alt: 'Welcome to Safari Camp Lodge at dawn',
    usedOn: ['Sign-in `/sign-in`', 'Sign-up `/sign-up`'],
    guidance:
      'Calm, inviting scene: camp fire, morning tea, or lodge entrance. No faces required; warmth and arrival feeling.',
    aspectRatio: '3:4',
    minWidth: 900,
  }),
} as const

/** Bookings list */
export const bookingImages = {
  /**
   * WHERE: My Bookings when user has zero reservations.
   */
  emptyState: slot({
    recommendedSrc: '/images/bookings/empty-state.jpg',
    alt: 'Tent and savanna inviting you to plan your first safari',
    usedOn: ['Bookings `/bookings` → empty state illustration area'],
    guidance:
      'Friendly, light illustration or photo: empty tent ready, horizon, “adventure awaits”. Not sad/empty.',
    aspectRatio: '16:9',
    minWidth: 800,
  }),

  /**
   * WHERE: Booking cards when no per-stay photo exists yet.
   */
  cardFallback: slot({
    recommendedSrc: '/images/bookings/card-fallback.jpg',
    alt: 'Safari landscape',
    usedOn: ['Bookings `/bookings` → each booking card thumbnail'],
    guidance: 'Generic bush panorama or vehicle silhouette. Works at small card size.',
    aspectRatio: '16:9',
    minWidth: 600,
  }),
} as const

/** Book flow */
export const bookImages = {
  /**
   * WHERE: Top of Book page (optional banner above title).
   */
  headerBanner: slot({
    recommendedSrc: '/images/book/header-banner.jpg',
    alt: 'Panoramic view of Safari Camp Lodge and surrounding reserve',
    usedOn: ['Book `/book` → header banner (wide strip)'],
    guidance:
      'Ultra-wide camp overview: multiple tents/lodge roofs, landscape context. Sets place before room choice.',
    aspectRatio: '21:9',
    minWidth: 1600,
  }),
} as const

// --- Helpers ----------------------------------------------------------------

export function getAccommodationImage(id: string): ImageSlot {
  const key = id as AccommodationImageId
  return accommodationImages[key] ?? accommodationImages['1']
}

export function getExperienceImage(id: ExperienceImageId): ImageSlot {
  return experienceImages[id]
}

/** True when the resolved path is a real asset (not placeholder) */
export function isCustomImage(slot: ImageSlot): boolean {
  const src = resolveImageSrc(slot)
  return src !== IMAGE_FALLBACK && !src.includes('placeholder')
}

/** All slots for documentation / admin tooling */
export const allImageSlots: { category: string; id: string; slot: ImageSlot }[] = [
  ...Object.entries(brandImages).map(([id, slot]) => ({
    category: 'brand',
    id,
    slot,
  })),
  ...Object.entries(homeImages).map(([id, slot]) => ({
    category: 'home',
    id,
    slot,
  })),
  ...Object.entries(accommodationImages).map(([id, slot]) => ({
    category: 'accommodations',
    id,
    slot,
  })),
  ...Object.entries(experienceImages).map(([id, slot]) => ({
    category: 'experiences',
    id,
    slot,
  })),
  ...Object.entries(authImages).map(([id, slot]) => ({
    category: 'auth',
    id,
    slot,
  })),
  ...Object.entries(bookingImages).map(([id, slot]) => ({
    category: 'bookings',
    id,
    slot,
  })),
  ...Object.entries(bookImages).map(([id, slot]) => ({
    category: 'book',
    id,
    slot,
  })),
]
