import { getAdminVehicles, getAdminDrivers } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit, Wrench, Users } from 'lucide-react'

export default async function AdminVehiclesPage() {
  const [vehicles, drivers] = await Promise.all([
    getAdminVehicles(),
    getAdminDrivers(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Fleet Management</h1>
          <p className="text-muted-foreground mt-1">Manage vehicles, drivers, and maintenance schedules</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Plus className="size-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Wrench className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
              <p className="text-3xl font-bold text-foreground">{vehicles.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Users className="size-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Drivers</p>
              <p className="text-3xl font-bold text-foreground">{drivers.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Vehicles Tab */}
      <Card className="p-6">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Capacity</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Assigned Driver</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-border/50 hover:bg-secondary/50 transition">
                    <td className="py-3 px-4 font-medium text-foreground">{vehicle.registrationNumber}</td>
                    <td className="py-3 px-4 text-foreground">{vehicle.type}</td>
                    <td className="py-3 px-4 text-foreground">{vehicle.capacity} passengers</td>
                    <td className="py-3 px-4 text-foreground text-xs">Assigned</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        vehicle.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {vehicle.isActive ? 'Active' : 'Maintenance'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit className="size-4" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-muted-foreground">
                    No vehicles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
