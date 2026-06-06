import { getAdminTransfers } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, MapPin, Calendar, Users } from 'lucide-react'

export default async function AdminTransfersPage() {
  const transfers = await getAdminTransfers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Transfer Requests</h1>
          <p className="text-muted-foreground mt-1">Manage airport pickups and transfers</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Plus className="size-4" />
          New Transfer
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search transfers..."
            className="pl-10"
          />
        </div>
      </Card>

      {/* Transfers List */}
      <div className="space-y-4">
        {transfers.length > 0 ? (
          transfers.map((transfer) => (
            <Card key={transfer.id} className="p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Transfer #{transfer.id.slice(0, 8)}</h3>
                  <p className="text-sm text-muted-foreground">Booking: {transfer.bookingId?.slice(0, 8) || 'N/A'}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  transfer.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  transfer.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {transfer.status || 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Location</p>
                    <p className="font-medium text-foreground">{transfer.pickupLocation || 'TBD'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transfer Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(transfer.transferDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-medium text-foreground">{transfer.passengerCount || 0} people</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Vehicle: <span className="font-medium text-foreground">Pending Assignment</span>
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Assign Vehicle
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No transfer requests found</p>
            <Button className="bg-primary hover:bg-primary/90">Create First Transfer</Button>
          </Card>
        )}
      </div>
    </div>
  )
}
