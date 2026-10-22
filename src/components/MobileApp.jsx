import { motion } from 'framer-motion'
import { Bell, CalendarCheck, Car, CheckCircle2, Droplets, MapPin, Sparkles, Star, Gift } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { easePremium, fadeUp, stagger } from './ui/Reveal'
import { brand } from '../data/content'

const appFeatures = [
  { icon: CalendarCheck, title: 'Book in 30 seconds', description: 'Pick a service, slot and car — done.' },
  { icon: MapPin, title: 'Live wash tracking', description: 'Watch every stage of your car spa in real time.' },
  { icon: Gift, title: 'Members-only rewards', description: 'Earn points on every visit and unlock free washes.' },
  { icon: Bell, title: 'Smart reminders', description: 'Never miss a ceramic top-up or interior refresh.' },
]

function AppleLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.98-.76.86-2.01 1.52-3.03 1.44-.13-1.1.42-2.25 1.1-2.98.76-.84 2.1-1.47 3.05-1.44zM20.5 17.27c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.38 3.5-4.11 3.51-1.53.02-1.93-1-4.01-.99-2.08.01-2.52 1-4.05.99-1.73-.02-3.05-1.77-4.04-3.33C.01 16.06-.28 11 1.47 8.32c1.24-1.9 3.2-3.02 5.04-3.02 1.88 0 3.06 1.03 4.61 1.03 1.51 0 2.43-1.03 4.6-1.03 1.64 0 3.38.9 4.62 2.44-4.06 2.22-3.4 8.02.16 9.53z" />
    </svg>
  )
}

function PlayLogo(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#34d399" d="M3.6 1.8 13.7 12 3.6 22.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2z" />
      <path fill="#facc15" d="m17.1 8.6-3.4 3.4 3.4 3.4 3.8-2.2c1.1-.6 1.1-1.8 0-2.4l-3.8-2.2z" />
      <path fill="#22e57a" d="M3.6 1.8c.3-.2.8-.2 1.3.1l12.2 6.7-3.4 3.4L3.6 1.8z" />
      <path fill="#f43f5e" d="M13.7 12l3.4 3.4-12.2 6.7c-.5.3-1 .3-1.3.1L13.7 12z" />
    </svg>
  )
}

function StoreButton({ href, logo: Logo, top, bottom }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-ink/15 bg-ink/[0.04] px-5 py-3 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-500 hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_20px_50px_-20px_rgba(239,43,53,0.55)]"
    >
      <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[450%]" />
      <Logo className="relative size-7 shrink-0 text-ink" />
      <span className="relative text-left leading-tight">
        <span className="block text-[10px] tracking-[0.18em] text-mist uppercase">{top}</span>
        <span className="block font-display text-lg font-semibold text-ink">{bottom}</span>
      </span>
    </motion.a>
  )
}

function PhoneMockup() {
  const stages = [
    { label: 'Foam wash', done: true },
    { label: 'Clay & polish', done: true },
    { label: 'Ceramic coat', done: false },
  ]

  return (
    <div className="relative mx-auto w-[260px] sm:w-[290px]">
      <div className="relative rounded-[46px] border border-ink/15 bg-gradient-to-b from-graphite to-paper p-3 shadow-[0_50px_120px_-40px_rgba(239,43,53,0.45),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="relative overflow-hidden rounded-[36px] bg-paper">
          <div className="absolute top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative bg-gradient-to-br from-accent-deep/40 via-cloud to-paper px-5 pt-12 pb-6">
            <div aria-hidden="true" className="absolute -top-10 -right-10 size-40 rounded-full bg-accent/30 blur-3xl" />
            <p className="relative text-[11px] text-mist">Good evening,</p>
            <p className="relative font-display text-lg font-semibold text-ink">Arjun 👋</p>

            <div className="relative mt-5 rounded-2xl border border-ink/10 bg-paper/60 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-mist uppercase">In progress</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-accent">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent" /> Live
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Car className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">BMW M4 · Signature Spa</p>
                  <p className="text-[11px] text-mist">Ready in ~25 min</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '68%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: easePremium, delay: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 px-5 py-5">
            {stages.map(({ label, done }) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-ink/5 bg-cloud px-3.5 py-2.5">
                <span className="flex items-center gap-2.5 text-xs text-silver">
                  {done ? (
                    <CheckCircle2 className="size-4 text-accent" />
                  ) : (
                    <Droplets className="size-4 animate-pulse text-mist" />
                  )}
                  {label}
                </span>
                <span className={`text-[10px] ${done ? 'text-accent' : 'text-mist'}`}>{done ? 'Done' : 'Now'}</span>
              </div>
            ))}
            <div className="mt-4 rounded-xl bg-gradient-to-r from-accent-deep to-accent py-3 text-center font-display text-xs font-semibold tracking-[0.15em] text-paper uppercase">
              Book next wash
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: easePremium, delay: 0.6 }}
        className="absolute top-16 -right-6 sm:-right-24"
      >
        <div className="glass flex animate-float-slow items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-ink">Your car is shining!</p>
            <p className="text-[10px] text-mist">Ready for pickup</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: easePremium, delay: 0.8 }}
        className="absolute bottom-24 -left-6 sm:-left-24"
      >
        <div className="glass animate-float-slow rounded-2xl px-4 py-3 [animation-delay:1.5s]">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
          <p className="mt-1 text-xs font-semibold text-ink">4.9 App rating</p>
          <p className="text-[10px] text-mist">50K+ downloads</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function MobileApp() {
  return (
    <section id="app" aria-labelledby="app-title" className="section-y relative scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute top-1/2 right-[10%] size-[520px] -translate-y-1/2 animate-pulse-glow rounded-full bg-accent/15 blur-[140px]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px hairline" />

      <div className="container-lux relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            id="app-title"
            eyebrow="Now on Android & iOS"
            title={['Your car spa,', 'in your pocket.']}
            subtitle="Download the Geekay Klean Kare app to book premium detailing, track your car live and unlock exclusive member rewards — anytime, anywhere."
          />

          <motion.ul
            variants={stagger(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {appFeatures.map(({ icon: Icon, title, description }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group flex gap-4 rounded-2xl border border-ink/10 bg-gradient-to-b from-cloud to-paper p-4 transition-colors duration-500 hover:border-accent/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-ink/[0.04] text-ink transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-ink">{title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-mist">{description}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <StoreButton href={brand.appStoreHref} logo={AppleLogo} top="Download on the" bottom="App Store" />
            <StoreButton href={brand.playStoreHref} logo={PlayLogo} top="Get it on" bottom="Google Play" />
          </motion.div>

          <p className="mt-6 flex items-center gap-2 text-xs text-mist">
            <Gift className="size-4 text-accent-deep" aria-hidden="true" />
            Use code <span className="font-semibold text-ink">APP20</span> for 20% off your first in-app booking.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.1, ease: easePremium }}
          className="relative py-6"
        >
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 sm:size-[440px]" />
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/5 sm:size-[560px]" />
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  )
}
