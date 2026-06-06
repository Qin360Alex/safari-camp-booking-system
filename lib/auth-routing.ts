import {
  canAccessAdminPortal,
  parseRole,
  type UserRole,
} from '@/lib/rbac'

const ALLOWED_CALLBACK_PREFIXES = [
  '/',
  '/book',
  '/guest',
  '/admin',
  '/auth/verify-email',
  '/auth/access-denied',
  '/accommodations',
  '/experiences',
  '/contact',
] as const

/** Sanitize callback URL — internal paths only, no open redirects */
export function sanitizeCallbackUrl(
  raw: string | null | undefined,
  fallback: string
): string {
  if (!raw) return fallback

  try {
    const path = raw.startsWith('http')
      ? new URL(raw).pathname
      : raw.split('?')[0]

    if (!path.startsWith('/')) return fallback

    const allowed = ALLOWED_CALLBACK_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(prefix)
    )

    if (!allowed) return fallback

    return raw.startsWith('/') ? raw : path
  } catch {
    return fallback
  }
}

export function getDefaultRedirect(role: UserRole): string {
  if (canAccessAdminPortal(role)) return '/admin'
  return '/guest/dashboard'
}

export function resolvePostLoginRedirect(
  role: UserRole,
  callbackUrl?: string | null
): string {
  const fallback = getDefaultRedirect(role)
  const target = sanitizeCallbackUrl(callbackUrl, fallback)

  if (target.startsWith('/admin') && !canAccessAdminPortal(role)) {
    return '/auth/access-denied?from=admin'
  }

  return target
}

export function getRoleFromSessionUser(
  user: { role?: string | null } | null | undefined
): UserRole {
  return parseRole(user?.role)
}
