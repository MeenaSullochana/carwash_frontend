import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

const empty = { name: '', email: '', phone: '', password: '', role: 'staff' }

export default function StaffPage() {
  const { token } = useAuth()
  const [staff, setStaff] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = () =>
    api('/api/users', { token })
      .then((d) => setStaff((d.users || []).filter((u) => ['admin', 'supervisor', 'staff', 'washer'].includes(u.role))))
      .catch(console.error)

  useEffect(() => {
    load()
  }, [token])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api('/api/users', { method: 'POST', token, body: form })
      setForm(empty)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleActive = async (user) => {
    await api(`/api/users/${user.id}`, {
      method: 'PATCH',
      token,
      body: { isActive: !user.isActive },
    })
    await load()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Staff</h1>
          <p className="text-sm text-mist">Add supervisors and washing persons dynamically.</p>
        </div>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs tracking-[0.16em] text-mist uppercase">
              <tr>
                <th className="pb-3">Name</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((u) => (
                <tr key={u.id} className="border-t border-ink/5">
                  <td className="py-3 text-ink">{u.name}</td>
                  <td className="py-3 uppercase">{u.role}</td>
                  <td className="py-3">
                    {u.email}
                    <br />
                    <span className="text-mist">{u.phone}</span>
                  </td>
                  <td className="py-3">
                    <button type="button" className="btn-ghost !py-1.5" onClick={() => toggleActive(u)}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={onSubmit} className="card h-fit space-y-3">
        <h2 className="text-lg font-semibold">Add staff</h2>
        <div>
          <label className="label">Name</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="label">Role</label>
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="staff">Staff</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button className="btn w-full">Create staff</button>
      </form>
    </div>
  )
}
