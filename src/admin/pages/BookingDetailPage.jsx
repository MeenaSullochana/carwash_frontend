import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api, downloadFile, mediaUrl } from '../lib/api'
import { rupee, statusLabel } from '../../lib/status'
import InvoiceSheet from '../../components/InvoiceSheet'

const STAFF_ROLES = ['admin', 'supervisor', 'staff', 'washer']

export default function BookingDetailPage() {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [booking, setBooking] = useState(null)
  const [catalog, setCatalog] = useState([])
  const [people, setPeople] = useState([])
  const [selected, setSelected] = useState([])
  const [customName, setCustomName] = useState('')
  const [work, setWork] = useState([])
  const [checks, setChecks] = useState([])
  const [extras, setExtras] = useState([{ label: '', amount: '' }])
  const [bill, setBill] = useState({ discount: 0, taxPercent: 0, method: 'upi', notes: '' })
  const [submitNotes, setSubmitNotes] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isAdmin = user.role === 'admin'
  const canDownloadInvoice = ['admin', 'supervisor'].includes(user.role)
  const canWork = STAFF_ROLES.includes(user.role)
  const closed = ['completed', 'cancelled'].includes(booking?.status)

  const refresh = async () => {
    const data = await api(`/api/bookings/${id}`, { token })
    const next = data.booking
    setBooking(next)
    setSelected((next.carAccessories || []).filter((item) => item.accessoryId).map((item) => item.accessoryId))
    setWork(
      (next.workItems || []).map((item) => ({
        id: item._id,
        done: item.done,
        doneBy: item.doneBy?._id ? String(item.doneBy._id) : user.id,
      })),
    )
    setChecks(
      (next.carAccessories || []).map((item) => ({
        id: item._id,
        presentAfter: item.presentAfter,
        note: item.note || '',
      })),
    )
    setSubmitNotes(next.submission?.notes || '')
    if (next.invoice?.number) {
      setBill({
        discount: next.invoice.discount || 0,
        taxPercent: next.invoice.taxPercent || 0,
        method: next.invoice.method || 'upi',
        notes: next.invoice.notes || '',
      })
      const extraLines = (next.invoice.lines || []).slice(1)
      setExtras(extraLines.length ? extraLines.map((line) => ({ label: line.label, amount: String(line.amount) })) : [{ label: '', amount: '' }])
    }
  }

  useEffect(() => {
    refresh().catch((err) => setError(err.message))
    api('/api/accessories', { token })
      .then((data) => setCatalog(data.accessories || []))
      .catch(console.error)
    api('/api/users', { token })
      .then((data) => setPeople((data.users || []).filter((person) => person.role !== 'client')))
      .catch(console.error)
  }, [id, token])

  const run = async (fn, ok) => {
    setError('')
    setMessage('')
    try {
      await fn()
      await refresh()
      if (ok) setMessage(ok)
    } catch (err) {
      setError(err.message)
    }
  }

  const uploadJobPhotos = (endpoint, files, ok) => {
    const body = new FormData()
    files.forEach((file) => body.append('images', file))
    return run(() => api(`/api/bookings/${id}/${endpoint}`, { method: 'POST', token, formData: body }), ok)
  }

  const removeJobPhoto = (endpoint, image) =>
    run(() => api(`/api/bookings/${id}/${endpoint}`, { method: 'DELETE', token, body: { image } }), 'Photo removed')

  if (!booking) return <div className="text-mist">{error || 'Loading job…'}</div>

  const toggleCatalog = (itemId) => {
    setSelected((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const saveIntake = () => {
    const custom = (booking.carAccessories || [])
      .filter((item) => !item.accessoryId)
      .map((item) => ({ name: item.name, presentBefore: true, note: item.note || '' }))
    if (customName.trim()) custom.push({ name: customName.trim(), presentBefore: true })
    const items = [
      ...selected.map((accessoryId) => ({ accessoryId, presentBefore: true })),
      ...custom,
    ]
    return run(async () => {
      await api(`/api/bookings/${id}/car-accessories`, { method: 'PUT', token, body: { items } })
      setCustomName('')
    }, 'Car accessories saved')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link to="/admin/bookings" className="text-sm text-mist hover:text-accent">
            ← Jobs
          </Link>
          <h1 className="mt-2 text-2xl font-semibold">{booking.serviceSnapshot?.title}</h1>
          <p className="text-sm text-mist">
            {booking.bookingCode} · {booking.client?.name} · {booking.client?.phone || booking.phone}
          </p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent uppercase tracking-wide">
          {statusLabel(booking.status)}
        </div>
      </div>

      {(message || error) && (
        <p className={`rounded-xl px-4 py-3 text-sm ${error ? 'bg-red-500/10 text-red-300' : 'bg-accent/10 text-accent'}`}>
          {error || message}
        </p>
      )}

      <div className="card space-y-2 text-sm">
        <p>
          <span className="text-mist">Schedule:</span> {booking.scheduledDate} at {booking.scheduledTime}
        </p>
        <p>
          <span className="text-mist">Vehicle:</span> {booking.vehicleName || booking.vehicleType} {booking.vehicleNumber}
        </p>
        <p>
          <span className="text-mist">Notes:</span> {booking.notes || '—'}
        </p>
        <p>
          <span className="text-mist">Service price:</span> {rupee(booking.serviceSnapshot?.price)}
        </p>
      </div>

      <JobPhotos
        title="1. Before images"
        hint="Select one or more photos of the car before the work. Upload again to add more."
        images={booking.beforeImages}
        empty="No before photos yet."
        editable={canWork && !closed}
        onUpload={(files) => uploadJobPhotos('before-images', files, 'Before images updated')}
        onRemove={(image) => removeJobPhoto('before-images', image)}
      />

      {canWork && !closed && booking.status !== 'billed' && (
        <div className="card space-y-4">
          <div>
            <h2 className="text-lg font-semibold">2. Accessories in this car</h2>
            <p className="text-sm text-mist">Tick what is already in the car when it arrives. This is a cross-check list, not a product sale.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {catalog.map((item) => (
              <label key={item._id} className="flex items-center gap-3 rounded-xl border border-ink/10 px-3 py-2 text-sm">
                <input type="checkbox" checked={selected.includes(item._id)} onChange={() => toggleCatalog(item._id)} />
                <span>
                  {item.name}
                  <span className="ml-2 text-xs text-mist">{item.category}</span>
                </span>
              </label>
            ))}
          </div>
          {(booking.carAccessories || []).some((item) => !item.accessoryId) && (
            <p className="text-sm text-mist">
              Also recorded: {(booking.carAccessories || []).filter((item) => !item.accessoryId).map((item) => item.name).join(', ')}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <input
              className="input max-w-xs"
              placeholder="Other item in the car"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <button type="button" className="btn" onClick={saveIntake}>
              Save intake
            </button>
          </div>
        </div>
      )}

      <div className="card space-y-4">
        <div>
          <h2 className="text-lg font-semibold">3. Included work</h2>
          <p className="text-sm text-mist">Mark each part of this service done and record who did it.</p>
        </div>
        <div className="space-y-3">
          {(booking.workItems || []).map((item) => {
            const row = work.find((entry) => entry.id === item._id) || { done: false, doneBy: user.id }
            return (
              <div key={item._id} className="grid gap-3 rounded-xl border border-ink/10 p-3 sm:grid-cols-[1fr_180px] sm:items-center">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={row.done}
                    disabled={!canWork || closed || booking.status === 'billed'}
                    onChange={(e) =>
                      setWork((prev) => prev.map((entry) => (entry.id === item._id ? { ...entry, done: e.target.checked } : entry)))
                    }
                  />
                  <span>
                    <span className="block text-ink">{item.title}</span>
                    {item.description && <span className="text-mist">{item.description}</span>}
                  </span>
                </label>
                <select
                  className="input"
                  value={row.doneBy || ''}
                  disabled={!row.done || !canWork || closed || booking.status === 'billed'}
                  onChange={(e) =>
                    setWork((prev) => prev.map((entry) => (entry.id === item._id ? { ...entry, doneBy: e.target.value } : entry)))
                  }
                >
                  <option value="">Who did this</option>
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                  {!people.some((person) => person.id === user.id) && <option value={user.id}>{user.name}</option>}
                </select>
              </div>
            )
          })}
        </div>
        {canWork && !closed && booking.status !== 'billed' && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => run(() => api(`/api/bookings/${id}/work`, { method: 'PATCH', token, body: { items: work } }), 'Work updated')}
          >
            Save work
          </button>
        )}
      </div>

      <JobPhotos
        title="4. After service images"
        hint="Select one or more photos after the work is finished. Upload again to add more, or remove a photo to replace it."
        images={booking.afterImages}
        empty="No after photos yet."
        editable={canWork && !closed}
        onUpload={(files) => uploadJobPhotos('after-images', files, 'After images updated')}
        onRemove={(image) => removeJobPhoto('after-images', image)}
      />

      <div className="card space-y-4">
        <div>
          <h2 className="text-lg font-semibold">5. Final accessory check</h2>
          <p className="text-sm text-mist">Confirm every recorded item is still in the car.</p>
        </div>
        {!booking.carAccessories?.length && <p className="text-sm text-mist">No accessories were recorded. Save the intake if the car had items, or save an empty intake if it had none.</p>}
        <div className="space-y-3">
          {(booking.carAccessories || []).map((item) => {
            const row = checks.find((entry) => entry.id === item._id) || {}
            return (
              <div key={item._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 px-3 py-3 text-sm">
                <span className="text-ink">{item.name}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`rounded-lg px-3 py-1.5 ${row.presentAfter === true ? 'bg-accent text-paper' : 'bg-graphite text-silver'}`}
                    onClick={() => setChecks((prev) => prev.map((entry) => (entry.id === item._id ? { ...entry, presentAfter: true } : entry)))}
                  >
                    Still there
                  </button>
                  <button
                    type="button"
                    className={`rounded-lg px-3 py-1.5 ${row.presentAfter === false ? 'bg-red-500 text-white' : 'bg-graphite text-silver'}`}
                    onClick={() => setChecks((prev) => prev.map((entry) => (entry.id === item._id ? { ...entry, presentAfter: false } : entry)))}
                  >
                    Missing
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        {canWork && !closed && booking.status !== 'billed' && !!booking.carAccessories?.length && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() =>
              run(
                () => api(`/api/bookings/${id}/accessory-check`, { method: 'PATCH', token, body: { items: checks } }),
                'Accessory check saved',
              )
            }
          >
            Save cross-check
          </button>
        )}
      </div>

      {canWork && !closed && !['billed', 'submitted'].includes(booking.status) && (
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">6. Submit to admin</h2>
          <textarea
            className="input min-h-24"
            placeholder="Notes for admin"
            value={submitNotes}
            onChange={(e) => setSubmitNotes(e.target.value)}
          />
          <button
            type="button"
            className="btn"
            onClick={() =>
              run(async () => {
                await api(`/api/bookings/${id}/work`, { method: 'PATCH', token, body: { items: work } })
                if (checks.length) {
                  await api(`/api/bookings/${id}/accessory-check`, { method: 'PATCH', token, body: { items: checks } })
                }
                await api(`/api/bookings/${id}/submit`, {
                  method: 'POST',
                  token,
                  body: { notes: submitNotes, workerIds: work.filter((item) => item.doneBy).map((item) => item.doneBy) },
                })
              }, 'Submitted for billing')
            }
          >
            Submit final check
          </button>
        </div>
      )}

      {booking.submission?.submitted && (
        <div className="card text-sm">
          <p className="text-ink">Submitted by {booking.submission.submittedBy?.name || 'staff'}</p>
          <p className="mt-1 text-mist">
            Worked by {(booking.submission.workers || []).map((person) => person.name).join(', ') || '—'}
          </p>
          {booking.submission.notes && <p className="mt-2">{booking.submission.notes}</p>}
        </div>
      )}

      {isAdmin && ['submitted', 'billed', 'completed'].includes(booking.status) && (
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Generate bill</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="label">Discount</label>
              <input className="input" type="number" min="0" value={bill.discount} onChange={(e) => setBill({ ...bill, discount: e.target.value })} />
            </div>
            <div>
              <label className="label">Tax %</label>
              <input className="input" type="number" min="0" value={bill.taxPercent} onChange={(e) => setBill({ ...bill, taxPercent: e.target.value })} />
            </div>
            <div>
              <label className="label">Payment</label>
              <select className="input" value={bill.method} onChange={(e) => setBill({ ...bill, method: e.target.value })}>
                <option value="upi">UPI</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>
          {extras.map((line, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[1fr_140px]">
              <input
                className="input"
                placeholder="Extra charge"
                value={line.label}
                onChange={(e) => setExtras((prev) => prev.map((row, i) => (i === index ? { ...row, label: e.target.value } : row)))}
              />
              <input
                className="input"
                type="number"
                placeholder="Amount"
                value={line.amount}
                onChange={(e) => setExtras((prev) => prev.map((row, i) => (i === index ? { ...row, amount: e.target.value } : row)))}
              />
            </div>
          ))}
          <button type="button" className="btn-ghost" onClick={() => setExtras((prev) => [...prev, { label: '', amount: '' }])}>
            Add extra line
          </button>
          <textarea className="input min-h-20" placeholder="Invoice note" value={bill.notes} onChange={(e) => setBill({ ...bill, notes: e.target.value })} />
          {booking.status !== 'completed' && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  run(
                    () =>
                      api(`/api/bookings/${id}/invoice`, {
                        method: 'POST',
                        token,
                        body: {
                          ...bill,
                          discount: Number(bill.discount) || 0,
                          taxPercent: Number(bill.taxPercent) || 0,
                          extras: extras.filter((line) => line.label).map((line) => ({ label: line.label, amount: Number(line.amount) || 0 })),
                        },
                      }),
                    'Bill generated',
                  )
                }
              >
                Generate bill
              </button>
              {booking.invoice?.number && (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => run(() => api(`/api/bookings/${id}/complete`, { method: 'POST', token, body: { method: bill.method } }), 'Booking completed')}
                >
                  Complete process
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {canDownloadInvoice && booking.invoice?.number && (
        <div className="flex justify-end">
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
        </div>
      )}

      <InvoiceSheet booking={booking} />
    </div>
  )
}

function JobPhotos({ title, hint, images = [], empty, editable, onUpload, onRemove }) {
  return (
    <div className="card space-y-3">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {editable && <p className="text-sm text-mist">{hint}</p>}
      </div>
      {editable && (
        <input
          type="file"
          accept="image/*"
          multiple
          className="input"
          onChange={(event) => {
            const files = [...(event.target.files || [])]
            if (!files.length) return
            onUpload(files)
            event.target.value = ''
          }}
        />
      )}
      <div className="flex flex-wrap gap-3">
        {images.map((image) => (
          <div key={image} className="relative">
            <img src={mediaUrl(image)} alt="" className="h-24 w-32 rounded-xl object-cover" />
            {editable && (
              <button
                type="button"
                className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-black/70 text-white"
                aria-label="Remove photo"
                onClick={() => onRemove(image)}
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        ))}
        {!images.length && <p className="text-sm text-mist">{empty}</p>}
      </div>
    </div>
  )
}
