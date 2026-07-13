import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { gallery as dummyGallery } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

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

      <div className="container-page py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {albums.map((a) => (
            <button
              key={a}
              onClick={() => setAlbum(a)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                album === a
                  ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10'
                  : 'border-containment-600 text-alloy-400 hover:border-alloy-500'
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setActive(g)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
              className="block w-full break-inside-avoid panel overflow-hidden group relative"
            >
              <img src={g.url} alt={g.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-containment-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-cherenkov-300">{g.album}</p>
                  <p className="text-sm text-alloy-100">{g.title}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-containment-950/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button className="absolute top-6 right-6 text-alloy-300 hover:text-cherenkov-300" onClick={() => setActive(null)} aria-label="Close">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.url} alt={active.title} className="w-full h-auto max-h-[75vh] object-contain mx-auto" />
              <div className="text-center mt-4">
                <p className="text-xs font-mono uppercase tracking-wider text-cherenkov-300">{active.album}</p>
                <p className="text-alloy-100 mt-1">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
