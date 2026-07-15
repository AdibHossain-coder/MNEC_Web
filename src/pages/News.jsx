import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { news as dummyNews } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

export default function News() {
  const { data, usingFallback } = useFirestoreCollection('news', dummyNews, 'date')
  const [tag, setTag] = useState('All')
  const [search, setSearch] = useState('')

  const tags = useMemo(() => ['All', ...new Set(data.map((n) => n.tag))], [data])

  const filtered = data.filter((n) => {
    const matchesTag = tag === 'All' || n.tag === tag
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div>
      <PageHeader
        eyebrow="Bulletin"
        title="News & Announcements"
        description="Updates from workshops, competitions, and the department — straight from the executive panel."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER & SEARCH BAR ---------------- */}
        <div className="flex flex-col gap-5 mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={16} className="mr-2 text-alloy-500" />
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-all duration-300 ${
                  tag === t
                    ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10 shadow-glow'
                    : 'border-containment-600 text-alloy-400 hover:border-alloy-300 hover:bg-containment-700/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="relative w-full group sm:w-72">
            <Search className="absolute transition-colors -translate-y-1/2 left-3 top-1/2 text-alloy-500 group-focus-within:text-cherenkov-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search database..."
              className="w-full py-2.5 pl-10 pr-4 text-sm transition-colors border rounded-sm bg-containment-900/50 border-containment-600 text-alloy-100 placeholder:text-alloy-600 focus:border-cherenkov-400 focus:bg-containment-800 outline-none"
            />
          </div>
        </div>

        {/* ---------------- NEWS GRID ---------------- */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed rounded-sm border-containment-600 bg-containment-800/20">
            <p className="font-mono text-sm text-alloy-500">NO LOGS FOUND FOR GIVEN PARAMETERS.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n, i) => (
              <motion.article
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                className="relative flex flex-col overflow-hidden corner-frame panel card-hover group"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-containment-600 relative">
                  <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 pointer-events-none bg-cherenkov-400/10 group-hover:opacity-100" />
                  <img 
                    src={n.cover} 
                    alt={n.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2 py-0.5 rounded-sm bg-uranium-500/5">
                      {n.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-alloy-500">
                      <Calendar size={12} />
                      {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold leading-snug transition-colors text-alloy-100 group-hover:text-cherenkov-300">
                    {n.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-alloy-400 line-clamp-3">
                    {n.excerpt}
                  </p>
                  <Link
                    to={`/news/${n.id}`}
                    className="inline-flex items-center gap-1 mt-auto text-sm font-medium transition-all text-cherenkov-400 hover:gap-2 hover:text-cherenkov-300 w-fit"
                  >
                    Access Log <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}