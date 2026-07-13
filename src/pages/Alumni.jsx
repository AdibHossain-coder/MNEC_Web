import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { alumni as dummyAlumni } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

export default function Alumni() {
  const { data, usingFallback } = useFirestoreCollection('alumni', dummyAlumni)

  return (
    <div>
      <PageHeader
        eyebrow="Legacy"
        title="Distinguished Alumni"
        description="Former executives and members now working across research, industry, and regulation — proof the network outlasts the degree."
      />
      <DemoBanner usingFallback={usingFallback} />

      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 9) * 0.05 }}
            className="panel p-5 flex gap-4"
          >
            <img src={p.photo} alt={p.name} className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-containment-600" />
            <div>
              <h3 className="font-semibold text-alloy-100">{p.name}</h3>
              <p className="text-xs font-mono text-cherenkov-400 uppercase tracking-wider mt-1">{p.batch} · {p.role}</p>
              <p className="text-sm text-alloy-400 mt-2 flex items-start gap-1.5">
                <Briefcase size={13} className="mt-0.5 shrink-0 text-uranium-400" />
                {p.current}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
