import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Phone } from 'lucide-react'
import { easePremium } from './ui/Reveal'
import { brand } from '../data/content'

/** Sticky bottom CTA on small screens; appears after the hero, hides near the booking card & footer CTA. */
export default function MobileBookingBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 900
      setVisible(pastHero && !nearEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: easePremium }}
          className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl border border-ink/10 bg-paper/80 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl sm:hidden"
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          <a
            href={brand.phoneHref}
            aria-label={`Call ${brand.phone}`}
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink"
          >
            <Phone className="size-5 text-accent-deep" aria-hidden="true" />
          </a>
          <a
            href="/#booking"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent font-display text-sm font-bold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white hover:text-black active:scale-[0.98]"
          >
            <CalendarCheck className="size-4" aria-hidden="true" /> Book Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
