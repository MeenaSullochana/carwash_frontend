import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { rupee, statusLabel } from '../../lib/status'

const STATUSES = ['pending', 'in_progress', 'submitted', 'billed', 'completed', 'cancelled']

export default function BookingsPage({ scope = '' }) {
  const { token } = useAuth()
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (scope) params.set('scope', scope)
    const query = params.toString()
    api(`/api/bookings${query ? `?${query}` : ''}`, { token })
      .then((data) => setBookings(data.bookings || []))
      .catch(console.error)
  }, [token, status, scope])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{scope === 'mine' ? 'My work' : 'Jobs'}</h1>
          <p className="text-sm text-mist">
            {scope === 'mine' ? 'Jobs you recorded, worked on, or submitted.' : 'Customer bookings for admin and staff.'}
          </p>
        </div>
        <select className="input max-w-xs" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {statusLabel(item)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <Link key={booking._id} to={`/admin/bookings/${booking._id}`} className="card block hover:border-accent/30">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg text-ink">{booking.serviceSnapshot?.title || booking.service?.title}</p>
                <p className="mt-1 text-sm text-mist">
                  {booking.bookingCode} · {booking.client?.name} · {booking.vehicleName || booking.vehicleType} {booking.vehicleNumber}
                </p>
                <p className="mt-1 text-sm">
                  {booking.scheduledDate} at {booking.scheduledTime}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs tracking-[0.16em] text-accent uppercase">{statusLabel(booking.status)}</p>
                <p className="mt-2 text-sm text-ink">{rupee(booking.invoice?.total || booking.serviceSnapshot?.price)}</p>
              </div>
            </div>
          </Link>
        ))}
        {!bookings.length && <p className="card text-sm text-mist">No jobs found.</p>}
      </div>
    </div>
  )
}
