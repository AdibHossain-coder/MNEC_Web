import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Search } from 'lucide-react'
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

      <div className="container-page py-14">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  tag === t
                    ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10'
                    : 'border-containment-600 text-alloy-400 hover:border-alloy-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-alloy-500" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news…"
              className="w-full bg-containment-800 border border-containment-600 rounded-sm pl-9 pr-3 py-2 text-sm text-alloy-100 placeholder:text-alloy-500 focus:border-cherenkov-400 outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-alloy-400 text-center py-16">No entries match that filter yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n, i) => (
              <motion.article
                key={n.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="panel overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={n.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2 py-0.5">{n.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-alloy-500">
                      <Calendar size={12} />
                      {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-alloy-100 leading-snug mb-2">{n.title}</h3>
                  <p className="text-sm text-alloy-400 leading-relaxed line-clamp-3 mb-4">{n.excerpt}</p>
                  <Link
                    to={`/news/${n.id}`}
                    className="mt-auto inline-flex items-center gap-1 text-cherenkov-300 text-sm font-medium hover:gap-2 transition-all"
                  >
                    Read full story <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
