import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { api, downloadFile, mediaUrl } from '../../lib/api'
import { statusLabel } from '../../lib/status'
import InvoiceSheet from '../../components/InvoiceSheet'

export default function BookingDetailPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api(`/api/bookings/${id}`, { token })
      .then((data) => setBooking(data.booking))
      .catch((err) => setError(err.message))
  }, [id, token])

  if (error) return <p className="text-sm text-red-300">{error}</p>
  if (!booking) return <p className="text-sm text-mist">Loading…</p>

  const back = ['completed', 'cancelled'].includes(booking.status) ? '/account/history' : '/account/bookings'

  return (
    <div className="space-y-6">
      <Link to={back} className="text-sm text-mist hover:text-ink">
        ← Back
      </Link>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-mist uppercase">{booking.bookingCode}</p>
            <h1 className="mt-2 text-2xl font-semibold">{booking.serviceSnapshot?.title}</h1>
            <p className="mt-2 text-sm text-mist">
              {booking.scheduledDate} at {booking.scheduledTime} · {statusLabel(booking.status)}
            </p>
            <p className="mt-1 text-sm">
              {booking.vehicleName} {booking.vehicleNumber}
            </p>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold">Included work</h2>
            <ul className="mt-4 space-y-3">
              {(booking.workItems || []).map((item) => (
                <li key={item._id} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="text-ink">{item.title}</p>
                    {item.description && <p className="text-mist">{item.description}</p>}
                  </div>
                  <span className="text-mist">{item.done ? `Done · ${item.doneBy?.name || 'Staff'}` : 'Pending'}</span>
                </li>
              ))}
            </ul>
          </div>

          {!!booking.carAccessories?.length && (
            <div className="card">
              <h2 className="text-lg font-semibold">Accessories in the car</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {booking.carAccessories.map((item) => (
                  <li key={item._id} className="flex justify-between gap-3">
                    <span>{item.name}</span>
                    <span className="text-mist">
                      {item.presentAfter === false ? 'Missing at final check' : item.presentAfter ? 'Cross-checked' : 'Recorded at intake'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!booking.beforeImages?.length && (
            <div>
              <h2 className="text-lg font-semibold">Before</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {booking.beforeImages.map((image) => (
                  <img key={image} src={mediaUrl(image)} alt="Car before service" className="h-28 w-40 rounded-2xl object-cover" />
                ))}
              </div>
            </div>
          )}

          {!!booking.afterImages?.length && (
            <div>
              <h2 className="text-lg font-semibold">After</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {booking.afterImages.map((image) => (
                  <img key={image} src={mediaUrl(image)} alt="Car after service" className="h-28 w-40 rounded-2xl object-cover" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {booking.invoice?.number && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                downloadFile(`/api/invoices/${id}/download`, {
                  token,
                  filename: `${booking.invoice.number}.pdf`,
                }).catch((err) => setError(err.message))
              }
            >
              <Download className="size-4" />
              Download invoice
            </button>
          )}
          <InvoiceSheet booking={booking} />
        </div>
      </div>
    </div>
  )
}
