import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'
import { statusLabel } from '../../lib/status'

export default function DashboardPage() {
  const { token, user } = useAuth()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const path = ['staff', 'washer'].includes(user.role) ? '/api/bookings' : '/api/bookings'
    api(path, { token })
      .then((data) => setBookings(data.bookings || []))
      .catch(console.error)
  }, [token, user.role])

  const open = bookings.filter((booking) => !['completed', 'cancelled'].includes(booking.status))
  const waitingBill = bookings.filter((booking) => booking.status === 'submitted')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {user.name.split(' ')[0]}</h1>
        <p className="text-sm text-mist">
          {user.role === 'admin'
            ? 'New bookings land here. After staff submit the job, generate the bill and complete it.'
            : 'Open a job, photograph the car, record what is inside, finish the included work, then submit.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs tracking-[0.2em] text-mist uppercase">Open jobs</p>
          <p className="mt-2 font-display text-3xl text-ink">{open.length}</p>
        </div>
        <div className="card">
          <p className="text-xs tracking-[0.2em] text-mist uppercase">Ready for bill</p>
          <p className="mt-2 font-display text-3xl text-ink">{waitingBill.length}</p>
        </div>
        <div className="card">
          <p className="text-xs tracking-[0.2em] text-mist uppercase">Completed</p>
          <p className="mt-2 font-display text-3xl text-ink">
            {bookings.filter((booking) => booking.status === 'completed').length}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest jobs</h2>
          <Link to="/admin/bookings" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {bookings.slice(0, 6).map((booking) => (
            <Link key={booking._id} to={`/admin/bookings/${booking._id}`} className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-graphite">
              <div>
                <p className="text-sm text-ink">{booking.serviceSnapshot?.title}</p>
                <p className="text-xs text-mist">
                  {booking.bookingCode} · {booking.scheduledDate} {booking.scheduledTime}
                </p>
              </div>
              <span className="text-xs tracking-wide text-accent uppercase">{statusLabel(booking.status)}</span>
            </Link>
          ))}
          {!bookings.length && <p className="text-sm text-mist">No jobs yet.</p>}
        </div>
      </div>
    </div>
  )
}
