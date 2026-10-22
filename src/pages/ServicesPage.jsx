import PageHero from '../components/PageHero'
import Services from '../components/Services'
import BeforeAfter from '../components/BeforeAfter'
import HowItWorks from '../components/HowItWorks'
import FinalCTA from '../components/FinalCTA'
import Button from '../components/ui/Button'
import usePageTitle from '../hooks/usePageTitle'

export default function ServicesPage() {
  usePageTitle('Services')

  return (
    <>
      <PageHero
        id="services-page-title"
        eyebrow="Services"
        title={['Every service your', 'car deserves.']}
        subtitle="From a quick foam wash to multi-year ceramic and PPF protection — performed by certified detailers in our studio or at your doorstep."
      >
        <div className="flex flex-col justify-center gap-3 min-[420px]:flex-row">
          <Button href="/#booking" size="lg">
            Book a Service
          </Button>
          <Button href="/packages" variant="ghost" size="lg" icon={false}>
            Compare Packages
          </Button>
        </div>
      </PageHero>
      <Services />
      <BeforeAfter />
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
