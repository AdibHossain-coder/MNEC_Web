import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { gallery as dummyGallery } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

function GalleryImage({ item, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onClick(item)}
      className="relative block w-full overflow-hidden transition-all duration-300 break-inside-avoid corner-frame panel group hover:border-cherenkov-400/60 hover:shadow-3d-hover"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-containment-800 animate-pulse min-h-[200px]">
          <Loader2 className="w-6 h-6 animate-spin text-alloy-500" />
        </div>
      )}

      <img
        src={item.url}
        alt={item.title}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0 scale-95'
        }`}
      />

      <div className="absolute inset-0 flex items-end p-5 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent group-hover:opacity-100">
        <div className="text-left transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 mb-1">
            {item.album}
          </p>
          <p className="text-sm font-semibold text-white">{item.title}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default function Gallery() {
  const { data, usingFallback } = useFirestoreCollection('gallery', dummyGallery)
  const [album, setAlbum] = useState('All')
  const [active, setActive] = useState(null)

  const albums = useMemo(() => ['All', ...new Set(data.map((g) => g.album))], [data])
  const filtered = album === 'All' ? data : data.filter((g) => g.album === album)

  return (
    <div>
      <PageHeader
        eyebrow="Field Notes & Visual Telemetry"
        title="Gallery"
        description="Job seminars with MIST scholars, safe nuclear energy awareness exhibitions, reactor physics bootcamps, and site visits."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER ---------------- */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <Filter size={16} className="mr-2 text-alloy-400" />
          {albums.map((a) => {
            const isSelected = album === a
            return (
              <button
                key={a}
                onClick={() => setAlbum(a)}
                className={`relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-colors duration-300 ${
                  isSelected
                    ? 'border-cherenkov-400/60 text-cherenkov-300'
                    : 'border-containment-600 text-alloy-400 hover:border-alloy-300 hover:text-alloy-200'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="galleryFilterActivePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-sm bg-cherenkov-400/15 border border-cherenkov-400 shadow-glow"
                  />
                )}
                <span className="relative z-10">{a}</span>
              </button>
            )
          })}
        </div>

        {/* ---------------- MASONRY GRID ---------------- */}
        <div className="gap-4 space-y-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((g) => (
              <GalleryImage key={g.id} item={g} onClick={setActive} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute p-2 transition-colors border rounded-sm top-4 right-4 sm:top-8 sm:right-8 border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 bg-slate-900/70"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-2 corner-frame panel bg-slate-900/90">
                <img
                  src={active.url}
                  alt={active.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                />
              </div>
              <div className="flex flex-col items-center justify-center mt-6 text-center sm:flex-row sm:gap-4">
                <p className="px-2.5 py-1 mb-2 font-mono text-[10px] tracking-widest uppercase border sm:mb-0 text-cyan-300 border-cyan-400/30 bg-cyan-400/10 w-fit">
                  {active.album}
                </p>
                <p className="text-lg font-medium text-white">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
