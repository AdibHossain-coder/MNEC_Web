import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, Users, GraduationCap, CalendarClock,
  BookOpen, Images, LogOut, Atom, ExternalLink, Menu, X
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/news', label: 'News Logs', icon: Newspaper },
  { to: '/admin/panel', label: 'Executive Panel', icon: Users },
  { to: '/admin/alumni', label: 'Alumni Records', icon: GraduationCap },
  { to: '/admin/activities', label: 'Activities', icon: CalendarClock },
  { to: '/admin/resources', label: 'Data Resources', icon: BookOpen },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
]

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavContent = () => (
    <>
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-cherenkov-400/10 text-cherenkov-300 border-l-2 border-cherenkov-400 font-medium' 
                  : 'text-alloy-400 border-l-2 border-transparent hover:text-alloy-100 hover:bg-containment-800'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.5} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-5 border-t border-containment-600 bg-containment-950">
        <p className="mb-4 font-mono text-[10px] tracking-widest uppercase truncate text-alloy-500">
          ID: {user?.email}
        </p>
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2 text-xs transition-colors text-alloy-400 hover:text-cherenkov-300">
            <ExternalLink size={14} /> View live portal
          </Link>
          <button onClick={logout} className="flex items-center gap-2 text-xs transition-colors text-hazard hover:text-hazard/80">
            <LogOut size={14} /> Terminate session
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-containment-900">
      {/* ---------------- DESKTOP SIDEBAR ---------------- */}
      <aside className="flex-col hidden w-64 border-r shrink-0 md:flex border-containment-600 bg-containment-950">
        <Link to="/admin" className="flex items-center gap-3 px-6 border-b h-22 border-containment-600 bg-containment-900/20 py-7">
          <Atom className="text-cherenkov-400 animate-spinSlow" size={26} strokeWidth={1.5} />
          <span className="font-bold tracking-wide font-display text-alloy-100">SYSTEM<span className="text-cherenkov-400">ADMIN</span></span>
        </Link>
        <NavContent />
      </aside>

      {/* ---------------- MOBILE MENU DRAWER ---------------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-containment-950/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative flex flex-col w-64 max-w-[80%] h-full border-r border-containment-600 bg-containment-950 shadow-2xl">
            <div className="flex items-center justify-between px-5 py-6 border-b border-containment-600">
              <span className="font-bold tracking-wide font-display text-alloy-100">SYSTEM<span className="text-cherenkov-400">ADMIN</span></span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-alloy-400 hover:text-alloy-100">
                <X size={20} />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex flex-col flex-1 h-screen min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between h-16 px-5 border-b shrink-0 md:hidden border-containment-600 bg-containment-950">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="p-1 text-alloy-400 hover:text-alloy-100">
              <Menu size={20} />
            </button>
            <span className="font-bold tracking-wide font-display text-alloy-100">SYS<span className="text-cherenkov-400">ADMIN</span></span>
          </div>
          <button onClick={logout} className="text-[11px] font-mono uppercase tracking-wider text-hazard px-2 py-1 border border-hazard/30 bg-hazard/10 rounded-sm">
            Logout
          </button>
        </header>
        
        {/* Main scrollable area */}
        <main className="flex-1 p-5 overflow-y-auto sm:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}