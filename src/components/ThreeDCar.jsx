import { useRef } from 'react'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import LazyScene from './three/LazyScene'
import { easePremium } from './ui/Reveal'
import { images } from '../assets/images'
import { carFeatures } from '../data/content'
import { useRichEffects } from '../hooks/useMediaQuery'
import { usePointerParallax } from '../hooks/usePointerParallax'

// Desktop label anchors (percent of stage) and parallax depth.
const anchors = [
  { top: '14%', left: '2%', depth: 34 },
  { top: '10%', right: '2%', depth: 26 },
  { bottom: '20%', left: '0%', depth: 42 },
  { bottom: '26%', right: '0%', depth: 30 },
]

function FeatureLabel({ feature, anchor, pointer, index }) {
  const x = useTransform(pointer.x, (v) => v * anchor.depth)
  const y = useTransform(pointer.y, (v) => v * anchor.depth * 0.7)
  const Icon = feature.icon
  const { depth, ...position } = anchor
  return (
    <motion.div style={{ ...position, x, y }} className="absolute z-20 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easePremium, delay: 0.4 + index * 0.12 }}
        className="glass group flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-accent/40"
      >
        <span className="relative grid size-10 place-items-center rounded-xl bg-accent/10 text-accent-deep">
          <span className="absolute inset-0 animate-ping rounded-xl bg-accent/10 [animation-duration:3s]" />
          <Icon className="relative size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block font-display text-sm font-semibold text-ink">{feature.label}</span>
          <span className="block text-xs text-mist">{feature.detail}</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function ThreeDCar() {
  const stageRef = useRef(null)
  const rich = useRichEffects()
  const pointer = usePointerParallax(stageRef, rich)

  const rotateY = useTransform(pointer.x, (v) => v * 14)
  const rotateX = useTransform(pointer.y, (v) => v * -8)
  const carX = useTransform(pointer.x, (v) => v * -24)
  const lightX = useTransform(pointer.x, (v) => 50 + v * 50)
  const lightY = useTransform(pointer.y, (v) => 40 + v * 30)
  const lighting = useMotionTemplate`radial-gradient(600px circle at ${lightX}% ${lightY}%, rgba(239,43,53,0.16), transparent 65%)`

  return (
    <section aria-labelledby="curve-title" className="section-y relative overflow-hidden bg-cloud">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-lux">
        <SectionHeading
          id="curve-title"
          align="center"
          eyebrow="360° care"
          title={['Built for', 'every curve.']}
          subtitle="Every panel, edge and contour is treated by hand — so your car looks flawless from every angle."
        />
      </div>

      <div ref={stageRef} className="relative mx-auto mt-10 max-w-[1400px] px-5 sm:px-8 lg:mt-6 lg:px-12">
        <motion.div
          aria-hidden="true"
          style={{ background: lighting }}
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]"
        />
        {rich && (
          <LazyScene
            className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_55%_60%_at_50%_55%,#000_45%,transparent_100%)]"
            variant="showcase"
            pointer={pointer}
          />
        )}

        <div className="relative z-10 mx-auto aspect-[4/3] max-w-[1000px] [perspective:1600px] sm:aspect-[16/10] lg:aspect-[16/9]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.2, ease: easePremium }}
            style={{ rotateY, rotateX, x: carX }}
            className="absolute inset-[4%] [transform-style:preserve-3d] lg:inset-[6%_12%]"
          >
            <div aria-hidden="true" className="absolute inset-x-[22%] bottom-[1%] h-[10%] rounded-[100%] bg-black/70 blur-2xl" />
            <div aria-hidden="true" className="absolute inset-x-[20%] bottom-[4%] h-[10%] rounded-[100%] bg-accent/30 blur-3xl" />
            <div className="relative size-full">
              <img
                src={images.rollsRoyceSplash}
                alt="Glossy black Rolls-Royce Cullinan, front three-quarter view"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.3)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: `url(${images.rollsRoyceSplash})`,
                  WebkitMaskImage: `url(${images.rollsRoyceSplash})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'bottom',
                  WebkitMaskPosition: 'bottom',
                }}
              >
                <div className="absolute inset-y-0 left-0 w-1/5 animate-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent [animation-delay:1.5s]" />
              </div>
            </div>
          </motion.div>

          {carFeatures.map((feature, i) => (
            <FeatureLabel key={feature.label} feature={feature} anchor={anchors[i]} pointer={pointer} index={i} />
          ))}
        </div>

        <ul className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
          {carFeatures.map(({ label, detail, icon: Icon }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easePremium, delay: i * 0.08 }}
              className="glass flex flex-col gap-3 rounded-2xl p-4"
            >
              <Icon className="size-5 text-accent-deep" aria-hidden="true" />
              <span>
                <span className="block font-display text-sm font-semibold text-ink">{label}</span>
                <span className="block text-xs text-mist">{detail}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
