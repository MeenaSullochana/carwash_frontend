import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function AccessoriesPage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', category: 'Cabin', description: '' })
  const [error, setError] = useState('')

  const load = () =>
    api('/api/accessories?all=1', { token })
      .then((data) => setItems(data.accessories || []))
      .catch(console.error)

  useEffect(() => {
    load()
  }, [token])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api('/api/accessories', { method: 'POST', token, body: form })
      setForm({ name: '', category: 'Cabin', description: '' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Remove this car item?')) return
    await api(`/api/accessories/${id}`, { method: 'DELETE', token })
    await load()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Items in the car</h1>
          <p className="text-sm text-mist">Staff tick these at intake and cross-check them when the job is finished.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item._id} className="card flex items-start justify-between gap-3">
              <div>
                <p className="text-ink">{item.name}</p>
                <p className="text-xs tracking-wide text-mist uppercase">{item.category || 'Cabin'}</p>
              </div>
              <button type="button" className="text-xs text-red-300" onClick={() => remove(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit} className="card space-y-3 self-start">
        <h2 className="text-lg font-semibold">Add item</h2>
        <div>
          <label className="label">Name</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="label">Category</label>
          <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
        <div>
          <label className="label">Note</label>
          <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button className="btn w-full">Save item</button>
      </form>
    </div>
  )
}
