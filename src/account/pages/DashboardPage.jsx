import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useMyBookings } from '../useMyBookings'

const done = new Set(['completed', 'cancelled'])

export default function DashboardPage() {
  const { user } = useAuth()
  const { bookings, error, loading } = useMyBookings()
  const open = bookings.filter((booking) => !done.has(booking.status))
  const past = bookings.filter((booking) => done.has(booking.status))
  const invoices = bookings.filter((booking) => booking.invoice?.number)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Hello, {user.name}</h1>
        <p className="text-sm text-mist">Bookings made on the website and in the app appear here.</p>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-3">
        <Link to="/account/bookings" className="card hover:border-accent/30">
          <p className="text-xs tracking-[0.18em] text-mist uppercase">Bookings</p>
          <p className="mt-2 font-display text-3xl text-ink">{loading ? '—' : open.length}</p>
        </Link>
        <Link to="/account/history" className="card hover:border-accent/30">
          <p className="text-xs tracking-[0.18em] text-mist uppercase">History</p>
          <p className="mt-2 font-display text-3xl text-ink">{loading ? '—' : past.length}</p>
        </Link>
        <Link to="/account/invoices" className="card hover:border-accent/30">
          <p className="text-xs tracking-[0.18em] text-mist uppercase">Invoices</p>
          <p className="mt-2 font-display text-3xl text-ink">{loading ? '—' : invoices.length}</p>
        </Link>
      </div>
      <a href="/#booking" className="btn">
        Book a service
      </a>
    </div>
  )
}
