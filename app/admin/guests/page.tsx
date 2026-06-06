import { getAdminGuests } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Mail, Phone, MapPin } from 'lucide-react'

export default async function AdminGuestsPage() {
  const guests = await getAdminGuests()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Guest Management</h1>
        <p className="text-muted-foreground mt-1">View and manage guest profiles and information</p>
      </div>

      {/* Actions Bar */}
      <Card className="p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search guests by name or email..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="size-4" />
          Filter
        </Button>
      </Card>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guests.length > 0 ? (
          guests.map((guest) => (
            <Card key={guest.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{guest.name || 'Guest'}</h3>
                  <p className="text-xs text-muted-foreground mt-1">ID: {guest.id.slice(0, 8)}</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {guest.totalBookings || 0} bookings
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  <span>{guest.email || 'No email'}</span>
                </div>
                {guest.phone && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    <span>{guest.phone}</span>
                  </div>
                )}
                {guest.country && (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{guest.country}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Member since {new Date(guest.createdAt).toLocaleDateString()}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No guests found</p>
          </div>
        )}
      </div>
    </div>
  )
}
