import { getAdminBookings } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Download, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings(50, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Bookings Management</h1>
        <p className="text-muted-foreground mt-1">Manage and track all guest bookings</p>
      </div>

      {/* Actions Bar */}
      <Card className="p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="size-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </Card>

      {/* Bookings Table */}
      <Card className="p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Booking ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Guest</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Check-In</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Check-Out</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50 hover:bg-secondary/50 transition">
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{booking.id.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{booking.userId.slice(0, 6)}...</td>
                    <td className="py-3 px-4 text-foreground">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-foreground">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">${booking.totalPrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Link href={`/admin/bookings/${booking.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="size-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 px-4 text-center text-muted-foreground">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between px-4 py-2 border-t border-border">
          <p className="text-sm text-muted-foreground">Showing {bookings.length} of {bookings.length} bookings</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
