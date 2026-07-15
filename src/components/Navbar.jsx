import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Atom, ShieldCheck } from 'lucide-react'
import { navLinks } from '../data/dummyData.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e) => { if (e.key === 'Escape') setOpen(false) }
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
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-containment-950/90 backdrop-blur-md border-b border-containment-600' : 'bg-transparent'
      }`}
    >
      <nav className={`container-page flex items-center justify-between transition-[height] duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span className="relative flex items-center justify-center w-10 h-10">
            <Atom className="w-8 h-8 text-cherenkov-400 group-hover:animate-spinSlow" strokeWidth={1.5} />
          </span>
          <span className="leading-tight font-display">
            <span className="block text-lg font-bold tracking-wide text-alloy-100">MIST NESC</span>
            <span className="block text-[10px] font-mono tracking-[0.2em] text-alloy-400 uppercase">Nuclear Eng. Society</span>
          </span>
        </NavLink>

        <div className="items-center hidden gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className="relative px-4 py-2 text-sm font-medium tracking-wide rounded-sm"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="navActiveBg"
                      className="absolute inset-0 rounded-sm bg-cherenkov-400/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${isActive ? 'text-cherenkov-300' : 'text-alloy-300 hover:text-alloy-100'}`}>
                    {link.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="items-center hidden gap-3 lg:flex">
          <NavLink to={user ? '/admin' : '/login'} className="btn-secondary !px-4 !py-2 !text-xs">
            <ShieldCheck size={14} />
            {user ? 'Dashboard' : 'Executive Login'}
          </NavLink>
        </div>

        <button
          className="p-2 lg:hidden text-alloy-100"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t lg:hidden border-containment-600 bg-containment-950/98"
          >
            <div className="flex flex-col gap-1 py-4 container-page">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 text-sm font-medium rounded-sm ${
                      isActive ? 'text-cherenkov-300 bg-cherenkov-400/10' : 'text-alloy-300'
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
                {user ? 'Dashboard' : 'Executive Login'}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}