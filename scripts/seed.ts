/**
 * Seeds Neon DB: admin user, accommodations, inventory, activities.
 * Run: pnpm db:seed
 */
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { auth } from '../lib/auth'
import { db, pool } from '../lib/db'
import { getAccommodationImage, resolveImageSrc } from '../lib/images'
import {
  accommodations,
  activities,
  roomInventory,
  user,
} from '../lib/db/schema'

const ADMIN_EMAIL = 'qinalexander56@gmail.com'
const ADMIN_NAME = 'Qin Alexander'

const ACCOMMODATIONS = [
  {
    id: '1',
    name: 'Luxury Tent',
    type: 'tent',
    capacity: 2,
    description: 'Premium glamping with all modern amenities',
    pricePerNight: '299.00',
    amenities: ['WiFi', 'En-suite Bathroom', 'Indoor Heating', 'King Bed'],
  },
  {
    id: '2',
    name: 'Safari Lodge',
    type: 'lodge',
    capacity: 2,
    description: 'Spacious suites with panoramic views',
    pricePerNight: '399.00',
    amenities: ['WiFi', 'Private Balcony', 'Air Conditioning', 'Minibar'],
  },
  {
    id: '3',
    name: 'Private Cabin',
    type: 'cabin',
    capacity: 4,
    description: 'Intimate retreats in the wilderness',
    pricePerNight: '499.00',
    amenities: ['WiFi', 'Living Room', 'Kitchen', 'Private Deck'],
  },
  {
    id: '4',
    name: 'Presidential Suite',
    type: 'glamping',
    capacity: 4,
    description: 'Exclusive luxury accommodation',
    pricePerNight: '699.00',
    amenities: ['WiFi', 'Jacuzzi', 'Private Chef', 'Concierge'],
  },
] as const

const ACTIVITY_SEED = [
  {
    name: 'Morning Game Drive',
    description: 'Sunrise wildlife viewing in open 4x4 vehicles',
    activityType: 'game_drive',
    durationHours: '3.0',
    maxParticipants: 6,
    pricePerPerson: '85.00',
  },
  {
    name: 'Bush Walk',
    description: 'Guided walking safari with armed ranger',
    activityType: 'bush_walk',
    durationHours: '2.0',
    maxParticipants: 8,
    pricePerPerson: '65.00',
  },
  {
    name: 'Night Safari',
    description: 'Nocturnal predators and stargazing experience',
    activityType: 'night_safari',
    durationHours: '2.5',
    maxParticipants: 6,
    pricePerPerson: '95.00',
  },
]

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

async function seedAdmin() {
  const password =
    process.env.SEED_ADMIN_PASSWORD ?? 'SafariCampAdmin2026!'

  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, ADMIN_EMAIL))
    .limit(1)

  if (existing.length > 0) {
    await db
      .update(user)
      .set({
        role: 'admin',
        emailVerified: true,
        name: ADMIN_NAME,
        updatedAt: new Date(),
      })
      .where(eq(user.email, ADMIN_EMAIL))
    console.log(`Admin already exists (${ADMIN_EMAIL}) — role set to admin`)
    return
  }

  const result = await auth.api.signUpEmail({
    body: {
      email: ADMIN_EMAIL,
      password,
      name: ADMIN_NAME,
    },
  })

  if (result.error) {
    throw new Error(
      `Failed to create admin: ${result.error.message ?? 'unknown error'}`
    )
  }

  const userId = result.user?.id
  if (!userId) throw new Error('Admin sign-up succeeded but no user id returned')

  await db
    .update(user)
    .set({
      role: 'admin',
      emailVerified: true,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId))

  console.log(`Admin created: ${ADMIN_EMAIL}`)
  console.log(`  Password: (from SEED_ADMIN_PASSWORD or default SafariCampAdmin2026!)`)
}

async function seedAccommodations() {
  for (const acc of ACCOMMODATIONS) {
    const imageUrl = resolveImageSrc(getAccommodationImage(acc.id))

    await db
      .insert(accommodations)
      .values({
        id: acc.id,
        name: acc.name,
        type: acc.type,
        capacity: acc.capacity,
        description: acc.description,
        pricePerNight: acc.pricePerNight,
        amenities: [...acc.amenities],
        imageUrl,
      })
      .onConflictDoUpdate({
        target: accommodations.id,
        set: {
          name: acc.name,
          type: acc.type,
          capacity: acc.capacity,
          description: acc.description,
          pricePerNight: acc.pricePerNight,
          amenities: [...acc.amenities],
          imageUrl,
          updatedAt: new Date(),
        },
      })
  }
  console.log(`Seeded ${ACCOMMODATIONS.length} accommodations`)
}

async function seedRoomInventory(daysAhead = 120, roomsPerType = 4) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let count = 0

  for (const acc of ACCOMMODATIONS) {
    for (let i = 0; i < daysAhead; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      const dateStr = formatDate(d)
      const id = `${acc.id}-${dateStr}`

      await db
        .insert(roomInventory)
        .values({
          id,
          accommodationId: acc.id,
          date: dateStr,
          totalRooms: roomsPerType,
          availableRooms: roomsPerType,
          versionNumber: 0,
        })
        .onConflictDoUpdate({
          target: roomInventory.id,
          set: {
            totalRooms: roomsPerType,
            availableRooms: roomsPerType,
            updatedAt: new Date(),
          },
        })
      count++
    }
  }
  console.log(`Seeded ${count} room inventory rows (${daysAhead} days × ${ACCOMMODATIONS.length} types)`)
}

async function seedActivities() {
  for (const act of ACTIVITY_SEED) {
    const id = nanoid()
    const existing = await db
      .select()
      .from(activities)
      .where(eq(activities.name, act.name))
      .limit(1)

    if (existing.length > 0) continue

    await db.insert(activities).values({
      id,
      name: act.name,
      description: act.description,
      activityType: act.activityType,
      durationHours: act.durationHours,
      maxParticipants: act.maxParticipants,
      pricePerPerson: act.pricePerPerson,
      isActive: true,
    })
  }
  console.log(`Seeded activities (skipped duplicates by name)`)
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required. Copy .env.example to .env.local')
  }
  if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error('BETTER_AUTH_SECRET is required in .env.local')
  }

  console.log('Seeding Safari Camp database...\n')
  await seedAdmin()
  await seedAccommodations()
  await seedRoomInventory()
  await seedActivities()
  console.log('\nDone.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => pool.end())
