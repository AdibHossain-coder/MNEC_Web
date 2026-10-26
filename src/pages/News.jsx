import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { news as dummyNews } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

export default function News() {
  const { data, usingFallback } = useFirestoreCollection('news', dummyNews, 'date')
  const [tag, setTag] = useState('All')
  const [search, setSearch] = useState('')

  const tags = useMemo(() => ['All', ...new Set(data.map((n) => n.tag))], [data])

  const filtered = data.filter((n) => {
    const matchesTag = tag === 'All' || n.tag === tag
    const q = search.trim().toLowerCase()
    const matchesSearch =
      !q ||
      n.title?.toLowerCase().includes(q) ||
      n.excerpt?.toLowerCase().includes(q) ||
      n.body?.toLowerCase().includes(q) ||
      n.tag?.toLowerCase().includes(q)
    return matchesTag && matchesSearch
  })

  return (
    <div>
      <PageHeader
        eyebrow="Bulletin & Dispatches"
        title="News & Announcements"
        description="Updates from job seminars with MIST scholars, safe nuclear energy awareness campaigns, reactor physics bootcamps, and national competitions."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER & SEARCH BAR ---------------- */}
        <div className="flex flex-col gap-5 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={16} className="mr-2 text-alloy-400" />
            {tags.map((t) => {
              const active = tag === t
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`relative px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-colors duration-300 ${
                    active
                      ? 'border-cherenkov-400/60 text-cherenkov-300'
                      : 'border-containment-600 text-alloy-400 hover:border-alloy-300 hover:text-alloy-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="newsFilterActivePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-sm bg-cherenkov-400/15 border border-cherenkov-400 shadow-glow"
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              )
            })}
          </div>

          <div className="relative w-full group sm:w-80">
            <Search
              className="absolute transition-colors -translate-y-1/2 left-3.5 top-1/2 text-alloy-400 group-focus-within:text-cherenkov-400"
              size={16}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search seminars, safety logs..."
              className="w-full py-2.5 pl-10 pr-4 text-sm transition-colors border rounded-sm bg-containment-950/60 border-containment-600 text-alloy-100 placeholder:text-alloy-500 focus:border-cherenkov-400 focus:bg-containment-800 outline-none"
            />
          </div>
        </div>

        {/* ---------------- NEWS GRID ---------------- */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed rounded-sm border-containment-600 bg-containment-800/20">
            <p className="font-mono text-sm text-alloy-500">NO LOGS FOUND FOR GIVEN PARAMETERS.</p>
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((n, i) => (
                <motion.div
                  layout
                  key={n.id}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                >
                  <TiltCard as="article" className="overflow-hidden corner-frame panel group">
                    <div className="aspect-[16/10] overflow-hidden border-b border-containment-600 relative">
                      <img
                        src={n.cover}
                        alt={n.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2.5 py-0.5 rounded-sm bg-uranium-500/10">
                          {n.tag}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-mono text-alloy-400">
                          <Calendar size={12} className="text-cherenkov-400" />
                          {new Date(n.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <h3 className="mb-3 text-xl font-bold leading-snug transition-colors font-display text-alloy-100 group-hover:text-cherenkov-300">
                        {n.title}
                      </h3>
                      <p className="mb-5 text-sm leading-relaxed text-alloy-300 line-clamp-3 flex-1">
                        {n.excerpt}
                      </p>
                      <Link
                        to={`/news/${n.id}`}
                        className="inline-flex items-center gap-1.5 mt-auto text-xs font-mono uppercase tracking-wider transition-all text-cherenkov-400 hover:gap-2.5 hover:text-cherenkov-300 w-fit"
                      >
                        Access Full Dispatch <ArrowRight size={14} />
                      </Link>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  )
}
