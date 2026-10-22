import { Navigate, Route, Routes } from 'react-router-dom'
import AccountLayout from './AccountLayout'
import DashboardPage from './pages/DashboardPage'
import BookingsPage from './pages/BookingsPage'
import HistoryPage from './pages/HistoryPage'
import InvoicesPage from './pages/InvoicesPage'
import PasswordPage from './pages/PasswordPage'
import BookingDetailPage from './pages/BookingDetailPage'

export default function AccountApp() {
  return (
    <Routes>
      <Route element={<AccountLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookings/:id" element={<BookingDetailPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="password" element={<PasswordPage />} />
        <Route path="*" element={<Navigate to="/account" replace />} />
      </Route>
    </Routes>
  )
}
