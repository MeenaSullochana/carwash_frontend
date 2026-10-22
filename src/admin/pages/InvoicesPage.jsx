import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api, downloadFile } from '../lib/api'
import { rupee, statusLabel } from '../../lib/status'

export default function InvoicesPage() {
  const { token } = useAuth()
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')

  const download = async (event, row) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      await downloadFile(`/api/invoices/${row.bookingId}/download`, {
        token,
        filename: `${row.invoice.number}.pdf`,
      })
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    api('/api/invoices', { token })
      .then((data) => setInvoices(data.invoices || []))
      .catch((err) => setError(err.message))
  }, [token])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <p className="text-sm text-mist">Bills generated after staff submit a job.</p>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="space-y-3">
        {invoices.map((row) => (
          <div key={row.bookingId} className="card flex flex-wrap items-start justify-between gap-3">
            <Link to={`/admin/bookings/${row.bookingId}`} className="min-w-0 flex-1">
              <p className="font-display text-lg text-ink">{row.invoice.number}</p>
              <p className="mt-1 text-sm text-mist">
                {row.bookingCode} · {row.client?.name} · {row.service}
              </p>
              <p className="mt-1 text-sm">
                {row.vehicleName} {row.vehicleNumber}
              </p>
            </Link>
            <div className="flex items-start gap-3">
              <div className="text-right">
                <p className="text-sm text-ink">{rupee(row.invoice.total)}</p>
                <p className="mt-1 text-xs tracking-wide text-accent uppercase">
                  {row.invoice.status} · {statusLabel(row.status)}
                </p>
              </div>
              <button type="button" className="btn-ghost" onClick={(event) => download(event, row)}>
                <Download className="size-4" />
                Download
              </button>
            </div>
          </div>
        ))}
        {!invoices.length && !error && <p className="card text-sm text-mist">No invoices yet.</p>}
      </div>
    </div>
  )
}
