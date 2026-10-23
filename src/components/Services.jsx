import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import SectionCta from './ui/SectionCta'
import { easePremium } from './ui/Reveal'
import { services as designServices } from '../data/content'
import { api, mediaUrl } from '../lib/api'

function rupee(price) {
  if (typeof price === 'string' && price.includes('₹')) return price
  return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

function cardImage(service) {
  if (service.image) return mediaUrl(service.image)
  const match = designServices.find((item) => item.title === service.title)
  return match?.image || ''
}

function ServiceCard({ service, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: easePremium, delay: (index % 3) * 0.1 }}
      className="group relative flex w-[82%] max-w-[360px] shrink-0 snap-start sm:w-[60%] md:w-auto md:max-w-none"
    >
      <div className="relative flex min-h-[420px] w-full flex-col overflow-hidden rounded-[26px] border border-ink/10 bg-graphite shadow-[0_24px_60px_-35px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[var(--ease-premium)] group-hover:border-accent/30 group-hover:shadow-[0_30px_80px_-30px_rgba(239,43,53,0.45)] sm:min-h-[460px] md:group-hover:-translate-y-2 xl:min-h-[500px]">
        {service.image ? (
          <img
            src={service.image}
            alt={service.alt || service.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,43,53,0.35),transparent_45%),linear-gradient(160deg,#1a2540,#0a1022)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,43,53,0.35),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-1 flex-col justify-between gap-10 p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <span className="font-display text-sm font-medium tracking-[0.2em] text-white/70">{service.number}</span>
            <a
              href={`/?service=${encodeURIComponent(service.title)}#booking`}
              aria-label={`Book ${service.title}`}
              className="grid size-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-[var(--ease-premium)] group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
            >
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[26px]">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{service.description}</p>
            <div className="mt-6 flex items-end justify-between border-t border-white/15 pt-5">
              <span>
                <span className="block text-[10px] tracking-[0.22em] text-white/60 uppercase">Starting from</span>
                <span className="mt-1 block font-display text-xl font-semibold text-white">{service.price}</span>
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-16" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Services({ cta = { href: '/#booking', label: 'Book a service' } }) {
  const [services, setServices] = useState([])

  useEffect(() => {
    api('/api/services')
      .then((data) => {
        const cards = (data.services || [])
          .filter((service) => service.category !== 'package' && service.isActive !== false)
          .map((service, index) => ({
            id: service._id,
            number: String(index + 1).padStart(2, '0'),
            title: service.title,
            description: service.description,
            price: rupee(service.price),
            image: cardImage(service),
            alt: service.title,
          }))
        setServices(cards)
      })
      .catch(() => {
        setServices(
          designServices.map((service) => ({
            ...service,
            image: service.image,
          })),
        )
      })
  }, [])

  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative scroll-mt-20">
      <div className="container-lux">
        <SectionHeading
          id="services-title"
          align="center"
          eyebrow="Our services"
          title={['Precision detailing.', 'Perfect results.']}
          subtitle="Professional care for every surface, every finish and every drive."
        />

        <div className="no-scrollbar -mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-3 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pt-0 md:pb-0 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        <p className="mt-4 text-center text-xs tracking-[0.2em] text-mist uppercase md:hidden" aria-hidden="true">
          Swipe to explore →
        </p>
        {cta && <SectionCta href={cta.href}>{cta.label}</SectionCta>}
      </div>
    </section>
  )
}
