'use server'

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
} from '@/lib/db/schema'
import { eq, desc, and, gte, count } from 'drizzle-orm'
import { requirePermission } from '@/lib/session'
import type { Permission } from '@/lib/rbac'

async function assertPerm(permission: Permission) {
  await requirePermission(permission)
}

export async function getAdminDashboardKPIs() {
  await assertPerm('booking:read:all')

  const [totalBookings, totalRevenue, activeGuides, activeVehicles] =
    await Promise.all([
      db.select({ count: count() }).from(bookings),
      db
        .select({ total: count() })
        .from(bookings)
        .where(eq(bookings.paymentStatus, 'paid')),
      db.select({ count: count() }).from(guides).where(eq(guides.isActive, true)),
      db
        .select({ count: count() })
        .from(vehicles)
        .where(eq(vehicles.isActive, true)),
    ])

  return {
    totalBookings: totalBookings[0]?.count || 0,
    paidBookings: totalRevenue[0]?.count || 0,
    activeGuides: activeGuides[0]?.count || 0,
    activeVehicles: activeVehicles[0]?.count || 0,
  }
}

export async function getAdminBookings(limit = 50, offset = 0) {
  await assertPerm('booking:read:all')

  return db
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
}

export async function getAdminAccommodations() {
  await assertPerm('content:read')

  return db
    .select()
    .from(accommodations)
    .orderBy(desc(accommodations.createdAt))
}

export async function getAdminGuides() {
  await assertPerm('content:read')

  return db.select().from(guides).orderBy(desc(guides.createdAt))
}

export async function getAdminDrivers() {
  await assertPerm('content:read')

  return db.select().from(drivers).orderBy(desc(drivers.createdAt))
}

export async function getAdminVehicles() {
  await assertPerm('content:read')

  return db.select().from(vehicles).orderBy(desc(vehicles.createdAt))
}

export async function getAdminTransfers() {
  await assertPerm('content:read')

  return db.select().from(transfers).orderBy(desc(transfers.createdAt))
}

export async function getAdminGuests() {
  await assertPerm('guest:read:all')

  return db.select().from(guests).orderBy(desc(guests.createdAt))
}

export async function updateBookingStatus(bookingId: string, newStatus: string) {
  await assertPerm('booking:update')

  const validStatuses = [
    'pending',
    'confirmed',
    'checked_in',
    'checked_out',
    'cancelled',
  ]
  if (!validStatuses.includes(newStatus)) {
    throw new Error('Invalid booking status')
  }

  await db
    .update(bookings)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(bookings.id, bookingId))

  return { success: true }
}

export async function getBookingDetails(bookingId: string) {
  await assertPerm('booking:read:all')

  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1)

  if (!booking) return null

  const items = await db
    .select()
    .from(bookingLineItems)
    .where(eq(bookingLineItems.bookingId, bookingId))

  return { booking, items }
}

export async function getRevenueAnalytics(daysBack = 30) {
  await assertPerm('analytics:read')

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)

  return db
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
}

export async function getOccupancyAnalytics() {
  await assertPerm('analytics:read')

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

/** Lightweight KPIs for staff without analytics permission */
export async function getStaffDashboardKPIs() {
  await assertPerm('booking:read:all')

  const [totalBookings, pendingBookings] = await Promise.all([
    db.select({ count: count() }).from(bookings),
    db
      .select({ count: count() })
      .from(bookings)
      .where(eq(bookings.status, 'pending')),
  ])

  return {
    totalBookings: totalBookings[0]?.count || 0,
    pendingBookings: pendingBookings[0]?.count || 0,
  }
}
