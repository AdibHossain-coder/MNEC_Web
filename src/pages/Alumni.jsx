import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { alumni as dummyAlumni } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

export default function Alumni() {
  const { data, usingFallback } = useFirestoreCollection('alumni', dummyAlumni)

  // Group alumni by batch
  const groupedAlumni = data.reduce((acc, p) => {
    const batch = p.batch || 'Various'
    if (!acc[batch]) acc[batch] = []
    acc[batch].push(p)
    return acc
  }, {})

  // Sort batches in descending order
  const sortedBatches = Object.keys(groupedAlumni).sort((a, b) => b.localeCompare(a))

  return (
    <div>
      <PageHeader
        eyebrow="Legacy"
        title="Distinguished Alumni"
        description="Former executives and members now working across research, industry, and regulation — proof the network outlasts the degree."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-20 container-page lg:py-28">
        {sortedBatches.map((batch, batchIdx) => (
          <div key={batch} className="mb-16 last:mb-0">
            {/* Batch Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 border rounded-sm shadow-sm bg-containment-900/50 border-containment-600 text-alloy-300 backdrop-blur-sm">
                <GraduationCap size={16} className="text-cherenkov-400" />
                <h2 className="font-mono text-sm tracking-widest uppercase">{batch}</h2>
              </div>
              <div className="flex-1 h-px border-t border-dashed border-containment-600" />
            </div>

            {/* Profile Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupedAlumni[batch].map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                  className="relative flex gap-5 p-6 corner-frame panel card-hover"
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 transition-opacity duration-300 rounded-sm opacity-0 bg-cherenkov-400 blur-md group-hover:opacity-20" />
                    <img 
                      src={p.photo} 
                      alt={p.name} 
                      className="relative object-cover w-16 h-16 transition-colors border-2 rounded-sm border-containment-600 group-hover:border-cherenkov-400/50" 
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold leading-tight transition-colors text-alloy-100 group-hover:text-cherenkov-300">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 font-mono text-[10px] tracking-widest uppercase text-cherenkov-400">
                      {p.role}
                    </p>
                    <p className="flex items-start gap-2 mt-3 text-sm leading-snug text-alloy-400">
                      <Briefcase size={14} className="mt-0.5 shrink-0 text-uranium-400" />
                      <span className="line-clamp-2">{p.current}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}