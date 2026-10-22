import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Logo from './ui/Logo'
import { brand, footerLinks } from '../data/content'

const socials = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
]

function LinkColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-xs font-semibold tracking-[0.28em] text-ink uppercase">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="group inline-flex items-center gap-2 text-[15px] text-mist transition-colors hover:text-ink">
              <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-cloud pt-20 pb-28 sm:pb-10">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[100px]" />
      <div className="container-lux relative">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-mist">{brand.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-ink/10 text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-accent-deep"
                  >
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <LinkColumn title="Services" links={footerLinks.services} />
          </div>
          <div className="min-w-0 lg:col-span-2">
            <LinkColumn title="Company" links={footerLinks.company} />
          </div>

          <div className="col-span-2 min-w-0 lg:col-span-3">
            <h3 className="font-display text-xs font-semibold tracking-[0.28em] text-ink uppercase">Contact</h3>
            <address className="mt-6 space-y-4 not-italic">
              <a href={brand.phoneHref} className="flex items-center gap-3 text-[15px] text-mist transition-colors hover:text-ink">
                <Phone className="size-4 shrink-0 text-accent-deep" aria-hidden="true" /> {brand.phone}
              </a>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-[15px] text-mist transition-colors hover:text-ink">
                <Mail className="size-4 shrink-0 text-accent-deep" aria-hidden="true" />
                <span className="break-all">{brand.email}</span>
              </a>
              <p className="flex items-start gap-3 text-[15px] text-mist">
                <MapPin className="mt-1 size-4 shrink-0 text-accent-deep" aria-hidden="true" />
                {brand.address}
              </p>
            </address>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 bg-gradient-to-b from-ink/[0.08] to-transparent bg-clip-text text-center font-display text-[clamp(3rem,15vw,13rem)] leading-none font-bold tracking-[-0.04em] text-transparent select-none"
        >
          GEEKAY
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ink/5 pt-8 text-sm text-mist sm:flex-row">
          <p>© 2026 Geekay Klean Kare. All Rights Reserved.</p>
          <p className="text-xs tracking-[0.2em] uppercase">Crafted for the obsessed</p>
        </div>
      </div>
    </footer>
  )
}
