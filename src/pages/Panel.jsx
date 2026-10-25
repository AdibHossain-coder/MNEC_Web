import { motion } from 'framer-motion'
import { ShieldCheck, Award } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { panel } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

function PersonCard({ person, i, accent = 'cherenkov' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
    >
      <TiltCard accent={accent} className="overflow-hidden text-center corner-frame panel group">
        <div className="relative aspect-square overflow-hidden border-b border-containment-600">
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-bold font-display text-alloy-100 group-hover:text-cherenkov-300 transition-colors">
            {person.name}
          </h3>
          <p
            className={`text-xs font-mono uppercase tracking-wider mt-1.5 ${
              accent === 'uranium' ? 'text-uranium-400' : 'text-cherenkov-400'
            }`}
          >
            {person.role}
          </p>
          {person.batch && (
            <p className="text-xs font-mono text-alloy-400 mt-1.5 px-2 py-0.5 rounded-sm bg-containment-950/60 border border-containment-600 w-fit mx-auto">
              {person.batch}
            </p>
          )}
          {person.dept && <p className="text-xs text-alloy-400 mt-1.5">{person.dept}</p>}
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Panel() {
  const { data: executives, usingFallback: execFallback } = useFirestoreCollection(
    'panel_executives',
    panel.executives
  )
  const { data: advisors, usingFallback: advFallback } = useFirestoreCollection(
    'panel_advisors',
    panel.advisors
  )

  return (
    <div>
      <PageHeader
        eyebrow="Faculty Scholars & Student Leadership"
        title="The Executive Panel"
        description="The MIST faculty scholars and student executives steering MNEC's safe nuclear energy campaigns, job seminars, and technical workshops."
      />
      <DemoBanner usingFallback={execFallback || advFallback} />

      <div className="container-page py-16 lg:py-24">
        <div className="flex items-center gap-3 mb-8">
          <Award size={18} className="text-uranium-400" />
          <h2 className="eyebrow !text-uranium-400">Faculty Advisors &amp; MIST Scholars</h2>
          <div className="flex-1 h-px border-t border-dashed border-containment-600" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advisors.map((p, i) => (
            <PersonCard key={p.id} person={p} i={i} accent="uranium" />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck size={18} className="text-cherenkov-400" />
          <h2 className="eyebrow">Student Executive Committee</h2>
          <div className="flex-1 h-px border-t border-dashed border-containment-600" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executives.map((p, i) => (
            <PersonCard key={p.id} person={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
