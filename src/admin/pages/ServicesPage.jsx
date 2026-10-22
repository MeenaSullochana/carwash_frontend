import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api, mediaUrl } from '../lib/api'

const emptyForm = {
  title: '',
  description: '',
  price: '',
  durationMinutes: 60,
  steps: [{ title: '', description: '' }],
}

export default function ServicesPage() {
  const { token } = useAuth()
  const [services, setServices] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const load = () =>
    api('/api/services?all=1', { token }).then((d) => setServices(d.services || [])).catch(console.error)

  useEffect(() => {
    load()
  }, [token])

  const setStep = (index, key, value) => {
    setForm((f) => {
      const steps = [...f.steps]
      steps[index] = { ...steps[index], [key]: value }
      return { ...f, steps }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const body = new FormData()
      body.append('title', form.title)
      body.append('description', form.description)
      body.append('price', form.price)
      body.append('durationMinutes', String(form.durationMinutes || 60))
      body.append('steps', JSON.stringify(form.steps.filter((step) => step.title.trim())))
      if (imageFile) body.append('image', imageFile)
      else if (form.image) body.append('keepImage', form.image)
      if (editingId) {
        await api(`/api/services/${editingId}`, { method: 'PUT', token, formData: body })
      } else {
        await api('/api/services', { method: 'POST', token, formData: body })
      }
      setForm(emptyForm)
      setEditingId(null)
      setImageFile(null)
      setImagePreview('')
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const edit = (service) => {
    setEditingId(service._id)
    setForm({
      title: service.title,
      description: service.description || '',
      price: String(service.price),
      durationMinutes: service.durationMinutes || 60,
      image: service.image || '',
      steps: service.steps?.length
        ? service.steps.map((s) => ({ title: s.title, description: s.description || '' }))
        : [{ title: '', description: '' }],
    })
    setImageFile(null)
    setImagePreview(service.image ? mediaUrl(service.image) : '')
  }

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return
    await api(`/api/services/${id}`, { method: 'DELETE', token })
    await load()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-sm text-mist">Each service lists what is included. Leave the steps empty to keep it as a single job.</p>
        </div>
        {services.map((s) => (
          <div key={s._id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex gap-3">
                {s.image ? (
                  <img src={mediaUrl(s.image)} alt="" className="size-16 rounded-xl object-cover" />
                ) : (
                  <div className="grid size-16 place-items-center rounded-xl bg-graphite text-[10px] tracking-wide text-mist uppercase">No photo</div>
                )}
                <div>
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-mist">{s.description}</p>
                <p className="mt-2 text-accent">₹{s.price} · {s.steps?.length ? `${s.steps.length} included` : 'Single service'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost" onClick={() => edit(s)}>
                  Edit
                </button>
                <button type="button" className="btn-ghost" onClick={() => remove(s._id)}>
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <ol className="mt-4 space-y-1 text-sm">
              {(s.steps || []).map((step, i) => (
                <li key={step._id || i} className="text-silver">
                  <span className="text-mist">{String(i + 1).padStart(2, '0')}.</span> {step.title}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="card h-fit space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit service' : 'Add service'}</h2>
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-20"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Card image</label>
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
          <p className="mt-2 text-xs text-mist">This photo is shown on the website service cards.</p>
          {imagePreview && <img src={imagePreview} alt="" className="mt-3 h-36 w-full rounded-xl object-cover" />}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Price (₹)</label>
            <input
              className="input"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Duration (min)</label>
            <input
              className="input"
              type="number"
              min="15"
              value={form.durationMinutes}
              onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Checklist steps</label>
            <button
              type="button"
              className="btn-ghost !py-1.5"
              onClick={() => setForm((f) => ({ ...f, steps: [...f.steps, { title: '', description: '' }] }))}
            >
              <Plus className="size-4" /> Add step
            </button>
          </div>
          {form.steps.map((step, i) => (
            <div key={i} className="rounded-xl border border-ink/10 bg-graphite/50 p-3">
              <input
                className="input mb-2"
                placeholder={`Step ${i + 1} title`}
                value={step.title}
                onChange={(e) => setStep(i, 'title', e.target.value)}
              />
              <input
                className="input"
                placeholder="Optional description"
                value={step.description}
                onChange={(e) => setStep(i, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="flex gap-2">
          <button className="btn" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Update service' : 'Create service'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setEditingId(null)
                setForm(emptyForm)
                setImageFile(null)
                setImagePreview('')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
