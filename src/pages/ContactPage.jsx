import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Tag,
  User,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal, { easePremium, fadeUp, stagger } from '../components/ui/Reveal'
import { Field, Select, textInput } from '../components/BookingCard'
import FAQ from '../components/FAQ'
import { brand, businessHours, contactTopics } from '../data/content'

const channels = [
  { icon: Phone, label: 'Call concierge', value: brand.phone, href: brand.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: brand.whatsappHref, external: true },
  { icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
  { icon: MapPin, label: 'Visit studio', value: brand.address, href: brand.mapLink, external: true },
]

const emptyForm = { name: '', phone: '', email: '', topic: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [sentName, setSentName] = useState('')
  const update = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (status === 'sent') setStatus('idle')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    window.setTimeout(() => {
      setSentName(form.name.split(' ')[0])
      setForm(emptyForm)
      setStatus('sent')
    }, 900)
  }

  return (
    <div className="relative rounded-[28px] bg-gradient-to-b from-accent/50 via-ink/10 to-ink/5 p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,0.3)]">
      <div className="relative rounded-[27px] bg-paper/90 p-5 backdrop-blur-2xl sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[27px]">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="grain" />
        </div>

        <div className="relative">
          <p className="eyebrow">Send a message</p>
          <h2 id="contact-form-title" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-[28px]">
            We reply within 30 minutes
          </h2>

          <form onSubmit={onSubmit} aria-labelledby="contact-form-title" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full Name" icon={User}>
              {(id) => (
                <input
                  id={id}
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update('name')(e.target.value)}
                  className={textInput}
                />
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
            <Field label="Topic" icon={Tag}>
              {(id) => <Select id={id} value={form.topic} onChange={update('topic')} placeholder="Select Topic" options={contactTopics} />}
            </Field>
            <Field label="Message" icon={MessageSquare} className="sm:col-span-2" shellClassName="items-start py-4 [&>svg]:mt-0.5">
              {(id) => (
                <textarea
                  id={id}
                  required
                  rows={5}
                  placeholder="Tell us about your car and what you need…"
                  value={form.message}
                  onChange={(e) => update('message')(e.target.value)}
                  className={`${textInput} resize-none leading-relaxed`}
                />
              )}
            </Field>
            <Button
              type="submit"
              variant="accent"
              size="lg"
              icon={status !== 'sending'}
              disabled={status === 'sending'}
              className="w-full sm:col-span-2 sm:w-auto sm:justify-self-end"
            >
              {status === 'sending' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>

          <AnimatePresence>
            {status === 'sent' && (
              <motion.p
                role="status"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: easePremium }}
                className="flex items-center gap-2 overflow-hidden pt-5 text-sm text-silver"
              >
                <CheckCircle2 className="size-4 shrink-0 text-accent-deep" aria-hidden="true" />
                Thanks{sentName ? `, ${sentName}` : ''}! Your message is with our concierge — we&apos;ll get back to you shortly.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  useEffect(() => {
    const previous = document.title
    document.title = 'Contact Us — Geekay Klean Kare'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <>
      <section aria-labelledby="contact-title" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
          <div className="grain" />
        </div>
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="container-lux relative max-w-4xl text-center">
          <motion.p variants={fadeUp} className="eyebrow justify-center">
            Contact us
          </motion.p>
          <motion.h1 variants={fadeUp} id="contact-title" className="heading-xl mt-5">
            <span className="block">Let&apos;s talk about</span>
            <span className="block text-metal">your car.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Questions about a service, a custom quote or doorstep pickup? Reach our concierge any way you like.
          </motion.p>
        </motion.div>
      </section>

      <section aria-label="Ways to reach us" className="relative pb-20 sm:pb-28">
        <div className="container-lux grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-4 lg:col-span-5">
            {channels.map(({ icon: Icon, label, value, href, external }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="group flex items-center gap-5 rounded-3xl border border-ink/10 bg-paper/70 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_20px_60px_-25px_rgba(239,43,53,0.45)]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium tracking-[0.2em] text-mist uppercase">{label}</span>
                    <span className="mt-1 block text-[15px] font-medium text-ink">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24} className="rounded-3xl border border-ink/10 bg-cloud p-6">
              <h2 className="flex items-center gap-3 font-display text-xs font-semibold tracking-[0.28em] text-ink uppercase">
                <Clock className="size-4 text-accent-deep" aria-hidden="true" /> Studio hours
              </h2>
              <dl className="mt-5 space-y-3">
                {businessHours.map(({ days, time }) => (
                  <div key={days} className="flex items-center justify-between gap-4 border-b border-ink/5 pb-3 text-[15px] last:border-0 last:pb-0">
                    <dt className="text-mist">{days}</dt>
                    <dd className="font-medium text-ink">{time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section aria-label="Studio location" className="px-3 pb-8 sm:px-5">
        <Reveal className="mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-ink/10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.4)]">
          <iframe
            title="Map showing Geekay Klean Kare studio in Sriperumbudur"
            src={brand.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[360px] w-full grayscale-[0.4] sm:h-[440px]"
          />
        </Reveal>
      </section>

      <FAQ cta={{ href: '/faq', label: 'View all FAQs' }} />
    </>
  )
}
