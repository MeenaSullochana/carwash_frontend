import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import Stats from '../components/Stats'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import FinalCTA from '../components/FinalCTA'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Reveal, { easePremium } from '../components/ui/Reveal'
import usePageTitle from '../hooks/usePageTitle'
import { aboutStory, milestones, values } from '../data/content'

function Story() {
  return (
    <section aria-labelledby="story-title" className="relative pb-4">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-6">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[40px] bg-accent/10 blur-3xl" />
          <div className="overflow-hidden rounded-[32px] border border-ink/10 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.45)]">
            <img src={aboutStory.image} alt={aboutStory.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="glass absolute -bottom-6 left-6 rounded-2xl px-5 py-4 sm:left-10">
            <span className="block font-display text-3xl font-semibold text-ink">8+</span>
            <span className="block text-[11px] tracking-[0.2em] text-mist uppercase">Years of craft</span>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading id="story-title" size="md" eyebrow="Our story" title={['Built by people', 'who love cars.']} />
          {aboutStory.paragraphs.map((p, i) => (
            <Reveal key={p} as="p" delay={0.1 + i * 0.08} className="mt-5 text-base leading-relaxed text-silver sm:text-lg">
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.3} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/services" size="lg">
              Explore Services
            </Button>
            <Button href="/contact" variant="ghost" size="lg" icon={false}>
              Talk to Us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section aria-labelledby="values-title" className="section-y relative bg-cloud">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-lux">
        <SectionHeading id="values-title" align="center" eyebrow="What we stand for" title={['Our', 'values.']} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08} className="group rounded-[24px] border border-ink/10 bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section aria-labelledby="journey-title" className="section-y relative">
      <div className="container-lux">
        <SectionHeading id="journey-title" eyebrow="Our journey" title={['Milestones along', 'the way.']} />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6 md:before:absolute md:before:inset-x-0 md:before:top-[11px] md:before:h-px md:before:bg-ink/10 lg:mt-16">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: easePremium, delay: i * 0.1 }}
              className="relative border-l border-ink/10 pl-6 md:border-0 md:pl-0"
            >
              <span className="absolute top-1 -left-[7px] size-3.5 rounded-full border-2 border-paper bg-accent shadow-[0_0_0_4px_rgba(239,43,53,0.2)] md:relative md:top-0 md:left-0 md:block md:size-[22px] md:border-4" />
              <p className="font-display text-3xl font-semibold text-metal md:mt-6">{m.year}</p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-mist">{m.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function AboutPage() {
  usePageTitle('About Us')

  return (
    <>
      <PageHero
        id="about-title"
        eyebrow="About us"
        title={['Detailing is our', 'obsession.']}
        subtitle="A team of certified detailers, premium chemistry and a studio built around one goal — making your car look its absolute best."
      />
      <Story />
      <Stats />
      <WhyChooseUs />
      <Values />
      <Journey />
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
