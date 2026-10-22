import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone } from 'lucide-react'
import Button from './ui/Button'
import { fadeUp, stagger } from './ui/Reveal'
import { images } from '../assets/images'
import { brand } from '../data/content'

export default function FinalCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="contact" ref={ref} aria-labelledby="cta-title" className="relative scroll-mt-20 px-3 py-16 sm:px-5 sm:py-24">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] border border-ink/10 bg-cloud shadow-[0_40px_120px_-50px_rgba(0,0,0,0.4)] sm:rounded-[40px]">
        <motion.img
          src={images.luxuryCar}
          alt="Front of a white Mahindra XUV700 with glowing headlights on a Mumbai street at night"
          loading="lazy"
          decoding="async"
          style={{ y: imageY }}
          className="absolute top-[-12%] right-0 h-[124%] w-full object-cover object-[60%_center] lg:w-[72%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cloud via-cloud/90 to-cloud/40 lg:from-cloud lg:from-30% lg:via-cloud/75 lg:via-55% lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cloud/80 via-transparent to-cloud/40" />
        <div aria-hidden="true" className="absolute -top-1/2 left-1/4 h-[200%] w-40 animate-sweep bg-gradient-to-r from-transparent via-white/40 to-transparent [animation-duration:8s]" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 size-[500px] animate-pulse-glow rounded-full bg-accent/25 blur-[120px]" />
        <div aria-hidden="true" className="grain" />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          className="relative flex min-h-[540px] flex-col justify-center px-6 py-16 sm:min-h-[600px] sm:px-12 lg:px-20"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Reserve your slot
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="cta-title"
            className="mt-6 max-w-4xl font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.03em] uppercase"
          >
            Ready to make your car <span className="text-accent-metal">look brand new?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-md text-base text-silver sm:text-lg">
            Give your car the treatment it deserves.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/#booking" variant="primary" size="lg" className="w-full sm:w-auto">
              Book Your Car Spa
            </Button>
            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center gap-3 text-sm font-medium text-ink transition-colors hover:text-accent-deep sm:justify-start"
            >
              <span className="grid size-12 place-items-center rounded-full border border-ink/10 bg-paper/80 backdrop-blur-md">
                <Phone className="size-4 text-accent-deep" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[11px] tracking-[0.2em] text-mist uppercase">Or call concierge</span>
                {brand.phone}
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}