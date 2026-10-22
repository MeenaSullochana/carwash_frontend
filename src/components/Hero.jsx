import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Droplets, ShieldCheck, Star } from 'lucide-react'
import Button from './ui/Button'
import LazyScene from './three/LazyScene'
import { easePremium } from './ui/Reveal'
import { images } from '../assets/images'
import { useRichEffects } from '../hooks/useMediaQuery'
import { usePointerParallax } from '../hooks/usePointerParallax'

const lineReveal = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1, ease: easePremium, delay: 0.25 + i * 0.12 } }),
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (d) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium, delay: d } }),
}

const cssParticles = [
  [8, 12, 0], [18, 30, 2.4], [27, 8, 5.1], [36, 44, 1.2], [46, 20, 3.8], [55, 36, 6.4],
  [63, 10, 0.8], [71, 48, 4.4], [80, 24, 2], [88, 40, 5.8], [94, 16, 3.1], [13, 52, 7.2],
]

const heroCars = [
  // {
  //   src: images.jeepSplash,
  //   alt: 'Black Jeep Wrangler covered in soap foam with water splashes, sponge, mitt and bucket',
  //   label: 'Jeep Wrangler Foam Wash',
  //   photo: true,
  // },
  {
    src: images.mercedesSplash,
    alt: 'Black Mercedes-Benz GLS 450d covered in foam during a pressure-wash car spa',
    label: 'Mercedes-Benz GLS 450d',
    photo: true,
  },
  {
    src: images.rollsRoyceSplash,
    alt: 'Black Rolls-Royce covered in foam with a water splash during a car spa wash',
    label: 'Rolls-Royce Foam Wash',
    photo: true,
  },
  { src: images.tharCutout, alt: 'Glossy black Mahindra Thar Roxx, front three-quarter view', label: 'Mahindra Thar Roxx' },
  { src: images.harrierCutout, alt: 'Pearl white Tata Harrier, front three-quarter view', label: 'Tata Harrier' },
  // { src: images.rollsRoyceCutout, alt: 'Gloss black Rolls-Royce Cullinan, front three-quarter view', label: 'Rolls-Royce Cullinan' },
  // { src: images.bmwCutout, alt: 'Marina Bay blue BMW M5, front three-quarter view', label: 'BMW M5' },
]

const SLIDE_INTERVAL = 4500

const photoMask = 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)'

