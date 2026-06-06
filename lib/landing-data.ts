import type { ExperienceImageId } from '@/lib/images'

export const heroStats = [
  { value: '25+', label: 'Years of excellence' },
  { value: '5K+', label: 'Happy guests' },
  { value: '98%', label: 'Guest satisfaction' },
] as const

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Choose your stay',
    description:
      'Browse luxury tents, lodge suites, and private cabins — each crafted for comfort in the wild.',
  },
  {
    step: '02',
    title: 'Secure your dates',
    description:
      'Pick check-in and check-out, add special requests, and confirm your reservation online.',
  },
  {
    step: '03',
    title: 'Arrive & explore',
    description:
      'Meet your guide, settle into camp, and embark on game drives and bush experiences.',
  },
] as const

export type LodgePackage = {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  capacity: number
  nightsLabel: string
  locations: string[]
  badge?: string
}

export const lodgePackages: LodgePackage[] = [
  {
    id: '1',
    name: 'Luxury Tent',
    description: 'Premium glamping with all modern amenities',
    longDescription:
      'Spacious canvas suites with en-suite bathrooms, king beds, and private decks overlooking the savanna.',
    price: 299,
    capacity: 2,
    nightsLabel: 'From 1 night',
    locations: ['Glamping', 'Bushveld'],
    badge: 'Popular',
  },
  {
    id: '2',
    name: 'Safari Lodge',
    description: 'Spacious suites with panoramic views',
    longDescription:
      'Elevated lodge rooms with floor-to-ceiling windows, private balconies, and uninterrupted wilderness views.',
    price: 399,
    capacity: 2,
    nightsLabel: 'From 2 nights',
    locations: ['Lodge', 'Panorama'],
  },
  {
    id: '3',
    name: 'Private Cabin',
    description: 'Intimate retreats in the wilderness',
    longDescription:
      'Secluded timber cabins with living areas, outdoor decks, and direct access to nature trails.',
    price: 499,
    capacity: 4,
    nightsLabel: 'From 2 nights',
    locations: ['Forest edge', 'Family'],
  },
  {
    id: '4',
    name: 'Presidential Suite',
    description: 'Exclusive luxury accommodation',
    longDescription:
      'Our finest offering — private plunge pool, dedicated chef service, and exclusive game-drive access.',
    price: 699,
    capacity: 4,
    nightsLabel: 'From 3 nights',
    locations: ['Exclusive', 'Premium'],
    badge: 'Signature',
  },
]

export const experiences = [
  {
    id: 1,
    imageKey: 'gameDrives' as ExperienceImageId,
    title: 'Game Drives',
    description:
      'Expert-guided safari tours featuring the Big Five and countless other species across golden savanna.',
    duration: '3–4 hours',
  },
  {
    id: 2,
    imageKey: 'bushWalks' as ExperienceImageId,
    title: 'Bush Walks',
    description:
      'Immersive guided nature walks through pristine landscapes with armed rangers and naturalists.',
    duration: '2–3 hours',
  },
  {
    id: 3,
    imageKey: 'nightSafaris' as ExperienceImageId,
    title: 'Night Safaris',
    description:
      'Discover nocturnal predators, star-filled skies, and the bush after dark with spotlight safaris.',
    duration: '4 hours',
  },
] as const

export const features = [
  {
    title: 'Expert Guides',
    description:
      'Decades of combined experience in wildlife tracking, conservation, and guest hospitality.',
  },
  {
    title: 'World-Class Dining',
    description:
      'Gourmet meals crafted from local ingredients by professional chefs under the African sky.',
  },
  {
    title: '24/7 Concierge',
    description:
      'Dedicated support from booking through checkout — your comfort is our priority.',
  },
  {
    title: 'Sustainable Tourism',
    description:
      'Committed to preserving wildlife habitats and supporting local communities.',
  },
] as const

export const trustHighlights = [
  'Award-winning hospitality',
  'Conservation partners',
  'Secure online booking',
  'Flexible cancellation',
] as const

export const contactInfo = {
  email: 'hello@safaricamplodge.com',
  phone: '+254 (0) 700 123 456',
  address: 'Maasai Mara, Kenya',
} as const
