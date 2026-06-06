import { getAdminDashboardKPIs, getAdminBookings, getRevenueAnalytics } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, BookOpen, DollarSign, Users, Activity } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [kpis, recentBookings, revenueData] = await Promise.all([
    getAdminDashboardKPIs(),
    getAdminBookings(10, 0),
    getRevenueAnalytics(7),
  ])

  const totalRevenue = revenueData.reduce((sum, item) => sum + (item.total || 0), 0)
  const revenueAverage = revenueData.length > 0 ? totalRevenue / revenueData.length : 0

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your lodge performance overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <Card className="p-6 hover:shadow-lg transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-foreground mt-2">{kpis.totalBookings}</p>
              <p className="text-xs text-primary mt-2">+12% from last month</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <BookOpen className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Paid Bookings */}
        <Card className="p-6 hover:shadow-lg transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Paid Bookings</p>
              <p className="text-3xl font-bold text-foreground mt-2">{kpis.paidBookings}</p>
              <p className="text-xs text-primary mt-2">{Math.round((kpis.paidBookings / (kpis.totalBookings || 1)) * 100)}% conversion</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <DollarSign className="size-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Active Guides */}
        <Card className="p-6 hover:shadow-lg transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Active Guides</p>
              <p className="text-3xl font-bold text-foreground mt-2">{kpis.activeGuides}</p>
              <p className="text-xs text-primary mt-2">Available today</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Users className="size-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Active Vehicles */}
        <Card className="p-6 hover:shadow-lg transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Active Vehicles</p>
              <p className="text-3xl font-bold text-foreground mt-2">{kpis.activeVehicles}</p>
              <p className="text-xs text-primary mt-2">Ready for transfers</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-lg">
              <Activity className="size-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Revenue Summary</h3>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </div>
          <BarChart3 className="size-6 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground mt-1">${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Average Per Booking</p>
            <p className="text-2xl font-bold text-foreground mt-1">${revenueAverage.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{revenueData.length}</p>
          </div>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Bookings</h3>
            <p className="text-sm text-muted-foreground">{recentBookings.length} latest bookings</p>
          </div>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Booking ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Guest</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Check-In</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50 hover:bg-secondary/50 transition">
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{booking.id.slice(0, 8)}...</td>
                    <td className="py-3 px-4 text-foreground">{booking.userId.slice(0, 8)}...</td>
                    <td className="py-3 px-4 text-foreground">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">${booking.totalPrice.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-muted-foreground">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">Check system documentation and guides</p>
          <Button variant="outline" size="sm" className="w-full">Documentation</Button>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-3">Create New</h3>
          <p className="text-sm text-muted-foreground mb-4">Add a new accommodation or package</p>
          <Button variant="outline" size="sm" className="w-full">Add Content</Button>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-3">System Status</h3>
          <p className="text-sm text-muted-foreground mb-4">All systems operational</p>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-600">Healthy</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
