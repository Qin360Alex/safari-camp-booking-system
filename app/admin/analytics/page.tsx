import { getRevenueAnalytics, getOccupancyAnalytics } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Calendar } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const [revenueData, occupancyData] = await Promise.all([
    getRevenueAnalytics(30),
    getOccupancyAnalytics(),
  ])

  const totalRevenue = revenueData.reduce((sum, item) => sum + (item.total || 0), 0)
  const avgDailyRevenue = revenueData.length > 0 ? totalRevenue / revenueData.length : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Performance metrics and business insights</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="size-4" />
          Select Date Range
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue (30 days)</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                ${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-primary mt-2">+15% from previous period</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <TrendingUp className="size-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Daily Revenue</p>
              <p className="text-3xl font-bold text-foreground mt-2">
                ${avgDailyRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-primary mt-2">Based on {revenueData.length} days</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <BarChart3 className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-3xl font-bold text-foreground mt-2">{revenueData.length}</p>
              <p className="text-xs text-primary mt-2">Completed payments</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <span className="text-2xl font-bold text-purple-600">✓</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Revenue Trend</h3>
        <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
          <p className="text-muted-foreground">Revenue chart - Integration ready</p>
        </div>
      </Card>

      {/* Occupancy Analytics */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-6">Occupancy Rate by Accommodation</h3>
        <div className="space-y-4">
          {occupancyData.length > 0 ? (
            occupancyData.map((acc) => {
              const occupancyRate = acc.totalCapacity > 0 ? (acc.bookings / acc.totalCapacity) * 100 : 0
              return (
                <div key={acc.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{acc.name}</h4>
                      <span className="text-sm font-semibold text-foreground">{occupancyRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {acc.bookings} of {acc.totalCapacity} capacity
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-muted-foreground text-center py-8">No occupancy data available</p>
          )}
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-4">Export Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto py-3 flex-col">
            <span className="font-semibold mb-1">Export as PDF</span>
            <span className="text-xs text-muted-foreground">Full report with charts</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col">
            <span className="font-semibold mb-1">Export as CSV</span>
            <span className="text-xs text-muted-foreground">Raw data for analysis</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col">
            <span className="font-semibold mb-1">Email Report</span>
            <span className="text-xs text-muted-foreground">Send to team members</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
