import { redirect } from 'next/navigation'
import { hasPermission } from '@/lib/rbac'
import { getAuthContext } from '@/lib/session'
import { GuestSupportForm } from './support-form'

export default async function GuestSupportPage() {
  const ctx = await getAuthContext()
  if (!ctx || !hasPermission(ctx.role, 'guest:support')) {
    redirect('/auth/access-denied')
  }

  return <GuestSupportForm />
}
