import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ServicesPage from './pages/ServicesPage'
import StaffPage from './pages/StaffPage'
import AccessoriesPage from './pages/AccessoriesPage'
import BookingsPage from './pages/BookingsPage'
import BookingDetailPage from './pages/BookingDetailPage'

function Protected({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="grid min-h-screen place-items-center text-mist">Loading…</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookings/:id" element={<BookingDetailPage />} />
        <Route
          path="services"
          element={
            <Protected roles={['admin']}>
              <ServicesPage />
            </Protected>
          }
        />
        <Route
          path="staff"
          element={
            <Protected roles={['admin']}>
              <StaffPage />
            </Protected>
          }
        />
        <Route
          path="accessories"
          element={
            <Protected roles={['admin']}>
              <AccessoriesPage />
            </Protected>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
