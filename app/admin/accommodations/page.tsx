import { getAdminAccommodations } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit, DollarSign, Users } from 'lucide-react'

export default async function AdminAccommodationsPage() {
  const accommodations = await getAdminAccommodations()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Accommodations</h1>
          <p className="text-muted-foreground mt-1">Manage lodges, camps, and room inventory</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Plus className="size-4" />
          Add Accommodation
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search accommodations..."
            className="pl-10"
          />
        </div>
      </Card>

      {/* Accommodations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.length > 0 ? (
          accommodations.map((acc) => (
            <Card key={acc.id} className="p-6 hover:shadow-lg transition overflow-hidden">
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Image</span>
              </div>

              <h3 className="font-semibold text-lg text-foreground mb-2">{acc.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{acc.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold text-foreground">{acc.capacity}</span>
                    <span className="text-muted-foreground"> guests</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold text-foreground">${acc.pricePerNight}</span>
                    <span className="text-muted-foreground">/night</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 flex items-center gap-2">
                  <Edit className="size-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground mb-4">No accommodations found</p>
            <Button className="bg-primary hover:bg-primary/90">Create First Accommodation</Button>
          </div>
        )}
      </div>
    </div>
  )
}
