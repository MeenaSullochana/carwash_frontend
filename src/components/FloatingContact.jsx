import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CarFront, Mail, MessageCircle, Phone, X } from 'lucide-react'
import { easePremium } from './ui/Reveal'
import { brand } from '../data/content'

const actions = [
  { label: 'WhatsApp', icon: MessageCircle, href: brand.whatsappHref, external: true, className: 'bg-[#25D366] text-white' },
  { label: 'Call', icon: Phone, href: brand.phoneHref, className: 'bg-ink text-paper' },
  { label: 'Email', icon: Mail, href: `mailto:${brand.email}`, className: 'bg-paper text-ink border border-ink/10' },
]

/** Floating car button (bottom-right) that expands into WhatsApp / Call / Email shortcuts. */
export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="fixed right-4 bottom-24 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            id="floating-contact-menu"
            className="flex flex-col items-end gap-3"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              show: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
            }}
          >
            {actions.map(({ label, icon: Icon, href, external, className }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.3, ease: easePremium }}
              >
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3"
                >
                  <span className="rounded-full bg-paper/90 px-3 py-1.5 text-sm font-semibold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur">
                    {label}
                  </span>
                  <span
                    className={`grid size-12 place-items-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-110 ${className}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="floating-contact-menu"
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className="relative grid size-14 place-items-center rounded-full bg-accent text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] transition-[transform,background-color,color] hover:scale-105 hover:bg-white hover:text-black active:scale-95"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" aria-hidden="true" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'car'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <CarFront className="size-6" aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
