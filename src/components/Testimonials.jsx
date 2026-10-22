import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import SectionCta from './ui/SectionCta'
import { easePremium } from './ui/Reveal'
import { testimonials } from '../data/content'

function TestimonialCard({ t, index }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: easePremium, delay: index * 0.12 }}
      className="glass group relative flex w-[86%] max-w-[380px] shrink-0 snap-center flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 sm:p-8 md:w-auto md:max-w-none"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
      <div className="flex items-center justify-between">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-accent text-accent-deep" aria-hidden="true" />
          ))}
        </div>
        <Quote className="size-8 text-ink/10" aria-hidden="true" />
      </div>
      <blockquote className="mt-6 flex-1 font-display text-lg leading-snug text-ink sm:text-xl">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent/5 font-display text-sm font-semibold text-accent-deep">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block font-medium text-ink">— {t.name}</span>
          <span className="block text-xs text-mist">
            {t.car} · {t.service}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

export default function Testimonials({ cta }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const onScroll = () => {
      const cards = Array.from(track.children)
      const center = track.scrollLeft + track.clientWidth / 2
      let closest = 0
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        if (Math.abs(cardCenter - center) < Math.abs(cards[closest].offsetLeft + cards[closest].offsetWidth / 2 - center)) {
          closest = i
        }
      })
      setActive(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (i) => {
    const card = trackRef.current?.children[i]
    if (card) trackRef.current.scrollTo({ left: card.offsetLeft - (trackRef.current.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y relative scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
      <div className="container-lux">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reviews-title" eyebrow="Client stories" title={['Loved by people', 'who love cars.']} />
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-semibold text-ink">4.9</span>
            <span className="text-sm text-mist">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-accent text-accent-deep" />
                ))}
              </span>
              <span className="mt-1 block">from 1,200+ verified reviews</span>
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:mt-16"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1}`}
              aria-current={active === i}
              className="grid h-6 place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-accent' : 'w-1.5 bg-ink/25'}`} />
            </button>
          ))}
        </div>
        {cta && <SectionCta href={cta.href}>{cta.label}</SectionCta>}
      </div>
    </section>
  )
}
