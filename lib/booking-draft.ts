export const BOOKING_DRAFT_KEY = 'safari_camp_booking_draft'

export type BookingDraft = {
  accommodationId: string
  accommodationName: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  specialRequests?: string
}

export function saveBookingDraft(draft: BookingDraft): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft))
}

export function loadBookingDraft(): BookingDraft | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(BOOKING_DRAFT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BookingDraft
  } catch {
    return null
  }
}

export function clearBookingDraft(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(BOOKING_DRAFT_KEY)
}
