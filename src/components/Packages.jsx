import { motion } from 'framer-motion'
import { Check, Crown } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'
import SectionCta from './ui/SectionCta'
import { easePremium } from './ui/Reveal'
import { packages } from '../data/content'

function PackageCard({ pkg, index }) {
  const featured = pkg.featured
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: easePremium, delay: index * 0.12 }}
      className={`group relative ${featured ? 'lg:-my-6' : ''}`}
    >
      <div
        className={`relative h-full rounded-[28px] p-px transition-all duration-500 ease-[var(--ease-premium)] group-hover:-translate-y-2 ${
          featured
            ? 'bg-gradient-to-b from-accent via-accent/30 to-ink/10 shadow-[0_40px_120px_-40px_rgba(239,43,53,0.55)]'
            : 'bg-gradient-to-b from-ink/15 to-ink/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] group-hover:from-accent/60'
        }`}
      >
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[27px] p-7 sm:p-9 ${
            featured ? 'bg-[linear-gradient(180deg,#0f2a1c_0%,#07110c_55%)]' : 'bg-paper'
          }`}
        >
          {featured && (
            <>
              <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/25 blur-[90px]" />
              <span className="absolute top-7 right-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] text-ink uppercase sm:top-9 sm:right-9">
                <Crown className="size-3" aria-hidden="true" /> Most Popular
              </span>
            </>
          )}
          <div aria-hidden="true" className="grain" />

          <p className="relative font-display text-[11px] font-medium tracking-[0.3em] text-mist uppercase">{pkg.label}</p>
          <h3 className="relative mt-3 font-display text-3xl font-semibold tracking-[0.06em] uppercase">{pkg.name}</h3>
          <p className="relative mt-1 text-sm text-mist">{pkg.note}</p>

          <p className="relative mt-8 flex items-end gap-2">
            <span className={`font-display text-5xl font-semibold tracking-tight sm:text-6xl ${featured ? 'text-accent-metal' : 'text-ink'}`}>
              {pkg.price}
            </span>
            <span className="mb-2 text-sm text-mist">/ visit</span>
          </p>

          <div className="hairline relative my-8 h-px" />

          <ul className="relative flex-1 space-y-4">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[15px] text-silver">
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                    featured ? 'bg-accent text-paper' : 'border border-ink/20 text-ink'
                  }`}
                >
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Button href={`/?service=${encodeURIComponent(`${pkg.name} Package`)}#booking`} variant={featured ? 'header' : 'ghost'} size="lg" className="relative mt-10 w-full">
            Choose Package
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Packages({ cta }) {
  return (
    <section id="packages" aria-labelledby="packages-title" className="section-y relative scroll-mt-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_60%_40%_at_50%_45%,rgba(239,43,53,0.07),transparent_70%)]" />
      <div className="container-lux">
        <SectionHeading
          id="packages-title"
          align="center"
          eyebrow="Curated packages"
          title={['Choose your', 'level of luxury.']}
          subtitle="Transparent pricing, meticulous execution. Every package includes a complimentary hand finish and inspection."
        />
        <div className="mx-auto mt-14 grid max-w-md gap-6 lg:mt-20 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
        {cta && <SectionCta href={cta.href}>{cta.label}</SectionCta>}
      </div>
    </section>
  )
}
