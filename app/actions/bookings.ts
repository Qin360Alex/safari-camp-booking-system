'use server'

import { db } from '@/lib/db'
import {
  bookings,
  bookingLineItems,
  roomInventory,
  accommodations,
  user,
} from '@/lib/db/schema'
import { and, eq, gte, lt, desc, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'
import {
  getAuthContext,
  requirePermission,
  requireUser,
  requireVerifiedUser,
} from '@/lib/session'
import { hasPermission } from '@/lib/rbac'

async function assertBookingAccess(bookingId: string, userId: string) {
  const ctx = await getAuthContext()
  if (!ctx) throw new Error('Unauthorized')

  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1)

  if (!booking) return null

  const isOwner = booking.userId === userId
  const isStaff = hasPermission(ctx.role, 'booking:read:all')

  if (!isOwner && !isStaff) throw new Error('Forbidden')

  return booking
}

export async function getUserBookings() {
  const ctx = await requireUser()
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, ctx.id))
    .orderBy(desc(bookings.createdAt))
}

export async function getBookingById(bookingId: string) {
  try {
    const ctx = await requireUser()
    const booking = await assertBookingAccess(bookingId, ctx.id)
    return booking
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}

export async function getBookingWithItems(bookingId: string) {
  const ctx = await requireUser()
  const booking = await assertBookingAccess(bookingId, ctx.id)
  if (!booking) throw new Error('Booking not found')

  const items = await db
    .select()
    .from(bookingLineItems)
    .where(eq(bookingLineItems.bookingId, bookingId))

  return { booking, items }
}

/** Staff-only: lookup bookings by guest email (controlled support access) */
export async function searchBookingsByGuestEmail(email: string) {
  await requirePermission('guest:support')

  const trimmed = email.trim().toLowerCase()
  if (!trimmed || !trimmed.includes('@')) {
    throw new Error('Enter a valid guest email address')
  }

  const guestUsers = await db
    .select({ id: user.id, name: user.name, email: user.email })
    .from(user)
    .where(ilike(user.email, trimmed))
    .limit(5)

  if (!guestUsers.length) return { guests: [], bookings: [] }

  const results = await Promise.all(
    guestUsers.map(async (guest) => {
      const guestBookings = await db
        .select()
        .from(bookings)
        .where(eq(bookings.userId, guest.id))
        .orderBy(desc(bookings.createdAt))
        .limit(20)

      return { guest, bookings: guestBookings }
    })
  )

  return { results }
}

export async function checkAvailability(
  accommodationId: string,
  checkInDate: string,
  checkOutDate: string
) {
  const dates = getDatesInRange(new Date(checkInDate), new Date(checkOutDate))

  const inventory = await db
    .select()
    .from(roomInventory)
    .where(
      and(
        eq(roomInventory.accommodationId, accommodationId),
        and(
          gte(roomInventory.date, checkInDate),
          lt(roomInventory.date, checkOutDate)
        )
      )
    )

  return dates.every((date) => {
    const inv = inventory.find(
      (i) => new Date(i.date).toDateString() === date.toDateString()
    )
    return inv && inv.availableRooms > 0
  })
}

export async function createBooking(data: {
  accommodationId: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  specialRequests?: string
}) {
  const ctx = await requireVerifiedUser()

  const isAvailable = await checkAvailability(
    data.accommodationId,
    data.checkInDate,
    data.checkOutDate
  )

  if (!isAvailable) {
    throw new Error('Accommodation not available for selected dates')
  }

  const bookingId = nanoid()

  await db.insert(bookings).values({
    id: bookingId,
    userId: ctx.id,
    status: 'pending',
    checkInDate: new Date(data.checkInDate),
    checkOutDate: new Date(data.checkOutDate),
    totalPrice: data.totalPrice.toString(),
    paymentStatus: 'unpaid',
    specialRequests: data.specialRequests,
  })

  const [accommodation] = await db
    .select()
    .from(accommodations)
    .where(eq(accommodations.id, data.accommodationId))
    .limit(1)

  if (!accommodation) throw new Error('Accommodation not found')

  const nights = Math.ceil(
    (new Date(data.checkOutDate).getTime() -
      new Date(data.checkInDate).getTime()) /
      (1000 * 60 * 60 * 24)
  )

  await db.insert(bookingLineItems).values({
    id: nanoid(),
    bookingId,
    accommodationId: data.accommodationId,
    checkInDate: new Date(data.checkInDate),
    checkOutDate: new Date(data.checkOutDate),
    roomsBooked: 1,
    pricePerNight: accommodation.pricePerNight,
    subtotal: (Number(accommodation.pricePerNight) * nights).toString(),
  })

  revalidatePath('/guest/dashboard')
  return bookingId
}

export async function cancelBooking(bookingId: string) {
  const ctx = await requireUser()
  const booking = await assertBookingAccess(bookingId, ctx.id)
  if (!booking) throw new Error('Booking not found')

  await db
    .update(bookings)
    .set({ status: 'cancelled', updatedAt: new Date() })
    .where(eq(bookings.id, bookingId))

  revalidatePath('/guest/dashboard')
}

function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = []
  const currentDate = new Date(startDate)

  while (currentDate < endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
