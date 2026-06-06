import { getAdminGuides } from '@/app/actions/admin'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Edit, Award, Globe } from 'lucide-react'

export default async function AdminGuidesPage() {
  const guides = await getAdminGuides()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Safari Guides</h1>
          <p className="text-muted-foreground mt-1">Manage guides, availability, and certifications</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
          <Plus className="size-4" />
          Add Guide
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search guides by name..."
            className="pl-10"
          />
        </div>
      </Card>

      {/* Guides Table */}
      <Card className="p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Expertise</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Languages</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.length > 0 ? (
                guides.map((guide) => (
                  <tr key={guide.id} className="border-b border-border/50 hover:bg-secondary/50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{guide.name}</p>
                        <p className="text-xs text-muted-foreground">{guide.id.slice(0, 8)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{guide.expertise || 'General'}</td>
                    <td className="py-3 px-4 text-foreground">{guide.languages || 'English'}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        guide.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {guide.isActive ? 'Active' : 'Inactive'}
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
                  <td colSpan={5} className="py-8 px-4 text-center text-muted-foreground">
                    No guides found
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
