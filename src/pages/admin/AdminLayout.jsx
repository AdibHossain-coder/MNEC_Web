import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, Users, GraduationCap, CalendarClock,
  BookOpen, Images, LogOut, Atom, ExternalLink,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/news', label: 'News', icon: Newspaper },
  { to: '/admin/panel', label: 'Panel', icon: Users },
  { to: '/admin/alumni', label: 'Alumni', icon: GraduationCap },
  { to: '/admin/activities', label: 'Activities', icon: CalendarClock },
  { to: '/admin/resources', label: 'Resources', icon: BookOpen },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
]

export default function AdminLayout() {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen flex bg-containment-900">
      <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-containment-600 bg-containment-950">
        <Link to="/" className="flex items-center gap-2.5 px-6 h-20 border-b border-containment-600">
          <Atom className="text-cherenkov-400" size={24} />
          <span className="font-display font-bold text-alloy-100">NESC Admin</span>
        </Link>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                  isActive ? 'bg-cherenkov-400/10 text-cherenkov-300' : 'text-alloy-400 hover:text-alloy-100 hover:bg-containment-800'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-containment-600">
          <p className="text-xs text-alloy-500 truncate mb-3 font-mono">{user?.email}</p>
          <Link to="/" className="flex items-center gap-2 text-xs text-alloy-400 hover:text-cherenkov-300 mb-2">
            <ExternalLink size={13} /> View site
          </Link>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-hazard hover:opacity-80">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between px-5 h-16 border-b border-containment-600 bg-containment-950">
          <span className="font-display font-bold text-alloy-100">NESC Admin</span>
          <button onClick={logout} className="text-xs text-hazard">Sign out</button>
        </header>
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
