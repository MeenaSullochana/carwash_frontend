import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { easePremium } from './ui/Reveal'
import { steps } from '../data/content'

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section-y relative overflow-hidden bg-cloud">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-lux">
        <SectionHeading
          id="how-title"
          align="center"
          eyebrow="How it works"
          title={['Four steps to', 'showroom shine.']}
        />

        <div className="relative mt-14 lg:mt-20">
          {/* Connector: horizontal on desktop, vertical on mobile */}
          <div aria-hidden="true" className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-ink/10 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 1.8, ease: easePremium, delay: 0.2 }}
              className="h-full origin-left bg-gradient-to-r from-accent via-accent/70 to-ink/60"
            />
          </div>
          <div aria-hidden="true" className="absolute top-8 bottom-8 left-8 w-px bg-ink/10 lg:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 1.6, ease: easePremium }}
              className="h-full origin-top bg-gradient-to-b from-accent to-ink/40"
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ number, title, description, icon: Icon }, i) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, ease: easePremium, delay: 0.2 + i * 0.18 }}
                className="group relative flex gap-6 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <div className="relative grid size-16 shrink-0 place-items-center rounded-full border border-ink/15 bg-paper text-ink shadow-[0_0_0_8px_#111a30] transition-all duration-500 group-hover:border-accent group-hover:text-accent-deep group-hover:shadow-[0_0_0_8px_#111a30,0_0_40px_rgba(239,43,53,0.35)]">
                  <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-accent font-display text-[10px] font-bold text-ink">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-2 lg:pt-8">
                  <span className="font-display text-xs tracking-[0.3em] text-accent-deep">{number}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-mist lg:mx-auto">{description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
