import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { easePremium } from './ui/Reveal'
import Button from './ui/Button'

export default function AuthModal() {
  const { authOpen, authIntent, closeAuth, login, register, openAuth } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const isRegister = authIntent === 'register'

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (isRegister) {
        await register(form)
      } else {
        await login(form.email, form.password)
      }
      setForm({ name: '', email: '', phone: '', password: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" onClick={closeAuth} />
          <div className="flex min-h-full items-center justify-center px-4 py-8">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easePremium }}
            className="relative w-full max-w-md rounded-[28px] border border-ink/10 bg-paper p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <button
              type="button"
              onClick={closeAuth}
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-xl border border-ink/10 text-ink"
            >
              <X className="size-4" />
            </button>
            <p className="eyebrow">{isRegister ? 'Create account' : 'Client login'}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              {isRegister ? 'Join Geekay' : 'Sign in to book'}
            </h2>
            <p className="mt-2 text-sm text-mist">
              {isRegister
                ? 'Register to book services and track your car spa appointments.'
                : 'Login is required to confirm a booking. Staff use the admin panel.'}
            </p>

            <div className="mt-6 space-y-3">
              {isRegister && (
                <input
                  className="w-full rounded-2xl border border-ink/10 bg-cloud px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              )}
              <input
                className="w-full rounded-2xl border border-ink/10 bg-cloud px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {isRegister && (
                <input
                  className="w-full rounded-2xl border border-ink/10 bg-cloud px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              )}
              <input
                className="w-full rounded-2xl border border-ink/10 bg-cloud px-4 py-3 text-sm text-ink outline-none focus:border-accent"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

            <Button type="submit" variant="accent" size="lg" className="mt-5 w-full" disabled={busy}>
              {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Login & continue'}
            </Button>

            <p className="mt-4 text-center text-sm text-mist">
              {isRegister ? 'Already have an account?' : 'New here?'}{' '}
              <button
                type="button"
                className="text-accent hover:underline"
                onClick={() => openAuth(isRegister ? 'login' : 'register')}
              >
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </motion.form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
