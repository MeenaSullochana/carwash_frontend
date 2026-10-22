import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { easePremium } from './ui/Reveal'
import { benefits } from '../data/content'

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="section-y relative">
      <div className="container-lux grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="why-title"
              eyebrow="Why Geekay"
              title={['A spotless', 'wash, every', 'single visit.']}
              subtitle="From a quick exterior foam wash to a full inside-and-out clean, we wash your car the safe way — gentle on paint, tough on dirt, and done on time."
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className={i % 2 === 1 ? 'sm:translate-y-10' : ''}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: easePremium, delay: (i % 2) * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative h-full overflow-hidden rounded-[24px] border border-ink/10 bg-gradient-to-b from-cloud to-paper p-7 transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(200,16,46,0.35)] sm:p-8"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/15" />
              <div className="relative grid size-14 place-items-center rounded-2xl border border-ink/10 bg-ink/[0.04] text-ink transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent-deep">
                <Icon
                  className="size-6 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110 group-hover:-rotate-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
              <h3 className="relative mt-8 font-display text-xl font-semibold tracking-tight">{title}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-mist">{description}</p>
              <span className="relative mt-6 block font-display text-xs tracking-[0.3em] text-ink/25">0{i + 1}</span>
            </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
