import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import SectionCta from './ui/SectionCta'
import { easePremium } from './ui/Reveal'
import { galleryCategories, galleryItems } from '../data/content'

function GalleryTile({ item, onOpen }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: easePremium }}
      className={`group relative overflow-hidden rounded-[22px] border border-ink/10 bg-graphite shadow-[0_24px_60px_-35px_rgba(0,0,0,0.45)] ${item.span}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title}`}
        className="absolute inset-0 size-full cursor-zoom-in text-left"
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent to-70% opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(239,43,53,0.35),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-display text-[10px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md">
          {item.category}
        </span>
        <span className="absolute top-4 right-4 grid size-10 scale-75 place-items-center rounded-full bg-accent text-paper opacity-0 transition-all duration-500 ease-[var(--ease-premium)] group-hover:scale-100 group-hover:opacity-100">
          <Expand className="size-4" aria-hidden="true" />
        </span>

        <span className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-y-0 sm:p-6">
          <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#ff5a63] uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">{item.service}</span>
          <span className="mt-1 block font-display text-lg font-semibold tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.75)] sm:text-xl">{item.title}</span>
        </span>
      </button>
    </motion.li>
  )
}

function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onStep(1)
      else if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onStep])

  const navBtn =
    'grid size-12 place-items-center rounded-full border border-ink/10 bg-paper/90 text-ink shadow-lg backdrop-blur-md transition-colors hover:bg-accent'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex flex-col bg-paper/85 p-4 backdrop-blur-2xl sm:p-8"
      onClick={onClose}
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-sm tracking-[0.2em] text-mist tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button type="button" onClick={onClose} aria-label="Close gallery" className={navBtn}>
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-6" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: easePremium }}
            className="flex max-h-full flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[70vh] w-auto max-w-full rounded-[22px] object-contain shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
            />
            <figcaption className="mt-5 text-center">
              <span className="block text-[11px] font-semibold tracking-[0.22em] text-accent-deep uppercase">{item.service}</span>
              <span className="mt-1 block font-display text-xl font-semibold text-ink">{item.title}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button type="button" onClick={() => onStep(-1)} aria-label="Previous image" className={`${navBtn} absolute left-0 top-1/2 -translate-y-1/2`}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => onStep(1)} aria-label="Next image" className={`${navBtn} absolute right-0 top-1/2 -translate-y-1/2`}>
          <ChevronRight className="size-5" />
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery({ cta = { href: '/#booking', label: 'Book your detail' } }) {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const items = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  )

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (dir) => setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y relative scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute top-1/4 right-0 -z-10 h-[500px] w-[700px] rounded-full bg-accent/[0.1] blur-[120px]" />
      <div className="container-lux">
        <SectionHeading
          id="gallery-title"
          align="center"
          eyebrow="Our gallery"
          title={['Every detail.', 'Picture perfect.']}
          subtitle="A glimpse of the cars that left our studio looking better than new."
        />

        <div role="tablist" aria-label="Filter gallery" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 lg:mt-12">
          {galleryCategories.map((cat) => {
            const active = cat === filter
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 font-display text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                  active ? 'text-paper' : 'border border-ink/10 bg-paper text-silver hover:border-ink/25 hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-pill"
                    transition={{ duration: 0.45, ease: easePremium }}
                    className="absolute inset-0 rounded-full bg-ink shadow-[0_10px_30px_-10px_rgba(200,16,46,0.6)]"
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            )
          })}
        </div>

        <motion.ul
          layout
          className="mt-8 grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[230px] md:grid-cols-4 md:gap-5 lg:auto-rows-[260px]"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <GalleryTile key={item.id} item={item} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.ul>
        {cta && <SectionCta href={cta.href}>{cta.label}</SectionCta>}
      </div>

      <AnimatePresence>
        {openIndex !== null && <Lightbox items={items} index={openIndex} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  )
}
