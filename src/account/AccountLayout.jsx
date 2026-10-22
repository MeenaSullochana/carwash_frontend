import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { CalendarClock, FileText, History, KeyRound, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/AuthModal'
import Button from '../components/ui/Button'

const links = [
  { to: '/account', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/account/bookings', label: 'Bookings', icon: CalendarClock },
  { to: '/account/history', label: 'History', icon: History },
  { to: '/account/invoices', label: 'Invoices', icon: FileText },
  { to: '/account/password', label: 'Password', icon: KeyRound },
]

export default function AccountLayout() {
  const { user, logout, openAuth } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper px-5">
        <div className="card w-full max-w-md text-center">
          <p className="text-xs tracking-[0.22em] text-mist uppercase">Geekay Klean Kare</p>
          <h1 className="mt-3 font-display text-3xl text-ink">My account</h1>
          <p className="mt-2 text-sm text-mist">Login to see bookings from the website or the app, your history, and invoices.</p>
          <Button className="mt-6" onClick={() => openAuth('login')}>
            Login
          </Button>
        </div>
        <AuthModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-ink/10 bg-cloud lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink">GEEKAY</p>
            <p className="text-xs tracking-[0.2em] text-mist uppercase">My account</p>
          </div>
          <button
            type="button"
            className="btn-ghost lg:mt-6 lg:w-full"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap transition ${
                  isActive ? 'bg-accent/15 text-accent' : 'text-silver hover:bg-graphite hover:text-ink'
                }`
              }
            >
              <link.icon className="size-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden border-t border-ink/10 px-5 py-4 lg:block">
          <p className="text-sm text-ink">{user.name}</p>
          <p className="text-xs text-mist">{user.email}</p>
          <a href="/" className="mt-3 inline-block text-xs text-accent hover:underline">
            Book on the website
          </a>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <AuthModal />
    </div>
  )
}
