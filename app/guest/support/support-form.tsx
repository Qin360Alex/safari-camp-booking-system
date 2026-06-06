'use client'

import { useState } from 'react'
import Link from 'next/link'
import { searchBookingsByGuestEmail } from '@/app/actions/bookings'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AlertCircle, Search, Shield } from 'lucide-react'

export function GuestSupportForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof searchBookingsByGuestEmail>> | null
  >(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setResults(null)

    try {
      const data = await searchBookingsByGuestEmail(email)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2">
          <Shield className="size-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            Staff only
          </span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          Guest Support
        </h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          Look up customer bookings by email to assist guests who need help.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="guest@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="gap-2 shrink-0">
            <Search className="size-4" />
            {loading ? 'Searching…' : 'Find bookings'}
          </Button>
        </form>
      </Card>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="size-4" />
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {results.results.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              No guest found with that email address.
            </Card>
          ) : (
            results.results.map(({ guest, bookings }) => (
              <Card key={guest.id} className="p-6">
                <div className="mb-4">
                  <h2 className="font-serif text-xl font-bold">{guest.name}</h2>
                  <p className="text-sm text-muted-foreground">{guest.email}</p>
                </div>
                {bookings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No bookings on file.</p>
                ) : (
                  <ul className="space-y-3">
                    {bookings.map((b) => (
                      <li
                        key={b.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-lg bg-muted/40 border border-border"
                      >
                        <div>
                          <p className="font-mono text-xs text-muted-foreground">
                            {b.id.slice(0, 12)}…
                          </p>
                          <p className="text-sm">
                            {new Date(b.checkInDate).toLocaleDateString()} →{' '}
                            {new Date(b.checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {b.status}
                          </span>
                          <span className="font-semibold">${b.totalPrice}</span>
                          <Link href={`/guest/bookings/${b.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
