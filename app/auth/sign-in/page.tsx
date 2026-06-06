import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { resolvePostLoginRedirect } from '@/lib/auth-routing'
import { getAuthContext } from '@/lib/session'

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams
  const ctx = await getAuthContext()

  if (ctx) {
    redirect(resolvePostLoginRedirect(ctx.role, callbackUrl))
  }

  return (
    <Suspense fallback={<div className="text-muted-foreground text-sm">Loading…</div>}>
      <AuthForm mode="sign-in" />
    </Suspense>
  )
}
