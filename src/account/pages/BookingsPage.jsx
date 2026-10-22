import BookingList from '../BookingList'
import { useMyBookings } from '../useMyBookings'

const done = new Set(['completed', 'cancelled'])

export default function BookingsPage() {
  const { bookings, error, loading } = useMyBookings()
  const open = bookings.filter((booking) => !done.has(booking.status))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-mist">Services you booked on the website or in the app that are still open.</p>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      {loading ? <p className="text-sm text-mist">Loading…</p> : <BookingList bookings={open} empty="No open bookings. Book a service from the website." />}
    </div>
  )
}
