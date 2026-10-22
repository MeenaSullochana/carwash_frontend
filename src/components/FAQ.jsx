import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, MessageCircleQuestion, Phone, Plus } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import SectionCta from './ui/SectionCta'
import Reveal, { easePremium } from './ui/Reveal'
import { brand, faqs } from '../data/content'

function FaqItem({ faq, index, open, onToggle }) {
  const id = useId()
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: easePremium, delay: index * 0.06 }}
      className={`rounded-[22px] border transition-all duration-500 ${
        open
          ? 'border-accent/50 bg-paper shadow-[0_24px_60px_-30px_rgba(200,16,46,0.4)]'
          : 'border-ink/10 bg-paper/70 hover:border-ink/20'
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-7 sm:py-6"
        >
          <span className={`font-display text-xs tracking-[0.2em] tabular-nums transition-colors ${open ? 'text-accent-deep' : 'text-mist'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">{faq.q}</span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-premium)] ${
              open ? 'rotate-45 bg-accent text-paper' : 'border border-ink/15 text-ink'
            }`}
          >
            <Plus className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pl-[3.25rem] text-[15px] leading-relaxed text-silver sm:px-7 sm:pb-7 sm:pl-[4.6rem]">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function FAQ({ items = faqs, cta }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative scroll-mt-20 overflow-hidden bg-cloud">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-0 size-[520px] rounded-full bg-accent/[0.12] blur-[120px]" />
      <div className="container-lux relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="faq-title"
              size="md"
              eyebrow="FAQ"
              title={['Questions?', 'We have answers.']}
              subtitle="Everything you need to know before your car's first visit to Geekay Klean Kare."
            />

            <Reveal delay={0.2} className="relative mt-10 overflow-hidden rounded-[26px] border border-accent/20 bg-graphite p-7 text-white sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-accent/30 blur-3xl" />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-accent text-paper">
                <MessageCircleQuestion className="size-6" aria-hidden="true" />
              </span>
              <p className="relative mt-6 font-display text-xl font-semibold text-white">Still have questions?</p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                Our concierge team replies within minutes, 9 AM – 9 PM, every day.
              </p>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={brand.phoneHref}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 font-display text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white hover:text-black"
                >
                  <Phone className="size-4" aria-hidden="true" /> Call us
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-5 font-display text-xs font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-white/10"
                >
                  <Mail className="size-4" aria-hidden="true" /> Email us
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="space-y-3 sm:space-y-4 lg:col-span-7">
          {items.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
        {cta && (
          <SectionCta href={cta.href} className="lg:col-span-12">
            {cta.label}
          </SectionCta>
        )}
      </div>
    </section>
  )
}
