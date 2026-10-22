import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Menu, Phone, Sparkles, X } from 'lucide-react'
import Logo from './ui/Logo'
import Button from './ui/Button'
import { easePremium } from './ui/Reveal'
import { brand, navLinks, services as designServices } from '../data/content'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

function rupee(price) {
  if (typeof price === 'string' && price.includes('₹')) return price
  return `₹${Number(price || 0).toLocaleString('en-IN')}`
}

export default function Navbar() {
  const { user, openAuth, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [services, setServices] = useState(designServices)

  useEffect(() => {
    api('/api/services')
      .then((data) => {
        const list = (data.services || [])
          .filter((service) => service.category !== 'package' && service.isActive !== false)
          .map((service) => ({
            id: service._id,
            title: service.title,
            price: rupee(service.price),
          }))
        if (list.length) setServices(list)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const close = () => mql.matches && setOpen(false)
    mql.addEventListener('change', close)
    return () => mql.removeEventListener('change', close)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: easePremium, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-premium)] ${
            scrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="overflow-hidden">
            <div className="group/bar relative overflow-hidden border-b border-ink/10 bg-transparent text-ink [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
              <ul
                aria-label="Our services"
                className="flex w-max animate-marquee py-2 [animation-duration:35s] group-hover/bar:[animation-play-state:paused] motion-reduce:animate-none"
              >
                {[...services, ...services].map((service, i) => (
                  <li key={`${service.id}-${i}`} aria-hidden={i >= services.length || undefined} className="shrink-0">
                    <a
                      href="/services"
                      tabIndex={i >= services.length ? -1 : undefined}
                      className="flex items-center gap-2 px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-silver/80 transition-colors hover:text-ink"
                    >
                      <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
                      {service.title}
                      <span className="text-accent">from {service.price}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-2xl border px-4 transition-all duration-500 ease-[var(--ease-premium)] sm:px-6 lg:h-[72px] ${
            scrolled
              ? 'border-ink/10 bg-paper/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.16)] backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={(link.href.split('#')[0] || '/') === window.location.pathname.replace(/(.)\/+$/, '$1') ? 'page' : undefined}
                  className="group relative px-3 py-2 text-[13px] font-medium tracking-wide text-silver/80 transition-colors hover:text-ink aria-[current=page]:text-ink xl:px-4"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-0.5 xl:inset-x-4 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={brand.phoneHref}
              className="hidden items-center gap-2 text-[13px] text-silver/80 transition-colors hover:text-ink xl:flex"
            >
              <Phone className="size-4 text-accent-deep" aria-hidden="true" />
              {brand.phone}
            </a>
            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <a href="/account" className="text-[13px] text-silver/80 hover:text-ink">
                  My account
                </a>
                <button type="button" onClick={logout} className="text-[13px] text-mist hover:text-ink">
                  Logout
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => openAuth('login')} className="hidden text-[13px] text-silver/80 hover:text-ink sm:inline">
                Login
              </button>
            )}
            <a href="/admin/login" className="hidden text-[13px] text-mist hover:text-ink lg:inline">
              Staff
            </a>
            <div className="hidden sm:block">
              <Button href="/#booking" variant="header" size="sm">
                Book Now
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink backdrop-blur-md transition-colors hover:bg-ink/10 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              variants={{ open: { x: 0 }, closed: { x: '100%' } }}
              transition={{ duration: 0.5, ease: easePremium }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-l border-ink/10 bg-paper/95 p-6 backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -top-32 -right-24 size-80 rounded-full bg-accent/15 blur-3xl" />
              </div>
              <div className="relative flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <motion.ul
                className="relative mt-12 flex flex-col"
                variants={{ open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } }, closed: {} }}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: 24 } }}
                    transition={{ duration: 0.45, ease: easePremium }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-ink/5 py-4 font-display text-2xl font-medium text-ink"
                    >
                      <span className="text-xs text-mist">0{i + 1}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-deep">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
                transition={{ duration: 0.5, ease: easePremium, delay: 0.35 }}
                className="relative mt-auto space-y-5 pt-10"
              >
                <Button href="/#booking" variant="accent" size="lg" className="w-full" onClick={() => setOpen(false)}>
                  Book Now
                </Button>
                <div className="flex flex-col gap-2.5 text-sm text-mist">
                  {user ? (
                    <>
                      <a href="/account" onClick={() => setOpen(false)} className="hover:text-ink">
                        My account
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          setOpen(false)
                        }}
                        className="text-left hover:text-ink"
                      >
                        Logout ({user.name})
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        openAuth('login')
                      }}
                      className="text-left hover:text-ink"
                    >
                      Login
                    </button>
                  )}
                  <a href="/admin/login" onClick={() => setOpen(false)} className="hover:text-ink">
                    Staff login
                  </a>
                  <a href={brand.phoneHref} className="flex items-center gap-3 transition-colors hover:text-ink">
                    <Phone className="size-4 shrink-0 text-accent-deep" aria-hidden="true" />
                    {brand.phone}
                  </a>
                  <a href={`mailto:${brand.email}`} className="flex items-center gap-3 transition-colors hover:text-ink">
                    <Mail className="size-4 shrink-0 text-accent-deep" aria-hidden="true" />
                    {brand.email}
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
