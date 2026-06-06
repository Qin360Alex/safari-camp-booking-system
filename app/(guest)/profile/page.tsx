'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: string
  emailVerified: boolean
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        // This would typically fetch from the API or use auth hook
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
          })
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setMessage('Profile updated successfully')
        setEditing(false)
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      setMessage('Failed to save changes')
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account information</p>
      </div>

      {message && (
        <Card
          className={`p-4 flex items-center gap-3 ${
            message.includes('successfully')
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          {message.includes('successfully') ? (
            <CheckCircle className="size-5 text-green-600" />
          ) : (
            <AlertCircle className="size-5 text-red-600" />
          )}
          <p
            className={`text-sm font-medium ${
              message.includes('successfully')
                ? 'text-green-700'
                : 'text-red-700'
            }`}
          >
            {message}
          </p>
        </Card>
      )}

      {profile && (
        <Card className="p-8">
          <div className="space-y-6">
            {/* Email Verification Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              {profile.emailVerified ? (
                <>
                  <CheckCircle className="size-5 text-green-600" />
                  <span className="text-sm text-blue-700">Email verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="size-5 text-amber-600" />
                  <span className="text-sm text-amber-700">
                    Email verification pending
                  </span>
                </>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className="bg-background"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This is your login email
                </p>
              </div>

              <div>
                <Label htmlFor="created" className="mb-2 block">
                  Member Since
                </Label>
                <Input
                  id="created"
                  type="text"
                  value={new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  disabled
                  className="bg-secondary/10"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-border flex gap-3">
              {!editing ? (
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(false)
                      if (profile) {
                        setFormData({
                          name: profile.name || '',
                          email: profile.email || '',
                          phone: profile.phone || '',
                        })
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Danger Zone */}
      <Card className="p-8 border-red-200 bg-red-50">
        <h2 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h2>
        <p className="text-sm text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </Card>
    </div>
  )
}
