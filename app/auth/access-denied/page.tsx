import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShieldOff } from 'lucide-react'

type Props = {
  searchParams: Promise<{ from?: string }>
}

export default async function AccessDeniedPage({ searchParams }: Props) {
  const { from } = await searchParams

  return (
    <Card className="w-full max-w-md p-8 text-center">
      <ShieldOff className="size-12 text-destructive mx-auto mb-4" />
      <h1 className="text-2xl font-serif font-bold mb-2">Access denied</h1>
      <p className="text-muted-foreground mb-6">
        {from === 'admin'
          ? 'Your account does not have permission to access the admin portal. Contact a super admin if you need elevated access.'
          : 'You do not have permission to view this page.'}
      </p>
      <div className="flex flex-col gap-2">
        <Link href="/guest/dashboard">
          <Button className="w-full">Go to Guest Portal</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Back to home
          </Button>
        </Link>
      </div>
    </Card>
  )
}
