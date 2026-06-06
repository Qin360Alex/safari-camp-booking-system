import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings as SettingsIcon, Bell, Lock, ToggleRight, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage system configuration and preferences</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">General Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Lodge Name</label>
            <Input defaultValue="Safari Camp Lodge" placeholder="Enter lodge name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Logo URL</label>
            <Input defaultValue="https://..." placeholder="Enter logo URL" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Contact Email</label>
            <Input defaultValue="info@safaricamp.com" placeholder="Enter contact email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Support Phone</label>
            <Input defaultValue="+254 123 456 789" placeholder="Enter phone number" />
          </div>

          <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">New Bookings</h4>
              <p className="text-sm text-muted-foreground">Notify when new bookings are made</p>
            </div>
            <ToggleRight className="size-5 text-primary" />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Payment Received</h4>
              <p className="text-sm text-muted-foreground">Notify when payments are completed</p>
            </div>
            <ToggleRight className="size-5 text-primary" />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Low Inventory</h4>
              <p className="text-sm text-muted-foreground">Alert when accommodation inventory is low</p>
            </div>
            <ToggleRight className="size-5 text-primary" />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Guest Reviews</h4>
              <p className="text-sm text-muted-foreground">Notify when new reviews are submitted</p>
            </div>
            <ToggleRight className="size-5 text-primary" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="size-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security & Access</h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Change Password</h4>
            <div className="space-y-3">
              <Input type="password" placeholder="Current password" />
              <Input type="password" placeholder="New password" />
              <Input type="password" placeholder="Confirm password" />
              <Button variant="outline" className="w-full">Update Password</Button>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-medium text-foreground mb-3">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
            <Button variant="outline">Enable 2FA</Button>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-medium text-foreground mb-3">Active Sessions</h4>
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-sm text-foreground mb-2">Current device</p>
              <p className="text-xs text-muted-foreground">Last active: Just now</p>
            </div>
            <Button variant="outline" className="mt-4">Logout All Devices</Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/50">
        <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
            Clear Cache
          </Button>
          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
            Reset Database
          </Button>
          <Button variant="outline" className="w-full text-destructive hover:text-destructive">
            Delete All Data
          </Button>
        </div>
      </Card>
    </div>
  )
}
