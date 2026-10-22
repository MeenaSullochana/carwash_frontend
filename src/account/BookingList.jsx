import { Link } from 'react-router-dom'
import { rupee, statusLabel } from '../lib/status'

export default function BookingList({ bookings, empty }) {
  if (!bookings.length) return <p className="card text-sm text-mist">{empty}</p>

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <Link key={booking._id} to={`/account/bookings/${booking._id}`} className="card block hover:border-accent/30">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ink">{booking.serviceSnapshot?.title}</h2>
              <p className="mt-1 text-sm text-mist">
                {booking.bookingCode} · {booking.scheduledDate} · {booking.scheduledTime}
              </p>
              <p className="mt-1 text-sm">
                {booking.vehicleName || booking.vehicleType} {booking.vehicleNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs tracking-wide text-accent uppercase">{statusLabel(booking.status)}</p>
              <p className="mt-2 text-sm text-ink">
                {booking.invoice?.number ? rupee(booking.invoice.total) : rupee(booking.serviceSnapshot?.price)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
