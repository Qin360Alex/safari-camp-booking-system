'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, Lock, Eye } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your preferences and notifications</p>
      </div>

      {/* Notification Settings */}
      <Card className="p-8">
        <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
          <Bell className="size-5" />
          Notifications
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold text-foreground mb-1 block">
                Booking Confirmations
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive emails when your bookings are confirmed
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold text-foreground mb-1 block">
                Pre-Trip Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Get reminders 7 days before your trip
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold text-foreground mb-1 block">
                Special Offers
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about promotions and special deals
              </p>
            </div>
            <Switch />
          </div>

          <div className="border-t border-border pt-6 flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold text-foreground mb-1 block">
                Marketing Emails
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive newsletters and marketing communications
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-8">
        <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
          <Eye className="size-5" />
          Privacy
        </h2>
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold text-foreground mb-3 block">
              Profile Visibility
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Control who can see your profile information
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  defaultChecked
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-foreground">Private (Only you)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="visibility" className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">Friends Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="visibility" className="w-4 h-4" />
                <span className="text-sm font-medium text-foreground">Public</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-8">
        <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
          <Lock className="size-5" />
          Security
        </h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full">
            View Active Sessions
          </Button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
