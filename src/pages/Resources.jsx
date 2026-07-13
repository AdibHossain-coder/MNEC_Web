import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Wrench, Image as ImageIcon } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { resources as dummyResources } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

const typeIcon = { PDF: FileText, Tool: Wrench, Image: ImageIcon }

export default function Resources() {
  const { data, usingFallback } = useFirestoreCollection('resources', dummyResources)
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(data.map((r) => r.category))], [data])
  const filtered = category === 'All' ? data : data.filter((r) => r.category === category)

  return (
    <div>
      <PageHeader
        eyebrow="Study Materials"
        title="Resources"
        description="Lecture notes, lab manuals, and internal tools compiled by the panel — pulled from real coursework where possible."
      />
      <DemoBanner usingFallback={usingFallback} />

      <div className="container-page py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                category === c
                  ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10'
                  : 'border-containment-600 text-alloy-400 hover:border-alloy-500'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="divide-y divide-containment-600 border-y border-containment-600">
          {filtered.map((r, i) => {
            const Icon = typeIcon[r.type] || FileText
            return (
              <motion.a
                href={r.link}
                key={r.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
                className="flex items-center gap-4 py-4 px-2 hover:bg-containment-800/60 transition-colors group"
              >
                <div className="h-11 w-11 shrink-0 flex items-center justify-center border border-containment-600 text-cherenkov-400 group-hover:border-cherenkov-400">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-alloy-100 font-medium truncate">{r.title}</p>
                  <p className="text-xs text-alloy-500 font-mono mt-0.5">{r.category} · {r.type} · {r.size}</p>
                </div>
                <Download size={16} className="text-alloy-500 group-hover:text-cherenkov-300 shrink-0" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
