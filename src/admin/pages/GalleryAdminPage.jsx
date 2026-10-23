import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api, mediaUrl } from '../lib/api'

const emptyForm = {
  title: '',
  service: '',
  category: 'Exterior',
  alt: '',
  span: 'normal',
  sortOrder: 0,
  isActive: true,
  image: '',
}

const spans = [
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
  { value: 'tall', label: 'Tall' },
  { value: 'feature', label: 'Large' },
]

export default function GalleryAdminPage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    api('/api/gallery?all=1', { token })
      .then((data) => setItems(data.items || []))
      .catch(console.error)

  useEffect(() => {
    load()
  }, [token])

  const reset = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setImagePreview('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const body = new FormData()
      body.append('title', form.title)
      body.append('service', form.service)
      body.append('category', form.category)
      body.append('alt', form.alt)
      body.append('span', form.span)
      body.append('sortOrder', String(form.sortOrder || 0))
      body.append('isActive', String(form.isActive))
      if (imageFile) body.append('image', imageFile)
      else if (form.image) body.append('keepImage', form.image)
      if (editingId) {
        await api(`/api/gallery/${editingId}`, { method: 'PUT', token, formData: body })
      } else {
        await api('/api/gallery', { method: 'POST', token, formData: body })
      }
      reset()
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const edit = (item) => {
    setEditingId(item._id)
    setForm({
      title: item.title,
      service: item.service || '',
      category: item.category || 'Exterior',
      alt: item.alt || '',
      span: item.span || 'normal',
      sortOrder: item.sortOrder || 0,
      isActive: item.isActive !== false,
      image: item.image || '',
    })
    setImageFile(null)
    setImagePreview(item.image ? mediaUrl(item.image) : '')
  }

  const remove = async (id) => {
    if (!confirm('Delete this gallery photo?')) return
    await api(`/api/gallery/${id}`, { method: 'DELETE', token })
    if (editingId === id) reset()
    await load()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="text-sm text-mist">Photos added here appear on the home page and the gallery page.</p>
        </div>
        {items.map((item) => (
          <div key={item._id} className="card flex items-start justify-between gap-3">
            <div className="flex gap-3">
              {item.image ? (
                <img src={mediaUrl(item.image)} alt="" className="size-16 rounded-xl object-cover" />
              ) : (
                <div className="grid size-16 place-items-center rounded-xl bg-graphite text-[10px] tracking-wide text-mist uppercase">No photo</div>
              )}
              <div>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="text-sm text-mist">
                  {item.category}
                  {item.service ? ` · ${item.service}` : ''}
                  {item.isActive === false ? ' · Hidden' : ''}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost" onClick={() => edit(item)}>
                Edit
              </button>
              <button type="button" className="btn-ghost" onClick={() => remove(item._id)}>
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="card h-fit space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit photo' : 'Add photo'}</h2>
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="label">Service label</label>
          <input className="input" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Category</label>
            <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          </div>
          <div>
            <label className="label">Tile size</label>
            <select className="input" value={form.span} onChange={(e) => setForm({ ...form, span: e.target.value })}>
              {spans.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Photo</label>
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              setImageFile(file || null)
              setImagePreview(file ? URL.createObjectURL(file) : form.image ? mediaUrl(form.image) : '')
            }}
          />
          {imagePreview && <img src={imagePreview} alt="" className="mt-3 h-36 w-full rounded-xl object-cover" />}
        </div>
        <div>
          <label className="label">Image description</label>
          <input className="input" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
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
        <label className="flex items-center gap-2 text-sm text-silver">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Show on the website
        </label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="flex gap-2">
          <button className="btn" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Update photo' : 'Add photo'}
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
