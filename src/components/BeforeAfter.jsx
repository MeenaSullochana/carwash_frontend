import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { Check, ChevronsLeftRight } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { images } from '../assets/images'

const highlights = ['Swirl & scratch removal', 'Deep gloss restoration', 'Decontaminated, sealed paint']

export default function BeforeAfter() {
  const frameRef = useRef(null)
  const dragging = useRef(false)
  const position = useMotionValue(50)
  const [value, setValue] = useState(50)
  const inView = useInView(frameRef, { once: true, margin: '0px 0px -25% 0px' })
  const reduced = useReducedMotion()

  const beforeClip = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`)
  const handleLeft = useTransform(position, (p) => `${p}%`)

  useEffect(() => position.on('change', (v) => setValue(Math.round(v))), [position])

  useEffect(() => {
    if (!inView || reduced) return undefined
    const controls = animate(position, [50, 28, 70, 50], { duration: 2.4, ease: 'easeInOut', delay: 0.3 })
    return () => controls.stop()
  }, [inView, reduced, position])

  const setFromClientX = useCallback(
    (clientX) => {
      const rect = frameRef.current.getBoundingClientRect()
      const pct = ((clientX - rect.left) / rect.width) * 100
      position.stop()
      position.set(Math.min(100, Math.max(0, pct)))
    },
    [position],
  )

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e) => dragging.current && setFromClientX(e.clientX)
  const onPointerUp = () => {
    dragging.current = false
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') position.set(Math.max(0, position.get() - step))
    else if (e.key === 'ArrowRight') position.set(Math.min(100, position.get() + step))
    else if (e.key === 'Home') position.set(0)
    else if (e.key === 'End') position.set(100)
    else return
    e.preventDefault()
  }

  return (
    <section id="about" aria-labelledby="ba-title" className="section-y relative scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute top-1/3 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[120px]" />
      <div className="container-lux grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 xl:col-span-4">
          <SectionHeading
            id="ba-title"
            size="md"
            eyebrow="The Geekay effect"
            title={['See the', 'difference.']}
            subtitle="Professional detailing doesn't just clean your car. It transforms how it looks and feels."
          />
          <Reveal as="ul" delay={0.2} className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-silver sm:text-base">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                  <Check className="size-3.5 text-accent-deep" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 xl:col-span-8">
          <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative aspect-[4/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-[28px] border border-ink/10 bg-graphite shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] select-none sm:aspect-[16/11] lg:aspect-[16/10]"
          >
            <img
              src={images.carDetailing}
              alt="After detailing: deep, mirror-like gloss on a red car's front end"
              loading="lazy"
              decoding="async"
              draggable="false"
              className="absolute inset-0 size-full object-cover object-[50%_45%]"
            />

            <motion.div style={{ clipPath: beforeClip }} className="absolute inset-0">
              <img
                src={images.carDetailing}
                alt="Before detailing: dull, dusty and faded paint on the same car"
                loading="lazy"
                decoding="async"
                draggable="false"
                className="absolute inset-0 size-full object-cover object-[50%_45%] [filter:saturate(0.35)_brightness(0.62)_contrast(0.78)_sepia(0.35)_blur(0.6px)]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(120,96,70,0.45),transparent_45%),radial-gradient(circle_at_75%_30%,rgba(110,90,70,0.35),transparent_40%),radial-gradient(circle_at_55%_85%,rgba(90,75,60,0.5),transparent_45%)] mix-blend-multiply" />
              <div className="grain !opacity-30" />
            </motion.div>

            <span className="pointer-events-none absolute top-5 left-5 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 font-display text-[11px] font-semibold tracking-[0.3em] text-white/90 backdrop-blur-md">
              BEFORE
            </span>
            <span className="pointer-events-none absolute top-5 right-5 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 font-display text-[11px] font-semibold tracking-[0.3em] text-accent backdrop-blur-md">
              AFTER
            </span>

            <motion.div style={{ left: handleLeft }} className="pointer-events-none absolute inset-y-0 -translate-x-1/2">
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper/80 shadow-[0_0_20px_rgba(239,43,53,0.9)]" />
              <div
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                aria-valuetext={`${value}% before`}
                onKeyDown={onKeyDown}
                className="pointer-events-auto absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 hover:scale-110"
              >
                <ChevronsLeftRight className="size-6" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
          <p className="mt-4 text-center text-xs tracking-[0.2em] text-mist uppercase">Drag to compare</p>
        </Reveal>
      </div>
    </section>
  )
}