const carSlide = {
  enter: (dir) => ({ opacity: 0, x: `${dir * 45}%`, scale: 0.85, filter: 'blur(6px)' }),
  center: {
    opacity: 1,
    x: '0%',
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: easePremium },
  },
  exit: (dir) => ({
    opacity: 0,
    x: `${dir * -45}%`,
    scale: 0.85,
    filter: 'blur(6px)',
    transition: { duration: 0.7, ease: easePremium },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [[slide, direction], setSlide] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const car = heroCars[slide]

  const goTo = (next, dir = next > slide ? 1 : -1) =>
    setSlide([(next + heroCars.length) % heroCars.length, dir])

  useEffect(() => {
    if (paused || reduceMotion || heroCars.length < 2) return
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') setSlide(([s]) => [(s + 1) % heroCars.length, 1])
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, reduceMotion, slide])

  useEffect(() => {
    heroCars.slice(1).forEach(({ src }) => {
      const img = new Image()
      img.src = src
    })
  }, [])
  const rich = useRichEffects()
  const pointer = usePointerParallax(ref, rich)

  const carX = useTransform(pointer.x, (v) => v * -36)
  const carY = useTransform(pointer.y, (v) => v * -18)
  const carRotY = useTransform(pointer.x, (v) => v * 7)
  const carRotX = useTransform(pointer.y, (v) => v * -4)
  const spotX = useTransform(pointer.x, (v) => v * 80)
  const textX = useTransform(pointer.x, (v) => v * 10)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scrollCarY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const scrollFade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-paper pt-32 pb-24 sm:pt-40 sm:pb-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-40 lg:pb-36"
    >
      {/* Showroom backdrop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <motion.div
          style={{ x: spotX }}
          className="absolute -top-[30%] right-[-20%] size-[900px] max-w-none animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(239,43,53,0.18),transparent_62%)] sm:right-[-10%] lg:size-[1200px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#16244a] via-paper to-paper" />
        <div className="absolute -top-[20%] right-[8%] h-[90%] w-[46%] bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(239,43,53,0.16),transparent_70%)] blur-2xl max-lg:hidden" />
        <div className="absolute -bottom-40 left-[-20%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(200,16,46,0.07),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] overflow-hidden [perspective:600px]">
          <div className="absolute inset-x-[-50%] bottom-[-20%] h-[160%] origin-bottom [transform:rotateX(72deg)] bg-[linear-gradient(rgba(200,16,46,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,16,46,0.16)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_top,#000_10%,transparent_75%)]" />
        </div>
        <div className="grain" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      {rich ? (
        <LazyScene className="absolute inset-0 -z-10" pointer={pointer} variant="hero" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          {cssParticles.map(([left, bottom, delay]) => (
            <span
              key={`${left}-${bottom}`}
              className="absolute size-1 animate-drift rounded-full bg-accent/70 shadow-[0_0_8px_rgba(239,43,53,0.9)]"
              style={{ left: `${left}%`, bottom: `${bottom}%`, animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      )}

      <div className="container-lux relative grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-6">
        {/* Copy */}
        <motion.div
          initial="hidden"
          animate="show"
          style={{ x: textX, opacity: scrollFade }}
          className="relative z-10 text-center lg:col-span-6 lg:text-left"
        >
          <motion.div
            variants={fade}
            custom={0.1}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-[11px] whitespace-nowrap text-silver min-[375px]:text-xs sm:gap-3 sm:text-[13px]"
          >
            <span className="flex items-center gap-0.5 rounded-full bg-ink/10 px-2 py-1" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-accent text-accent-deep" aria-hidden="true" />
              ))}
            </span>
            Trusted by 5,000+ Car Owners
          </motion.div>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,11.5vw,4.5rem)] leading-[0.92] font-bold tracking-[-0.04em] uppercase sm:mt-8 lg:text-[clamp(4.25rem,7vw,7.25rem)]"
          >
            {['Your Car.', 'Redefined.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineReveal}
                  custom={i}
                  className={`block ${i === 1 ? 'text-metal' : 'text-ink'}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fade}
            custom={0.55}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg lg:mx-0 lg:max-w-lg"
          >
            Premium car spa, detailing and protection services designed for people who expect more from their
            drive.
          </motion.p>

          <motion.div
            variants={fade}
            custom={0.7}
            className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:justify-center lg:justify-start"
          >
            <Button href="#booking" variant="primary" size="lg" className="w-full min-[420px]:w-auto">
              Book Your Spa
            </Button>
            <Button href="#services" variant="ghost" size="lg" icon={false} className="w-full min-[420px]:w-auto">
              Explore Services
            </Button>
          </motion.div>

          <motion.ul
            variants={fade}
            custom={0.85}
            className="mt-10 hidden flex-wrap items-center gap-x-6 gap-y-2 text-xs tracking-[0.18em] text-mist uppercase sm:flex sm:justify-center lg:hidden lg:justify-start xl:flex"
          >
            <li>Studio &amp; Doorstep</li>
            <li className="size-1 rounded-full bg-accent" aria-hidden="true" />
            <li>Certified Detailers</li>
            <li className="size-1 rounded-full bg-accent" aria-hidden="true" />
            <li>9H Ceramic</li>
          </motion.ul>
        </motion.div>

        {/* Vehicle */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: easePremium, delay: 0.3 }}
            style={{ y: scrollCarY }}
            className="relative mx-auto w-full max-w-[560px] [perspective:1400px] lg:-mr-[12%] lg:ml-[-4%] lg:w-[116%] lg:max-w-none"
          >
            <motion.div
              style={{ x: carX, y: carY, rotateY: carRotY, rotateX: carRotX }}
              className="relative [transform-style:preserve-3d]"
            >
              <div className="animate-float-slow">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[12%] bottom-[8%] h-[22%] rounded-[100%] bg-accent/25 blur-[60px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[10%] bottom-[7%] h-[9%] rounded-[100%] bg-black/70 blur-2xl"
                />
                <div
                  className="relative aspect-[16/11]"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Featured cars"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={slide}
                      custom={direction}
                      variants={carSlide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      drag={heroCars.length > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = offset.x + velocity.x * 0.2
                        if (swipe < -60) goTo(slide + 1, 1)
                        else if (swipe > 60) goTo(slide - 1, -1)
                      }}
                      aria-roledescription="slide"
                      aria-label={`${slide + 1} of ${heroCars.length}: ${car.label}`}
                      className={`absolute cursor-grab touch-pan-y active:cursor-grabbing ${
                        car.photo ? 'inset-[-4%]' : 'inset-[5%]'
                      }`}
                    >
                      <img
                        src={car.src}
                        alt={car.alt}
                        fetchPriority={slide === 0 ? 'high' : 'auto'}
                        decoding="async"
                        draggable={false}
                        className={`absolute inset-0 size-full select-none ${
                          car.photo
                            ? 'object-contain object-center'
                            : 'object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]'
                        }`}
                        style={car.photo ? { maskImage: photoMask, WebkitMaskImage: photoMask } : undefined}
                      />
                      {!car.photo && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            maskImage: `url(${car.src})`,
                            WebkitMaskImage: `url(${car.src})`,
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'bottom',
                            WebkitMaskPosition: 'bottom',
                          }}
                        >
                          <div className="absolute inset-y-0 left-0 w-1/4 animate-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: easePremium, delay: 1.1 }}
              className="glass absolute top-[12%] left-[4%] hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex lg:left-[14%]"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-accent/15 text-accent-deep">
                <Droplets className="size-4" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-display text-sm font-semibold text-ink">98% Gloss</span>
                <span className="block text-[11px] text-mist">Paint clarity</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: easePremium, delay: 1.25 }}
              className="glass absolute right-[4%] bottom-[16%] hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex lg:right-[22%]"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-ink/10 text-ink">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block font-display text-sm font-semibold text-ink">9H Ceramic</span>
                <span className="block text-[11px] text-mist">5-year protection</span>
              </span>
            </motion.div>

            {heroCars.length > 1 && (
              <div className="absolute inset-x-0 -bottom-6 flex items-center justify-center gap-2 sm:bottom-0">
                {heroCars.map((c, i) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${c.label}`}
                    aria-current={i === slide}
                    className="group grid h-6 place-items-center px-1"
                  >
                    <span
                      className={`block h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                        i === slide ? 'w-10 bg-ink/15' : 'w-4 bg-ink/25 group-hover:bg-ink/50'
                      }`}
                    >
                      {i === slide && (
                        <motion.span
                          key={`${slide}-${paused}`}
                          className="block h-full rounded-full bg-accent"
                          initial={{ width: reduceMotion || paused ? '100%' : '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: reduceMotion || paused ? 0 : SLIDE_INTERVAL / 1000, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#booking"
        style={{ opacity: scrollFade }}
        className="absolute bottom-40 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-mist uppercase 2xl:flex"
        aria-label="Scroll to booking"
      >
        Scroll
        <ChevronDown className="size-4 animate-bounce text-accent-deep" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
