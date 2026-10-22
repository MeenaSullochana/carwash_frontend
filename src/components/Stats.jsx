import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp } from './ui/Reveal'
import { stats } from '../data/content'

function Counter({ value, decimals = 0, separator = false, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useReducedMotion()

  const format = (n) =>
    separator
      ? Math.round(n).toLocaleString('en-IN')
      : n.toFixed(decimals)

  useEffect(() => {
    if (!inView || !ref.current) return undefined
    if (reduced) {
      ref.current.textContent = format(value)
      return undefined
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value])

  return (
    <span className="tabular-nums">
      <span ref={ref}>{format(0)}</span>
      <span className="text-accent-deep">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Geekay Klean Kare in numbers" className="relative pt-16 sm:pt-20">
      <div className="container-lux">
        <motion.dl
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className={`relative flex flex-col items-center text-center lg:items-start lg:px-10 lg:text-left ${
                i > 0 ? 'lg:border-l lg:border-ink/10' : 'lg:pl-0'
              } ${i % 2 === 1 ? 'max-lg:border-l max-lg:border-ink/10' : ''}`}
            >
              <dt className="order-2 mt-2 text-[11px] font-medium tracking-[0.24em] text-mist uppercase sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                <Counter {...stat} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
        <div className="hairline mt-16 h-px sm:mt-20" />
      </div>
    </section>
  )
}
