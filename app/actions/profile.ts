'use server'

import { db } from '@/lib/db'
import { guests, user } from '@/lib/db/schema'
import { requireUser } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  const ctx = await requireUser()

  const [guestRow] = await db
    .select()
    .from(guests)
    .where(eq(guests.userId, ctx.id))
    .limit(1)

  return {
    id: ctx.id,
    email: ctx.email,
    name: ctx.name,
    role: ctx.role,
    emailVerified: ctx.emailVerified,
    image: ctx.image,
    phone: guestRow?.emergencyContactPhone ?? '',
    nationality: guestRow?.nationality ?? '',
    passportNumber: guestRow?.passportNumber ?? '',
    emergencyContactName: guestRow?.emergencyContactName ?? '',
    emergencyContactPhone: guestRow?.emergencyContactPhone ?? '',
    createdAt: guestRow?.createdAt?.toISOString() ?? null,
  }
}

export async function updateProfile(data: {
  name: string
  phone?: string
  nationality?: string
  passportNumber?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
}) {
  const ctx = await requireUser()

  await db
    .update(user)
    .set({
      name: data.name.trim(),
      updatedAt: new Date(),
    })
    .where(eq(user.id, ctx.id))

  const [existingGuest] = await db
    .select({ id: guests.id })
    .from(guests)
    .where(eq(guests.userId, ctx.id))
    .limit(1)

  const guestPayload = {
    nationality: data.nationality?.trim() || null,
    passportNumber: data.passportNumber?.trim() || null,
    emergencyContactName: data.emergencyContactName?.trim() || null,
    emergencyContactPhone:
      data.emergencyContactPhone?.trim() || data.phone?.trim() || null,
    updatedAt: new Date(),
  }

  if (existingGuest) {
    await db
      .update(guests)
      .set(guestPayload)
      .where(eq(guests.userId, ctx.id))
  } else if (
    guestPayload.nationality ||
    guestPayload.passportNumber ||
    guestPayload.emergencyContactName ||
    guestPayload.emergencyContactPhone
  ) {
    const { nanoid } = await import('nanoid')
    await db.insert(guests).values({
      id: nanoid(),
      userId: ctx.id,
      ...guestPayload,
    })
  }

  revalidatePath('/guest/profile')
  return { success: true }
}
