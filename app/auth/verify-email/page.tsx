'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail, RefreshCw, CheckCircle } from 'lucide-react'

function VerifyEmailInner() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? '/guest/dashboard'
  const emailParam = searchParams.get('email') ?? ''
  const [email, setEmail] = useState(emailParam)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const { data: session } = authClient.useSession()

  const handleResend = async () => {
    setError('')
    setLoading(true)
    const targetEmail = email || session?.user?.email
    if (!targetEmail) {
      setError('Enter your email address')
      setLoading(false)
      return
    }

    const { error } = await authClient.sendVerificationEmail({
      email: targetEmail,
      callbackURL: callbackUrl,
    })

    setLoading(false)
    if (error) {
      setError(error.message ?? 'Failed to send email')
      return
    }
    setSent(true)
  }

  if (session?.user?.emailVerified) {
    return (
      <Card className="w-full max-w-md p-8 text-center">
        <CheckCircle className="size-12 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold mb-2">Email verified</h1>
        <p className="text-muted-foreground mb-6">
          You&apos;re all set. Continue to your booking or dashboard.
        </p>
        <Link href={callbackUrl}>
          <Button className="w-full">Continue</Button>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-6">
        <Mail className="size-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-serif font-bold">Verify your email</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We sent a verification link to your inbox. Email confirmation is
          required before you can complete a booking.
        </p>
      </div>

      {!session?.user && (
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Your email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      )}

      {sent && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          Verification email sent! Check your inbox and spam folder.
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive mb-4" role="alert">
          {error}
        </p>
      )}

      <Button
        className="w-full gap-2 mb-3"
        onClick={handleResend}
        disabled={loading}
      >
        <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Sending…' : 'Resend verification email'}
      </Button>

      <Link href={`/auth/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button variant="outline" className="w-full">
          Back to sign in
        </Button>
      </Link>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-muted-foreground">Loading…</div>}>
      <VerifyEmailInner />
    </Suspense>
  )
}
