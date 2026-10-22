import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'

export default function PasswordPage() {
  const { token } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match')
      return
    }
    setBusy(true)
    try {
      await api('/api/auth/password', {
        method: 'PATCH',
        token,
        body: { currentPassword: form.currentPassword, newPassword: form.newPassword },
      })
      setMessage('Password updated')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Password</h1>
        <p className="text-sm text-mist">This password is the same one used on the website and in the app.</p>
      </div>
      <form onSubmit={onSubmit} className="card space-y-4">
        {message && <p className="text-sm text-accent">{message}</p>}
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div>
          <label className="label">Current password</label>
          <input
            className="input"
            type="password"
            value={form.currentPassword}
            onChange={(event) => setForm({ ...form, currentPassword: event.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">New password</label>
          <input
            className="input"
            type="password"
            minLength={6}
            value={form.newPassword}
            onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
            required
          />
        </div>
        <div>
          <label className="label">Confirm new password</label>
          <input
            className="input"
            type="password"
            minLength={6}
            value={form.confirmPassword}
            onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Saving…' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
