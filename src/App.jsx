import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import WebsiteLayout from './website/WebsiteLayout'
import HomePage from './website/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PackagesPage from './pages/PackagesPage'
import GalleryPage from './pages/GalleryPage'
import ReviewsPage from './pages/ReviewsPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import AccountApp from './account/AccountApp'
import AdminApp from './admin/AdminApp'
import { AuthProvider as AdminAuthProvider } from './admin/context/AuthContext'

function LegacyBookingRedirect() {
  const { id } = useParams()
  return <Navigate to={`/account/bookings/${id}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="/account/*" element={<AccountApp />} />
      <Route path="/my-bookings" element={<Navigate to="/account/history" replace />} />
      <Route path="/my-bookings/:id" element={<LegacyBookingRedirect />} />

      <Route
        path="/admin/*"
        element={
          <AdminAuthProvider>
            <AdminApp />
          </AdminAuthProvider>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
