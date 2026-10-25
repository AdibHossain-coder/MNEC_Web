import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  Wrench,
  Image as ImageIcon,
  Filter,
  FolderArchive,
  Eye,
  X,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { resources as dummyResources, clubInfo } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

const typeIcon = { PDF: FileText, Tool: Wrench, Image: ImageIcon }

export default function Resources() {
  const { data, usingFallback } = useFirestoreCollection('resources', dummyResources)
  const [category, setCategory] = useState('All')
  const [selectedResource, setSelectedResource] = useState(null)

  const categories = useMemo(() => ['All', ...new Set(data.map((r) => r.category))], [data])
  const filtered = category === 'All' ? data : data.filter((r) => r.category === category)

  const groupedResources =
    category === 'All'
      ? categories
          .filter((c) => c !== 'All')
          .reduce((acc, cat) => {
            const items = data.filter((r) => r.category === cat)
            if (items.length > 0) acc[cat] = items
            return acc
          }, {})
      : { [category]: filtered }

  function handleResourceClick(e, r) {
    if (r.link && r.link.startsWith('http')) {
      return // Allow normal external link navigation
    }
    e.preventDefault()
    setSelectedResource(r)
  }

  function downloadDossierSummary(r) {
    const content = [
      `===================================================================`,
      `${clubInfo.name.toUpperCase()} (${clubInfo.shortName}) — TECHNICAL DOSSIER`,
      `${clubInfo.institution}`,
      `===================================================================`,
      ``,
      `DOCUMENT TITLE : ${r.title}`,
      `CATEGORY       : ${r.category}`,
      `FORMAT / SIZE  : ${r.type} (${r.size})`,
      ``,
      `CLUB MANDATE:`,
      `${clubInfo.charter}`,
      ``,
      `TECHNICAL ABSTRACT & SUMMARY:`,
      `${
        r.summary ||
        'Compiled by the MIST Nuclear Engineering Club executive panel and faculty scholars for MIST students.'
      }`,
      ``,
      `-------------------------------------------------------------------`,
      `Contact Desk: ${clubInfo.email} | ${clubInfo.address}`,
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-mnec.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Career Dossiers · Safety Standards · Lab Manuals"
        title="Technical & Career Resources"
        description="Job seminar compendiums, IAEA nuclear safety digests, lecture notes, and simulation tools curated by MIST scholars and the MNEC executive panel."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-14 container-page lg:py-20">
        {/* ---------------- FILTER ---------------- */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <Filter size={16} className="mr-2 text-alloy-400" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-all duration-300 ${
                category === c
                  ? 'border-cherenkov-400 text-cherenkov-300 bg-cherenkov-400/15 shadow-glow'
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
                  <h2 className="font-mono text-sm tracking-widest uppercase text-alloy-200">
                    {catName}
                  </h2>
                  <div className="flex-1 h-px border-t border-dashed border-containment-600" />
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((r, i) => {
                    const Icon = typeIcon[r.type] || FileText
                    const isExternal = r.link && r.link.startsWith('http')
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                      >
                        <TiltCard className="corner-frame panel group">
                          <a
                            href={isExternal ? r.link : `#${r.id}`}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            onClick={(e) => handleResourceClick(e, r)}
                            className="flex flex-col justify-between p-6 h-full"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex items-center justify-center transition-colors border rounded-sm shrink-0 h-12 w-12 border-containment-600 bg-containment-950/80 text-cherenkov-400 group-hover:border-cherenkov-400/60 group-hover:bg-cherenkov-400/10 group-hover:shadow-glow">
                                <Icon size={22} strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold leading-snug transition-colors text-alloy-100 group-hover:text-cherenkov-300">
                                  {r.title}
                                </p>
                                <p className="mt-1.5 font-mono text-[10px] tracking-wider uppercase text-uranium-400">
                                  {r.type} · {r.size}
                                </p>
                              </div>
                            </div>

                            {r.summary && (
                              <p className="mt-4 text-xs leading-relaxed text-alloy-400 line-clamp-2">
                                {r.summary}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 mt-4 border-t border-containment-600/80 font-mono text-[10px] uppercase tracking-wider text-alloy-400 group-hover:text-cherenkov-300">
                              <span className="flex items-center gap-1.5">
                                {isExternal ? <ExternalLink size={13} /> : <Eye size={13} />}
                                {isExternal ? 'Open External File' : 'Inspect Dossier'}
                              </span>
                              <Download
                                size={15}
                                className="transition-transform group-hover:translate-y-0.5 text-cherenkov-400"
                              />
                            </div>
                          </a>
                        </TiltCard>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------------- RESOURCE DOSSIER MODAL ---------------- */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 12, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl p-6 sm:p-8 corner-frame panel bg-containment-900"
            >
              <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-containment-600">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-uranium-400">
                    {selectedResource.category} · {selectedResource.type} ({selectedResource.size})
                  </span>
                  <h3 className="mt-1 text-2xl font-bold font-display text-alloy-100">
                    {selectedResource.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 rounded-sm border border-containment-600 text-alloy-400 hover:text-alloy-100 hover:border-cherenkov-400"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 mb-6 rounded-sm bg-containment-950/70 border border-containment-600 space-y-3">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-safety">
                  <ShieldCheck size={14} /> Verified by MNEC Academic &amp; Career Desk
                </div>
                <p className="text-sm leading-relaxed text-alloy-200">
                  {selectedResource.summary ||
                    'Reference material compiled for MIST Nuclear Engineering students covering reactor physics, radiation safety standards, and career seminar insights.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="btn-secondary !py-2.5 !px-4"
                >
                  Close
                </button>
                <button
                  onClick={() => downloadDossierSummary(selectedResource)}
                  className="btn-primary !py-2.5 !px-5"
                >
                  <Download size={16} /> Download Summary Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
