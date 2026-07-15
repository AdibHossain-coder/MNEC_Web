import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Wrench, Image as ImageIcon, Filter, FolderArchive } from 'lucide-react'
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

  // Group resources by category for visual hierarchy
  const groupedResources = category === 'All' 
    ? categories.filter(c => c !== 'All').reduce((acc, cat) => {
        const items = data.filter(r => r.category === cat)
        if (items.length > 0) acc[cat] = items
        return acc
      }, {})
    : { [category]: filtered }

  return (
    <div>
      <PageHeader
        eyebrow="Study Materials"
        title="Resources"
        description="Lecture notes, lab manuals, and internal tools compiled by the panel — pulled from real coursework where possible."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER ---------------- */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <Filter size={16} className="mr-2 text-alloy-500" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-all duration-300 ${
                category === c
                  ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/10 shadow-glow'
                  : 'border-containment-600 text-alloy-400 hover:border-alloy-300 hover:bg-containment-700/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ---------------- RESOURCE GRID ---------------- */}
        {Object.keys(groupedResources).length === 0 ? (
           <div className="py-20 text-center border border-dashed rounded-sm border-containment-600 bg-containment-800/20">
             <p className="font-mono text-sm text-alloy-500">NO RESOURCES FOUND.</p>
           </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedResources).map(([catName, items]) => (
              <div key={catName}>
                <div className="flex items-center gap-3 mb-6">
                  <FolderArchive size={18} className="text-uranium-400" />
                  <h3 className="font-mono text-sm tracking-widest uppercase text-alloy-300">{catName}</h3>
                  <div className="flex-1 h-px border-t border-dashed border-containment-600" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((r, i) => {
                    const Icon = typeIcon[r.type] || FileText
                    return (
                      <motion.a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={r.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                        className="flex items-start gap-4 p-5 corner-frame panel card-hover group"
                      >
                        <div className="flex items-center justify-center transition-colors border rounded-sm shrink-0 h-11 w-11 border-containment-600 bg-containment-900 text-cherenkov-400 group-hover:border-cherenkov-400/50 group-hover:bg-cherenkov-400/10">
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="font-medium truncate transition-colors text-alloy-100 group-hover:text-cherenkov-300">{r.title}</p>
                          <p className="mt-1.5 font-mono text-[10px] tracking-wider uppercase text-alloy-500">
                            {r.type} · {r.size}
                          </p>
                        </div>
                        <Download size={18} className="transition-colors text-alloy-600 group-hover:text-cherenkov-400 shrink-0" strokeWidth={1.5} />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}