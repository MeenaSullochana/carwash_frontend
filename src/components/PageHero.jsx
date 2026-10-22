import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { fadeUp, stagger } from './ui/Reveal'

/** Inner-page header. `title` is an array of lines; the last line gets the metallic treatment. */
export default function PageHero({ id, eyebrow, title, subtitle, children }) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="grain" />
      </div>
      <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="container-lux relative max-w-4xl text-center">
        <motion.nav variants={fadeUp} aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-mist uppercase">
            <li>
              <a href="/#home" className="transition-colors hover:text-ink">
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-accent-deep">
              {eyebrow}
            </li>
          </ol>
        </motion.nav>
        <motion.h1 variants={fadeUp} id={id} className="heading-xl mt-6">
          {title.map((line, i) => (
            <span key={line} className={`block ${i === title.length - 1 ? 'text-metal' : ''}`}>
              {line}
            </span>
          ))}
        </motion.h1>
        {subtitle && (
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeUp} className="mt-9">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
