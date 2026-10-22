import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Sparkles,
} from 'lucide-react'
import Button from './ui/Button'
import { easePremium } from './ui/Reveal'
import { serviceOptions, timeSlots } from '../data/content'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

const fieldShell =
  'relative flex items-center gap-3 rounded-2xl border border-ink/10 bg-cloud px-4 transition-all duration-300 focus-within:border-accent focus-within:bg-paper focus-within:shadow-[0_0_0_4px_rgba(239,43,53,0.2)] hover:border-ink/20'

export const textInput = 'w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-mist'

export function Field({ label, icon: Icon, className = '', shellClassName = 'h-14', children }) {
  const id = useId()
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="mb-2 block text-[11px] font-medium tracking-[0.2em] text-mist uppercase">
        {label}
      </label>
      <div className={`${fieldShell} ${shellClassName}`}>
        <Icon className="size-[18px] shrink-0 text-accent-deep" aria-hidden="true" />
        {children(id)}
      </div>
    </div>
  )
}

export function Select({ id, value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const listId = `${id}-list`

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  useEffect(() => {
    if (open && active >= 0) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)))
    setOpen(true)
  }

  const choose = (opt) => {
    onChange(opt)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(options.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(options.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (active >= 0) choose(options[active])
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className="flex min-w-0 flex-1 self-stretch">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 bg-transparent text-left text-[15px] outline-none ${
          value ? 'text-ink' : 'text-mist'
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-accent-deep' : 'text-mist'}`}
          aria-hidden="true"
        />
      </button>

      <input
        tabIndex={-1}
        aria-hidden="true"
        required
        value={value}
        onChange={() => {}}
        onInvalid={() => document.getElementById(id)?.focus()}
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
      />

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: easePremium }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-64 origin-top overflow-y-auto overscroll-contain rounded-2xl border border-black/5 bg-paper p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.16),0_0_0_1px_rgba(239,43,53,0.15)]"
          >
            {options.map((opt, i) => {
              const selected = opt === value
              return (
                <li
                  key={opt}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => choose(opt)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[14px] transition-colors duration-150 ${
                    selected
                      ? 'bg-sky-50 font-medium text-sky-700'
                      : i === active
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {selected && <Check className="size-4 shrink-0 text-sky-600" aria-hidden="true" />}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BookingCard() {
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const { user, token, openAuth } = useAuth()
  const pendingSubmit = useRef(false)
  const [services, setServices] = useState([])
  const [form, setForm] = useState({
    vehicle: '',
    number: '',
    service: '',
    date: '',
    time: '',
    phone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [bookingCode, setBookingCode] = useState('')

  useEffect(() => {
    api('/api/services')
      .then((data) => setServices(data.services || []))
      .catch(() => setServices([]))
  }, [])

  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('service')
    if (preset) setForm((current) => ({ ...current, service: current.service || preset }))
  }, [])

  useEffect(() => {
    if (!user) return
    setForm((current) => ({
      ...current,
      email: current.email || user.email || '',
      phone: current.phone || user.phone || '',
    }))
  }, [user])

  const options = services.length ? services.map((service) => service.title) : serviceOptions

  const update = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setStatus('idle')
    setError('')
  }

  const submitBooking = async (current) => {
    const match = services.find((service) => service.title === current.service)
    if (!match) {
      setStatus('idle')
      setError('Choose a service from the list.')
      return
    }
    setStatus('checking')
    setError('')
    try {
      const data = await api('/api/bookings', {
        method: 'POST',
        token,
        body: {
          serviceId: match._id,
          vehicleName: current.vehicle,
          vehicleNumber: current.number,
          scheduledDate: current.date,
          scheduledTime: current.time,
          phone: current.phone,
          email: current.email,
          notes: current.message,
        },
      })
      setBookingCode(data.booking?.bookingCode || '')
      setStatus('booked')
    } catch (err) {
      setStatus('idle')
      setError(err.message)
    }
  }

  useEffect(() => {
    if (user && token && pendingSubmit.current) {
      pendingSubmit.current = false
      submitBooking(form)
    }
    // Submit the form the customer already filled once login finishes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!user || !token) {
      pendingSubmit.current = true
      openAuth('login')
      setError('Login to confirm this booking. It is sent as soon as you sign in.')
      return
    }
    submitBooking(form)
  }

  return (
    <section id="booking" aria-labelledby="booking-title" className="relative z-20 -mt-14 scroll-mt-28 sm:-mt-20 lg:-mt-32">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          transition={{ duration: 0.9, ease: easePremium }}
          className="group relative rounded-[28px] bg-gradient-to-b from-accent/50 via-ink/10 to-ink/5 p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,0.3)] transition-shadow duration-500 hover:shadow-[0_40px_120px_-30px_rgba(239,43,53,0.25)]"
        >
          <div className="relative rounded-[27px] bg-paper/90 p-5 backdrop-blur-2xl sm:p-7 lg:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[27px]">
              <div className="absolute -top-24 -left-24 size-72 rounded-full bg-accent/10 blur-3xl" />
              <div className="grain" />
            </div>

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Instant booking</p>
                  <h2 id="booking-title" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-[28px]">
                    Book Your Car Spa
                  </h2>
                </div>
                <p className="hidden items-center gap-2 text-sm text-mist sm:flex">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  Slots open today · Free doorstep pickup within 10 km
                </p>
              </div>

              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:items-end">
                <Field label="Vehicle Name" icon={Car}>
                  {(id) => (
                    <input
                      id={id}
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="e.g. Honda City"
                      value={form.vehicle}
                      onChange={(e) => update('vehicle')(e.target.value)}
                      className={textInput}
                    />
                  )}
                </Field>
                <Field label="Vehicle Number" icon={Car}>
                  {(id) => (
                    <input
                      id={id}
                      type="text"
                      autoComplete="off"
                      placeholder="TN 11 AB 1234"
                      value={form.number}
                      onChange={(e) => update('number')(e.target.value.toUpperCase())}
                      className={textInput}
                    />
                  )}
                </Field>
                <Field label="Service" icon={Sparkles}>
                  {(id) => (
                    <Select id={id} value={form.service} onChange={update('service')} placeholder="Select Service" options={options} />
                  )}
                </Field>
                <Field label="Date" icon={CalendarDays}>
                  {(id) => (
                    <input
                      id={id}
                      type="date"
                      required
                      min={today}
                      value={form.date}
                      onChange={(e) => update('date')(e.target.value)}
                      className={`w-full min-w-0 bg-transparent text-[15px] outline-none ${form.date ? 'text-ink' : 'text-mist'}`}
                    />
                  )}
                </Field>
                <Field label="Time" icon={Clock}>
                  {(id) => (
                    <Select id={id} value={form.time} onChange={update('time')} placeholder="Choose Time" options={timeSlots} />
                  )}
                </Field>
                <Field label="Phone" icon={Phone}>
                  {(id) => (
                    <input
                      id={id}
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="[+0-9\s\-]{10,15}"
                      title="Enter a valid phone number (10–15 digits)"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => update('phone')(e.target.value)}
                      className={textInput}
                    />
                  )}
                </Field>
                <Field label="Email" icon={Mail}>
                  {(id) => (
                    <input
                      id={id}
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update('email')(e.target.value)}
                      className={textInput}
                    />
                  )}
                </Field>
                <Field label="Message" icon={MessageSquare} className="sm:col-span-2">
                  {(id) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="Any special requests? (optional)"
                      value={form.message}
                      onChange={(e) => update('message')(e.target.value)}
                      className={textInput}
                    />
                  )}
                </Field>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  icon={status === 'idle'}
                  disabled={status === 'checking'}
                  className="w-full sm:col-span-2 xl:col-span-4 xl:w-auto xl:justify-self-end"
                >
                  {status === 'checking' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Booking
                    </span>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </form>
            </div>

            <AnimatePresence>
              {(status === 'booked' || error) && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: easePremium }}
                  className={`relative flex items-center gap-2 overflow-hidden pt-5 text-sm ${error ? 'text-red-300' : 'text-silver'}`}
                >
                  <CheckCircle2 className={`size-4 shrink-0 ${error ? 'text-red-300' : 'text-accent-deep'}`} aria-hidden="true" />
                  {error ? (
                    error
                  ) : (
                    <span>
                      Booked {bookingCode} for {form.vehicle} on{' '}
                      {new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} at {form.time}.{' '}
                      <a href="/account/bookings" className="text-ink underline">
                        View in my account
                      </a>
                    </span>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
