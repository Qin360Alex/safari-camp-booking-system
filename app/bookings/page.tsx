import { redirect } from 'next/navigation'

export default function BookingsPage() {
  // Redirect legacy /bookings route to new guest dashboard
  redirect('/guest/dashboard')
}
