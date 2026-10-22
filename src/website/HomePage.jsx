import Hero from '../components/Hero'
import BookingCard from '../components/BookingCard'
import Stats from '../components/Stats'
import Brands from '../components/Brands'
import Services from '../components/Services'
import BeforeAfter from '../components/BeforeAfter'
import Packages from '../components/Packages'
import ThreeDCar from '../components/ThreeDCar'
import WhyChooseUs from '../components/WhyChooseUs'
import HowItWorks from '../components/HowItWorks'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import MobileApp from '../components/MobileApp'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingCard />
      <Stats />
      <Brands />
      <Services cta={{ href: '/services', label: 'View all services' }} />
      <BeforeAfter />
      <Packages cta={{ href: '/packages', label: 'View all packages' }} />
      <ThreeDCar />
      <WhyChooseUs />
      <HowItWorks />
      <Gallery cta={{ href: '/gallery', label: 'View full gallery' }} />
      <Testimonials cta={{ href: '/reviews', label: 'View all client reviews' }} />
      <MobileApp />
      <FAQ cta={{ href: '/faq', label: 'View all FAQs' }} />
      <FinalCTA />
    </>
  )
}
