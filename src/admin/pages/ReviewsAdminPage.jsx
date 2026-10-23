import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const emptyForm = {
  name: '',
  quote: '',
  car: '',
  service: '',
  rating: 5,
  sortOrder: 0,
  featured: false,
  isActive: true,
}

export default function ReviewsAdminPage() {
  const { token } = useAuth()
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    api('/api/reviews?all=1', { token })
      .then((data) => setReviews(data.reviews || []))
      .catch(console.error)

  useEffect(() => {
    load()
  }, [token])

  const reset = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const path = editingId ? `/api/reviews/${editingId}` : '/api/reviews'
      await api(path, { method: editingId ? 'PUT' : 'POST', token, body: form })
      reset()
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const edit = (review) => {
    setEditingId(review._id)
    setForm({
      name: review.name,
      quote: review.quote,
      car: review.car || '',
      service: review.service || '',
      rating: review.rating || 5,
      sortOrder: review.sortOrder || 0,
      featured: Boolean(review.featured),
      isActive: review.isActive !== false,
    })
  }

  const remove = async (id) => {
    if (!confirm('Delete this review?')) return
    await api(`/api/reviews/${id}`, { method: 'DELETE', token })
    if (editingId === id) reset()
    await load()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <p className="text-sm text-mist">Featured reviews appear on the home page. Every visible review appears on the reviews page.</p>
        </div>
        {reviews.map((review) => (
          <div key={review._id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-ink">
                  {review.name} · {review.rating}/5
                </h3>
                <p className="mt-1 text-sm text-silver">“{review.quote}”</p>
                <p className="mt-2 text-xs tracking-wide text-mist uppercase">
                  {[review.car, review.service].filter(Boolean).join(' · ') || 'No car listed'}
                  {review.featured ? ' · Home' : ''}
                  {review.isActive === false ? ' · Hidden' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost" onClick={() => edit(review)}>
                  Edit
                </button>
                <button type="button" className="btn-ghost" onClick={() => remove(review._id)}>
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="card h-fit space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit review' : 'Add review'}</h2>
        <div>
          <label className="label">Customer name</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="label">Review</label>
          <textarea className="input min-h-28" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Car</label>
            <input className="input" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} />
          </div>
          <div>
            <label className="label">Service</label>
            <input className="input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Stars</label>
            <select className="input" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((stars) => (
                <option key={stars} value={stars}>
                  {stars}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Order</label>
            <input
              className="input"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-silver">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Show on the home page
        </label>
        <label className="flex items-center gap-2 text-sm text-silver">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Show on the website
        </label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="flex gap-2">
          <button className="btn" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Update review' : 'Add review'}
          </button>
          {editingId && (
            <button type="button" className="btn-ghost" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
