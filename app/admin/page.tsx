import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to Safari Camp Lodge management system</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Bookings"
          value="24"
          change="+3 this week"
          variant="primary"
        />
        <KPICard
          title="Revenue (This Month)"
          value="$45,230"
          change="+12% from last month"
          variant="secondary"
        />
        <KPICard
          title="Guest Satisfaction"
          value="98%"
          change="+2% trend"
          variant="accent"
        />
        <KPICard
          title="Occupancy Rate"
          value="87%"
          change="-3% next week"
          variant="muted"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Bookings This Month" />
        <ChartCard title="Revenue Trend" />
      </div>

      {/* Recent Bookings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-bold text-foreground">Recent Bookings</h2>
          <Button className="bg-primary hover:bg-primary/90" size="sm">
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Guest</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Accommodation</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Dates</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Total</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-border hover:bg-primary/5 transition">
                  <td className="py-3 px-4 text-foreground">Guest {i}</td>
                  <td className="py-3 px-4 text-foreground">Luxury Tent</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">Dec {i} - Dec {i + 3}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">${299 * 3}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="New Booking"
          description="Create a manual booking entry"
          action="Create"
        />
        <QuickActionCard
          title="Message Guest"
          description="Send notification to guests"
          action="Send"
        />
        <QuickActionCard
          title="Generate Report"
          description="Export booking analytics"
          action="Export"
        />
      </div>
    </div>
  )
}

function KPICard({
  title,
  value,
  change,
  variant,
}: {
  title: string
  value: string
  change: string
  variant: 'primary' | 'secondary' | 'accent' | 'muted'
}) {
  const bgColorMap = {
    primary: 'bg-primary/10 border-primary/20',
    secondary: 'bg-secondary/10 border-secondary/20',
    accent: 'bg-accent/10 border-accent/20',
    muted: 'bg-muted/20 border-muted/30',
  }

  return (
    <div className={`border rounded-lg p-6 ${bgColorMap[variant]}`}>
      <p className="text-sm text-muted-foreground mb-2">{title}</p>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{change}</p>
    </div>
  )
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-serif text-lg font-bold text-foreground mb-6">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Chart placeholder - Phase 4 implementation</p>
      </div>
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: string
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button className="bg-primary hover:bg-primary/90" size="sm">
        {action}
      </Button>
    </div>
  )
}
