/**
 * Role-based access control for Safari Camp.
 *
 * Roles (lowest → highest privilege for staff):
 *   guest → staff → manager → admin → super_admin
 */

export const USER_ROLES = [
  'guest',
  'staff',
  'manager',
  'admin',
  'super_admin',
] as const

export type UserRole = (typeof USER_ROLES)[number]

export const STAFF_ROLES = [
  'staff',
  'manager',
  'admin',
  'super_admin',
] as const

export type StaffRole = (typeof STAFF_ROLES)[number]

export const PERMISSIONS = {
  'booking:read:own': USER_ROLES,
  'booking:create': USER_ROLES,
  'booking:read:all': STAFF_ROLES,
  'booking:update': STAFF_ROLES,
  'guest:read:all': STAFF_ROLES,
  'guest:support': STAFF_ROLES,
  'content:read': STAFF_ROLES,
  'content:write': ['manager', 'admin', 'super_admin'] as const,
  'analytics:read': ['manager', 'admin', 'super_admin'] as const,
  'settings:read': ['admin', 'super_admin'] as const,
  'settings:write': ['admin', 'super_admin'] as const,
  'users:manage': ['super_admin'] as const,
} as const

export type Permission = keyof typeof PERMISSIONS

const ROLE_RANK: Record<UserRole, number> = {
  guest: 0,
  staff: 1,
  manager: 2,
  admin: 3,
  super_admin: 4,
}

export function parseRole(value: string | null | undefined): UserRole {
  if (value && USER_ROLES.includes(value as UserRole)) {
    return value as UserRole
  }
  return 'guest'
}

export function isStaffRole(role: UserRole): role is StaffRole {
  return STAFF_ROLES.includes(role as StaffRole)
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const allowed = PERMISSIONS[permission] as readonly UserRole[]
  return allowed.includes(role)
}

export function canAccessAdminPortal(role: UserRole): boolean {
  return isStaffRole(role)
}

export function canAccessGuestPortal(_role: UserRole): boolean {
  return true
}

export function roleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    guest: 'Guest',
    staff: 'Front Desk',
    manager: 'Manager',
    admin: 'Administrator',
    super_admin: 'Super Admin',
  }
  return labels[role]
}

export function isRoleAtLeast(role: UserRole, minimum: UserRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[minimum]
}

/** Admin sidebar routes gated by permission */
export const ADMIN_NAV_PERMISSIONS: Record<string, Permission> = {
  '/admin': 'content:read',
  '/admin/bookings': 'booking:read:all',
  '/admin/guests': 'guest:read:all',
  '/admin/accommodations': 'content:write',
  '/admin/guides': 'content:write',
  '/admin/vehicles': 'content:read',
  '/admin/transfers': 'content:read',
  '/admin/analytics': 'analytics:read',
  '/admin/settings': 'settings:read',
}
