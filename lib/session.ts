import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import {
  hasPermission,
  parseRole,
  type Permission,
  type UserRole,
} from '@/lib/rbac'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export type AuthContext = {
  id: string
  name: string
  email: string
  role: UserRole
  emailVerified: boolean
  image?: string | null
}

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

async function loadUserRecord(userId: string) {
  const [row] = await db
    .select({
      role: user.role,
      emailVerified: user.emailVerified,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

  return row
}

/** Full auth context with role + verification from DB */
export async function getAuthContext(): Promise<AuthContext | null> {
  const session = await getSession()
  if (!session?.user) return null

  const row = await loadUserRecord(session.user.id)

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role: parseRole(row?.role ?? (session.user as { role?: string }).role),
    emailVerified: row?.emailVerified ?? session.user.emailVerified ?? false,
  }
}

export async function requireUser(): Promise<AuthContext> {
  const ctx = await getAuthContext()
  if (!ctx) throw new Error('Unauthorized')
  return ctx
}

export async function requireVerifiedUser(): Promise<AuthContext> {
  const ctx = await requireUser()
  if (!ctx.emailVerified) {
    throw new Error('Email verification required')
  }
  return ctx
}

export async function requirePermission(
  permission: Permission
): Promise<AuthContext> {
  const ctx = await requireUser()
  if (!hasPermission(ctx.role, permission)) {
    throw new Error('Forbidden')
  }
  return ctx
}

/** Staff portal: staff, manager, admin, super_admin */
export async function requireAdmin(): Promise<AuthContext | null> {
  const ctx = await getAuthContext()
  if (!ctx) return null
  if (!hasPermission(ctx.role, 'content:read')) return null
  return ctx
}

/** Alias used by layouts */
export async function requirePortalAccess(): Promise<AuthContext | null> {
  return requireAdmin()
}
