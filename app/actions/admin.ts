'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  bookings,
  accommodations,
  guides,
  drivers,
  vehicles,
  transfers,
  guests,
  bookingLineItems,
  activities,
} from '@/lib/db/schema'
import { eq, desc, and, gte, lte, count } from 'drizzle-orm'
import { headers } from 'next/headers'

// Helper: Verify admin access
async function getAdminUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized: Not authenticated')
  // In a real app, check user role from database
  return session.user
}

// Dashboard KPIs
export async function getAdminDashboardKPIs() {
  await getAdminUser()

  const [totalBookings, totalRevenue, activeGuides, activeVehicles] = await Promise.all([
    db.select({ count: count() }).from(bookings),
    db
      .select({ total: count() })
      .from(bookings)
      .where(eq(bookings.paymentStatus, 'paid')),
    db.select({ count: count() }).from(guides).where(eq(guides.isActive, true)),
    db.select({ count: count() }).from(vehicles).where(eq(vehicles.isActive, true)),
  ])

  return {
    totalBookings: totalBookings[0]?.count || 0,
    paidBookings: totalRevenue[0]?.count || 0,
    activeGuides: activeGuides[0]?.count || 0,
    activeVehicles: activeVehicles[0]?.count || 0,
  }
}

// Get all bookings for admin
export async function getAdminBookings(limit = 50, offset = 0) {
  await getAdminUser()

  const bookingsList = await db
    .select({
      id: bookings.id,
      userId: bookings.userId,
      status: bookings.status,
      checkInDate: bookings.checkInDate,
      checkOutDate: bookings.checkOutDate,
      totalPrice: bookings.totalPrice,
      paymentStatus: bookings.paymentStatus,
      createdAt: bookings.createdAt,
    })
    .from(bookings)
    .orderBy(desc(bookings.createdAt))
    .limit(limit)
    .offset(offset)

  return bookingsList
}

// Get all accommodations for admin
export async function getAdminAccommodations() {
  await getAdminUser()

  return await db
    .select()
    .from(accommodations)
    .orderBy(desc(accommodations.createdAt))
}

// Get all guides for admin
export async function getAdminGuides() {
  await getAdminUser()

  return await db
    .select()
    .from(guides)
    .orderBy(desc(guides.createdAt))
}

// Get all drivers for admin
export async function getAdminDrivers() {
  await getAdminUser()

  return await db
    .select()
    .from(drivers)
    .orderBy(desc(drivers.createdAt))
}

// Get all vehicles for admin
export async function getAdminVehicles() {
  await getAdminUser()

  return await db
    .select()
    .from(vehicles)
    .orderBy(desc(vehicles.createdAt))
}

// Get all transfers for admin
export async function getAdminTransfers() {
  await getAdminUser()

  return await db
    .select()
    .from(transfers)
    .orderBy(desc(transfers.createdAt))
}

// Get all guests for admin
export async function getAdminGuests() {
  await getAdminUser()

  return await db
    .select()
    .from(guests)
    .orderBy(desc(guests.createdAt))
}

// Update booking status
export async function updateBookingStatus(bookingId: string, newStatus: string) {
  await getAdminUser()

  const validStatuses = ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled']
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid booking status')
  }

  await db
    .update(bookings)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(bookings.id, bookingId))

  return { success: true }
}

// Get booking details with line items
export async function getBookingDetails(bookingId: string) {
  await getAdminUser()

  const booking = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1)

  if (!booking.length) return null

  const items = await db
    .select()
    .from(bookingLineItems)
    .where(eq(bookingLineItems.bookingId, bookingId))

  return {
    booking: booking[0],
    items,
  }
}

// Create analytics data
export async function getRevenueAnalytics(daysBack = 30) {
  await getAdminUser()

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  const revenue = await db
    .select({
      date: bookings.createdAt,
      total: bookings.totalPrice,
      status: bookings.paymentStatus,
    })
    .from(bookings)
    .where(
      and(
        gte(bookings.createdAt, startDate),
        eq(bookings.paymentStatus, 'paid')
      )
    )
    .orderBy(desc(bookings.createdAt))

  return revenue
}

// Get occupancy analytics
export async function getOccupancyAnalytics() {
  await getAdminUser()

  const accommodationStats = await Promise.all(
    (await getAdminAccommodations()).map(async (acc) => {
      const bookedDays = await db
        .select({ count: count() })
        .from(bookingLineItems)
        .where(eq(bookingLineItems.accommodationId, acc.id))

      return {
        id: acc.id,
        name: acc.name,
        totalCapacity: acc.capacity,
        bookings: bookedDays[0]?.count || 0,
      }
    })
  )

  return accommodationStats
}
