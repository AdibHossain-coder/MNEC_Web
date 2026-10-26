import { useLocation, useOutlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

// Freezes the outlet element during exit animation so old and new tabs crossfade smoothly
function FrozenOutlet() {
  const o = useOutlet()
  const [outlet] = useState(o)
  return outlet
}

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-containment-900">
      <Navbar />

      {/* Top Cherenkov Laser Route Transition Bar */}
      <motion.div
        key={`progress-${location.pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-gradient-to-r from-cherenkov-400 via-cherenkov-200 to-uranium-400 shadow-[0_0_14px_rgba(34,211,238,0.95)]"
      />

      <main className="flex-1 flex flex-col overflow-x-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16, scale: 0.992, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, scale: 0.995, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col flex-1"
          >
            <FrozenOutlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
