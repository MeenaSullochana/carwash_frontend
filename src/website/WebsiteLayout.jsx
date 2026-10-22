import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MobileBookingBar from '../components/MobileBookingBar'
import FloatingContact from '../components/FloatingContact'
import AuthModal from '../components/AuthModal'

export default function WebsiteLayout() {
  const { pathname } = useLocation()
  const clean = pathname.replace(/\/+$/, '') || '/'
  const hideBookingChrome = clean === '/contact' || clean.startsWith('/my-bookings')

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-paper px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {!hideBookingChrome && <MobileBookingBar />}
      <FloatingContact />
      <AuthModal />
    </MotionConfig>
  )
}
