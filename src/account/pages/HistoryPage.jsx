import BookingList from '../BookingList'
import { useMyBookings } from '../useMyBookings'

const done = new Set(['completed', 'cancelled'])

export default function HistoryPage() {
  const { bookings, error, loading } = useMyBookings()
  const past = bookings.filter((booking) => done.has(booking.status))

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">History</h1>
        <p className="text-sm text-mist">Completed and cancelled visits.</p>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      {loading ? <p className="text-sm text-mist">Loading…</p> : <BookingList bookings={past} empty="No completed visits yet." />}
    </div>
  )
}
