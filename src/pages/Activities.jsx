import { motion } from 'framer-motion'
import { Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users, Repeat } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import { activities as dummyActivities } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

const iconMap = { Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users }

export default function Activities() {
  const { data, usingFallback } = useFirestoreCollection('activities', dummyActivities)

  return (
    <div>
      <PageHeader
        eyebrow="What We Run"
        title="Activities & Programs"
        description="From weekly quiz drills to biannual research symposiums — a full-year calendar built around the department's rhythm."
      />
      <DemoBanner usingFallback={usingFallback} />

      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((a, i) => {
          const Icon = iconMap[a.icon] || Atom
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="corner-frame panel p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <Icon className="text-cherenkov-400" size={28} strokeWidth={1.5} />
                <span className="text-[10px] font-mono uppercase tracking-wider text-alloy-500 border border-containment-600 px-2 py-1 flex items-center gap-1">
                  <Repeat size={10} /> {a.frequency}
                </span>
              </div>
              <span className="data-label text-uranium-400 mb-2">{a.category}</span>
              <h3 className="font-display text-xl font-semibold text-alloy-100 mb-2">{a.title}</h3>
              <p className="text-sm text-alloy-400 leading-relaxed">{a.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
