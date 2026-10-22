import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'
import HowItWorks from '../components/HowItWorks'
import FinalCTA from '../components/FinalCTA'
import Button from '../components/ui/Button'
import usePageTitle from '../hooks/usePageTitle'
import { faqs, moreFaqs } from '../data/content'

const allFaqs = [...faqs, ...moreFaqs]

export default function FAQPage() {
  usePageTitle('FAQ')

  return (
    <>
      <PageHero
        id="faq-page-title"
        eyebrow="FAQ"
        title={['Frequently asked', 'questions.']}
        subtitle="Bookings, timings, products, payments and aftercare — everything you need to know before your visit."
      >
        <Button href="/contact" variant="ghost" size="lg">
          Ask a Question
        </Button>
      </PageHero>
      <FAQ items={allFaqs} />
      <HowItWorks />
      <FinalCTA />
    </>
  )
}
