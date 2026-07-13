import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { panel } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

function PersonCard({ person, i, accent = 'cherenkov' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
      className="panel overflow-hidden group text-center"
    >
      <div className="aspect-square overflow-hidden">
        <img src={person.photo} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-alloy-100">{person.name}</h3>
        <p className={`text-xs font-mono uppercase tracking-wider mt-1 ${accent === 'uranium' ? 'text-uranium-400' : 'text-cherenkov-400'}`}>
          {person.role}
        </p>
        {person.batch && <p className="text-xs text-alloy-500 mt-1">{person.batch}</p>}
        {person.dept && <p className="text-xs text-alloy-500 mt-1">{person.dept}</p>}
      </div>
    </motion.div>
  )
}

export default function Panel() {
  const { data: executives, usingFallback } = useFirestoreCollection('panel_executives', panel.executives)
  const { data: advisors } = useFirestoreCollection('panel_advisors', panel.advisors)

  return (
    <div>
      <PageHeader
        eyebrow="Leadership"
        title="The Executive Panel"
        description="The students and faculty steering MIST NESC's calendar, budget, and technical direction this term."
      />
      <DemoBanner usingFallback={usingFallback} />

      <div className="container-page py-16">
        <h2 className="eyebrow mb-6">Faculty Advisors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
          {advisors.map((p, i) => (
            <PersonCard key={p.id} person={p} i={i} accent="uranium" />
          ))}
        </div>

        <h2 className="eyebrow mb-6">Executive Committee</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {executives.map((p, i) => (
            <PersonCard key={p.id} person={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
