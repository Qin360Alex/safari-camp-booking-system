'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  bookings,
  bookingLineItems,
  roomInventory,
  accommodations,
} from '@/lib/db/schema'
import { and, eq, gte, lt, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Get all bookings for the current user
export async function getUserBookings() {
  const userId = await getUserId()
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt))
}

// Get a single booking by ID
export async function getBookingById(bookingId: string) {
  try {
    const userId = await getUserId()
    const booking = await db
      .select()
      .from(bookings)
      .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)))
      .limit(1)

    if (!booking.length) return null

    return booking[0]
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}

// Get a single booking with line items
export async function getBookingWithItems(bookingId: string) {
  const userId = await getUserId()
  const booking = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)))
    .limit(1)

  if (!booking.length) throw new Error('Booking not found')

  const items = await db
    .select()
    .from(bookingLineItems)
    .where(eq(bookingLineItems.bookingId, bookingId))

  return { booking: booking[0], items }
}

// Check availability for a date range
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

  // All dates must have available rooms
  const isAvailable = dates.every(date => {
    const inv = inventory.find(
      i => new Date(i.date).toDateString() === date.toDateString()
    )
    return inv && inv.availableRooms > 0
  })

  return isAvailable
}

// Create a new booking (simplified for MVP)
export async function createBooking(data: {
  accommodationId: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  specialRequests?: string
}) {
  const userId = await getUserId()

  // Verify availability
  const isAvailable = await checkAvailability(
    data.accommodationId,
    data.checkInDate,
    data.checkOutDate
  )

  if (!isAvailable) throw new Error('Accommodation not available for selected dates')

  const bookingId = nanoid()

  // Create booking
  await db.insert(bookings).values({
    id: bookingId,
    userId,
    status: 'pending',
    checkInDate: new Date(data.checkInDate),
    checkOutDate: new Date(data.checkOutDate),
    totalPrice: data.totalPrice.toString(),
    paymentStatus: 'unpaid',
    specialRequests: data.specialRequests,
  })

  // Create line item
  const accommodation = await db
    .select()
    .from(accommodations)
    .where(eq(accommodations.id, data.accommodationId))
    .limit(1)

  if (!accommodation.length) throw new Error('Accommodation not found')

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
    pricePerNight: accommodation[0].pricePerNight,
    subtotal: (Number(accommodation[0].pricePerNight) * nights).toString(),
  })

  revalidatePath('/bookings')
  return bookingId
}

// Cancel a booking
export async function cancelBooking(bookingId: string) {
  const userId = await getUserId()

  const booking = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)))
    .limit(1)

  if (!booking.length) throw new Error('Booking not found')

  await db
    .update(bookings)
    .set({
      status: 'cancelled',
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId))

  revalidatePath('/bookings')
}

// Helper function to get all dates in range
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = []
  const currentDate = new Date(startDate)

  while (currentDate < endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
