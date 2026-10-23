import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ClipboardList, FileText, HelpCircle, Images, LayoutDashboard, LogOut, Package, Sparkles, Star, Users, Wrench } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Jobs', icon: ClipboardList },
  { to: '/admin/my-work', label: 'My work', icon: Wrench },
  { to: '/admin/invoices', label: 'Invoices', icon: FileText, roles: ['admin', 'supervisor'] },
  { to: '/admin/services', label: 'Services', icon: Sparkles, roles: ['admin'] },
  { to: '/admin/gallery', label: 'Gallery', icon: Images, roles: ['admin'] },
  { to: '/admin/reviews', label: 'Reviews', icon: Star, roles: ['admin'] },
  { to: '/admin/faqs', label: 'FAQ', icon: HelpCircle, roles: ['admin'] },
  { to: '/admin/staff', label: 'Staff', icon: Users, roles: ['admin'] },
  { to: '/admin/accessories', label: 'Car items', icon: Package, roles: ['admin'] },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-ink/10 bg-cloud lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-5 lg:block">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink">GEEKAY</p>
            <p className="text-xs tracking-[0.2em] text-mist uppercase">Staff console</p>
          </div>
          <button
            type="button"
            className="btn-ghost lg:mt-6 lg:w-full"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {links
            .filter((link) => !link.roles || link.roles.includes(user.role))
            .map((link) => (
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
          <p className="text-xs tracking-wide text-mist uppercase">{user.role === 'washer' ? 'staff' : user.role}</p>
          <a href="/" className="mt-3 inline-block text-xs text-accent hover:underline">
            ← Website
          </a>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
