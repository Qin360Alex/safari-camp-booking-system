'use client'

import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '@/app/actions/profile'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { roleLabel } from '@/lib/rbac'
import { AlertCircle, CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [role, setRole] = useState('guest')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  })

  useEffect(() => {
    async function load() {
      try {
        const profile = await getProfile()
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          nationality: profile.nationality || '',
          passportNumber: profile.passportNumber || '',
          emergencyContactName: profile.emergencyContactName || '',
          emergencyContactPhone: profile.emergencyContactPhone || '',
        })
        setEmailVerified(profile.emailVerified)
        setRole(profile.role)
      } catch {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    try {
      await updateProfile(formData)
      setMessage('Profile updated successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading profile…</p>
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal details and travel information
        </p>
      </div>

      {!emailVerified && (
        <Card className="p-4 border-amber-500/30 bg-amber-500/5 flex gap-3">
          <Mail className="size-5 text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Email not verified</p>
            <p className="text-xs text-muted-foreground mt-1">
              Verify your email to complete bookings.{' '}
              <Link href="/auth/verify-email" className="text-primary hover:underline">
                Resend verification
              </Link>
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <p className="text-xs text-muted-foreground mb-4">
          Account type: <span className="font-medium text-foreground">{roleLabel(role as never)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={formData.email} disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, nationality: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passport">Passport number</Label>
            <Input
              id="passport"
              value={formData.passportNumber}
              onChange={(e) =>
                setFormData((p) => ({ ...p, passportNumber: e.target.value }))
              }
            />
          </div>

          <div className="border-t border-border pt-5">
            <h3 className="font-semibold mb-4">Emergency contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ecName">Contact name</Label>
                <Input
                  id="ecName"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      emergencyContactName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ecPhone">Contact phone</Label>
                <Input
                  id="ecPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      emergencyContactPhone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {message && (
            <p className="text-sm text-green-700 flex items-center gap-2">
              <CheckCircle className="size-4" />
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <AlertCircle className="size-4" />
              {error}
            </p>
          )}

          <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90">
            {saving ? 'Saving…' : 'Save profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
