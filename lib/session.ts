import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

export async function requireUser() {
  const session = await getSession()
  if (!session?.user) return null
  return session.user
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user) return null

  const [row] = await db
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1)

  if (row?.role !== 'admin') return null
  return session.user
}
