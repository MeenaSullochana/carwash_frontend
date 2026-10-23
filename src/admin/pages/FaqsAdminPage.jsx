import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const emptyForm = {
  question: '',
  answer: '',
  sortOrder: 0,
  showOnHome: true,
  isActive: true,
}

export default function FaqsAdminPage() {
  const { token } = useAuth()
  const [faqs, setFaqs] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    api('/api/faqs?all=1', { token })
      .then((data) => setFaqs(data.faqs || []))
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
      const path = editingId ? `/api/faqs/${editingId}` : '/api/faqs'
      await api(path, { method: editingId ? 'PUT' : 'POST', token, body: form })
      reset()
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const edit = (faq) => {
    setEditingId(faq._id)
    setForm({
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder || 0,
      showOnHome: faq.showOnHome !== false,
      isActive: faq.isActive !== false,
    })
  }

  const remove = async (id) => {
    if (!confirm('Delete this question?')) return
    await api(`/api/faqs/${id}`, { method: 'DELETE', token })
    if (editingId === id) reset()
    await load()
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">FAQ</h1>
          <p className="text-sm text-mist">Questions marked for the home page appear in the home section. The FAQ page shows every visible question.</p>
        </div>
        {faqs.map((faq) => (
          <div key={faq._id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-ink">{faq.question}</h3>
                <p className="mt-1 text-sm text-mist">{faq.answer}</p>
                <p className="mt-2 text-xs tracking-wide text-mist uppercase">
                  {faq.showOnHome ? 'Home + FAQ page' : 'FAQ page only'}
                  {faq.isActive === false ? ' · Hidden' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-ghost" onClick={() => edit(faq)}>
                  Edit
                </button>
                <button type="button" className="btn-ghost" onClick={() => remove(faq._id)}>
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="card h-fit space-y-4">
        <h2 className="text-lg font-semibold">{editingId ? 'Edit question' : 'Add question'}</h2>
        <div>
          <label className="label">Question</label>
          <input className="input" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
        </div>
        <div>
          <label className="label">Answer</label>
          <textarea className="input min-h-28" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
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
          <input type="checkbox" checked={form.showOnHome} onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })} />
          Show on the home page
        </label>
        <label className="flex items-center gap-2 text-sm text-silver">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Show on the website
        </label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="flex gap-2">
          <button className="btn" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Update question' : 'Add question'}
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
