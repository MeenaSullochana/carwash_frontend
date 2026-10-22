import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import BeforeAfter from '../components/BeforeAfter'
import FinalCTA from '../components/FinalCTA'
import usePageTitle from '../hooks/usePageTitle'

export default function GalleryPage() {
  usePageTitle('Gallery')

  return (
    <>
      <PageHero
        id="gallery-page-title"
        eyebrow="Gallery"
        title={['Our work,', 'up close.']}
        subtitle="Real cars, real results. Browse finished details from our studio — filter by service and tap any image to view it full screen."
      />
      <Gallery />
      <BeforeAfter />
      <FinalCTA />
    </>
  )
}
