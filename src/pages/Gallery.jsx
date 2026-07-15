import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Loader2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { gallery as dummyGallery } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

// Sub-component to handle clean image loading states
function GalleryImage({ item, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.button
      onClick={() => onClick(item)}
      className="relative block w-full overflow-hidden transition-all duration-300 break-inside-avoid panel group hover:border-cherenkov-400/50 hover:shadow-glow"
    >
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-containment-800 animate-pulse min-h-[200px]">
          <Loader2 className="w-6 h-6 animate-spin text-alloy-600" />
        </div>
      )}
      
      <img 
        src={item.url} 
        alt={item.title} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0 scale-95'}`} 
      />
      
      <div className="absolute inset-0 flex items-end p-5 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-containment-950/90 via-containment-950/20 to-transparent group-hover:opacity-100">
        <div className="text-left transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-[10px] font-mono uppercase tracking-wider text-cherenkov-400 mb-1">{item.album}</p>
          <p className="text-sm font-medium text-alloy-100">{item.title}</p>
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
        eyebrow="Field Notes"
        title="Gallery"
        description="Bootcamps, seminars, site visits, and the everyday of running a technical club."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER ---------------- */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <Filter size={16} className="mr-2 text-alloy-500" />
          {albums.map((a) => (
            <button
              key={a}
              onClick={() => setAlbum(a)}
              className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-all duration-300 ${
                album === a
                  ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10 shadow-glow'
                  : 'border-containment-600 text-alloy-400 hover:border-alloy-300 hover:bg-containment-700/50'
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* ---------------- MASONRY GRID ---------------- */}
        <div className="gap-4 space-y-4 columns-2 sm:columns-3 lg:columns-4">
          {filtered.map((g) => (
            <GalleryImage key={g.id} item={g} onClick={setActive} />
          ))}
        </div>
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-containment-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            onClick={() => setActive(null)}
          >
            <button 
              className="absolute p-2 transition-colors border rounded-sm top-4 right-4 sm:top-8 sm:right-8 border-containment-600 text-alloy-400 hover:text-cherenkov-400 hover:border-cherenkov-400/50 bg-containment-900/50" 
              onClick={() => setActive(null)} 
              aria-label="Close"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-2 corner-frame panel bg-containment-900/80">
                <img 
                  src={active.url} 
                  alt={active.title} 
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto" 
                />
              </div>
              <div className="flex flex-col items-center justify-center mt-6 text-center sm:flex-row sm:gap-4">
                <p className="px-2 py-1 mb-2 font-mono text-[10px] tracking-widest uppercase border sm:mb-0 text-cherenkov-400 border-cherenkov-400/30 bg-cherenkov-400/5 w-fit">
                  {active.album}
                </p>
                <p className="text-lg font-medium text-alloy-100">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}