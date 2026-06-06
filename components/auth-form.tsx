'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { resolvePostLoginRedirect } from '@/lib/auth-routing'
import { parseRole } from '@/lib/rbac'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { SiteImage } from '@/components/site-image'
import { authImages } from '@/lib/images'

function AuthFormInner({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'sign-up'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    if (isSignUp) {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      })
      setLoading(false)

      if (error) {
        setError(error.message ?? 'Something went wrong')
        return
      }

      const verifyUrl = new URL('/auth/verify-email', window.location.origin)
      if (callbackUrl) verifyUrl.searchParams.set('callbackUrl', callbackUrl)
      verifyUrl.searchParams.set('email', email)
      router.push(verifyUrl.pathname + verifyUrl.search)
      router.refresh()
      return
    }

    const { data, error } = await authClient.signIn.email({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message ?? 'Something went wrong')
      return
    }

    const role = parseRole((data?.user as { role?: string })?.role)
    const redirectTo = resolvePostLoginRedirect(role, callbackUrl)
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      <div className="hidden lg:block relative photo-frame min-h-[32rem] overflow-hidden">
        <SiteImage
          slot={authImages.panel}
          preset="authPanel"
          wrapperClassName="absolute inset-0"
        />
        <div className="absolute inset-0 photo-overlay-bottom" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <p className="font-serif text-2xl font-bold mb-2">Safari Camp Lodge</p>
          <p className="text-sm opacity-90">
            Your gateway to luxury African wilderness.
          </p>
        </div>
      </div>

      <Card className="w-full p-6 lg:p-8 flex flex-col justify-center">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp
              ? 'Sign up to book your safari — email verification required before payment'
              : 'Sign in to continue to payment or your guest portal'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-primary" role="status">
              {info}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? 'Please wait...'
              : isSignUp
                ? 'Create account'
                : 'Sign in'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <Link
            href={
              isSignUp
                ? `/auth/sign-in${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`
                : `/auth/sign-up${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`
            }
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </Card>
    </div>
  )
}

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  return (
    <Suspense fallback={<div className="text-muted-foreground text-sm">Loading…</div>}>
      <AuthFormInner mode={mode} />
    </Suspense>
  )
}
