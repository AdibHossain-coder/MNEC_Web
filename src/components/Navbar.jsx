import { useEffect, useRef, useState, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Atom, ShieldCheck, Sun, Moon } from 'lucide-react'
import { navLinks } from '../data/dummyData.js'
import { useClubInfo } from '../hooks/useClubInfo.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const { clubInfo } = useClubInfo()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  // Refs for measuring exact tab positions for guaranteed 60fps sliding animation
  const navContainerRef = useRef(null)
  const tabRefs = useRef({})
  const [activeRect, setActiveRect] = useState(null)
  const [hoverRect, setHoverRect] = useState(null)

  // Determine which navLink is currently active
  const activePath =
    navLinks.find((l) =>
      l.path === '/' ? location.pathname === '/' : location.pathname.startsWith(l.path)
    )?.path || null

  const updateActiveRect = useCallback(() => {
    if (!activePath || !tabRefs.current[activePath] || !navContainerRef.current) {
      setActiveRect(null)
      return
    }
    const el = tabRefs.current[activePath]
    setActiveRect({
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
      top: el.offsetTop,
    })
  }, [activePath])

  useEffect(() => {
    updateActiveRect()
    window.addEventListener('resize', updateActiveRect)
    return () => window.removeEventListener('resize', updateActiveRect)
  }, [updateActiveRect, location.pathname])

  function handleTabHover(path) {
    const el = tabRefs.current[path]
    if (!el) return
    setHoverRect({
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
      top: el.offsetTop,
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKeyDown)
      }
    }
    document.body.style.overflow = ''
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-containment-950/90 backdrop-blur-xl border-b border-containment-600 shadow-3d'
          : 'bg-containment-950/40 backdrop-blur-sm border-b border-containment-600/40'
      }`}
    >
      <nav
        className={`container-page flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <NavLink to="/" className="flex items-center gap-3.5 group" onClick={() => setOpen(false)}>
          <span className="relative flex items-center justify-center w-11 h-11 rounded-sm border border-cherenkov-400/30 bg-containment-800/80 shadow-glow transition-transform duration-300 group-hover:scale-105 group-hover:border-cherenkov-400">
            <span className="absolute inset-1 rounded-full bg-cherenkov-400/15 blur-sm group-hover:bg-cherenkov-400/30 transition-colors" />
            <Atom className="relative w-7 h-7 text-cherenkov-400 group-hover:animate-spinSlow" strokeWidth={1.6} />
          </span>
          <span className="leading-tight font-display">
            <span className="flex items-center gap-2 text-lg font-bold tracking-wide text-alloy-100">
              {clubInfo.shortName}
              <span className="hidden sm:inline-block px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest rounded-sm bg-safety/15 text-safety border border-safety/30">
                SAFE ENERGY
              </span>
            </span>
            <span className="block text-[10px] font-mono tracking-[0.18em] text-alloy-400 uppercase">
              MIST Nuclear Eng. Club
            </span>
          </span>
        </NavLink>

        {/* ---------------- DESKTOP NAV TABS WITH SMOOTH SLIDING PILL ---------------- */}
        <div
          ref={navContainerRef}
          onMouseLeave={() => setHoverRect(null)}
          className="relative items-center hidden gap-1 lg:flex py-1 px-1"
        >
          {/* Magnetic Hover Preview Pill */}
          <AnimatePresence>
            {hoverRect && (
              <motion.span
                key="nav-hover-pill"
                initial={{ opacity: 0, x: hoverRect.left, width: hoverRect.width }}
                animate={{
                  opacity: 1,
                  x: hoverRect.left,
                  width: hoverRect.width,
                  height: hoverRect.height,
                  top: hoverRect.top,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.6 }}
                className="pointer-events-none absolute left-0 rounded-sm bg-cherenkov-400/8 border border-cherenkov-400/20"
              />
            )}
          </AnimatePresence>

          {/* Active Tab Gliding Cherenkov Pill */}
          {activeRect && (
            <motion.span
              initial={false}
              animate={{
                x: activeRect.left,
                width: activeRect.width,
                height: activeRect.height,
                top: activeRect.top,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 30,
                mass: 0.7,
              }}
              className="pointer-events-none absolute left-0 rounded-sm bg-cherenkov-400/15 border border-cherenkov-400/50 shadow-glow"
            >
              {/* Glowing Bottom Laser Indicator inside Active Pill */}
              <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cherenkov-300 to-transparent shadow-[0_0_8px_#22d3ee]" />
            </motion.span>
          )}

          {navLinks.map((link) => {
            const isActive = activePath === link.path
            return (
              <NavLink
                key={link.path}
                ref={(el) => {
                  tabRefs.current[link.path] = el
                }}
                to={link.path}
                end={link.path === '/'}
                onMouseEnter={() => handleTabHover(link.path)}
                className="relative z-10 px-4 py-2 text-sm font-medium tracking-wide rounded-sm select-none"
              >
                <span
                  className={`relative z-10 inline-block transition-all duration-300 ${
                    isActive
                      ? 'text-cherenkov-300 font-semibold scale-[1.03] drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                      : 'text-alloy-300 hover:text-alloy-100'
                  }`}
                >
                  {link.name}
                </span>
              </NavLink>
            )
          })}
        </div>

        <div className="items-center hidden gap-3 lg:flex">
          <button
            onClick={toggleTheme}
            className="p-2.5 transition-all duration-300 border rounded-sm text-alloy-300 border-containment-600 bg-containment-800/80 hover:text-cherenkov-300 hover:border-cherenkov-400 hover:shadow-glow hover:-translate-y-0.5"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Cleanroom Light Mode' : 'Switch to Reactor Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <NavLink to={user ? '/admin' : '/login'} className="btn-secondary !px-4 !py-2 !text-xs">
            <ShieldCheck size={14} className="text-cherenkov-400" />
            {user ? 'CMS Dashboard' : 'CMS Login'}
          </NavLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 transition-colors border rounded-sm text-alloy-300 border-containment-600 bg-containment-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="p-2 text-alloy-100"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t lg:hidden border-containment-600 bg-containment-950/98 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 py-4 container-page">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 text-sm font-medium rounded-sm transition-all duration-300 ${
                      isActive
                        ? 'text-cherenkov-300 bg-cherenkov-400/15 border border-cherenkov-400/30 translate-x-1'
                        : 'text-alloy-300 hover:bg-containment-800 hover:translate-x-1'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to={user ? '/admin' : '/login'}
                onClick={() => setOpen(false)}
                className="justify-center mt-2 btn-secondary"
              >
                <ShieldCheck size={14} />
                {user ? 'CMS Dashboard' : 'CMS Login'}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
