import PageHero from '../components/PageHero'
import Packages from '../components/Packages'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import usePageTitle from '../hooks/usePageTitle'
import { addOns } from '../data/content'

function AddOns() {
  return (
    <section aria-labelledby="addons-title" className="section-y relative">
      <div className="container-lux">
        <SectionHeading
          id="addons-title"
          eyebrow="Add-ons"
          title={['Customise your', 'package.']}
          subtitle="Add any of these extras to a package when you book. *Free pickup within 10 km of our studio."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {addOns.map(({ icon: Icon, title, price }, i) => (
            <Reveal
              key={title}
              delay={i * 0.08}
              className="group flex items-center gap-4 rounded-3xl border border-ink/10 bg-paper/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent-deep transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium text-ink">{title}</span>
                <span className="mt-0.5 block font-display text-sm font-semibold text-accent-deep">{price}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PackagesPage() {
  usePageTitle('Packages')

  return (
    <>
      <PageHero
        id="packages-page-title"
        eyebrow="Packages"
        title={['Simple pricing.', 'Stunning results.']}
        subtitle="Three curated packages for every kind of owner — each with a complimentary hand finish and final inspection."
      />
      <Packages />
      <AddOns />
      <FAQ cta={{ href: '/faq', label: 'View all FAQs' }} />
      <FinalCTA />
    </>
  )
}
