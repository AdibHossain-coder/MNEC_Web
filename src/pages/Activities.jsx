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

      <section className="py-20 container-page lg:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((a, i) => {
            const Icon = iconMap[a.icon] || Atom
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                className="relative flex flex-col p-8 corner-frame panel card-hover"
              >
                {/* Decorative Background Number */}
                <div className="absolute text-5xl font-bold transition-colors pointer-events-none top-4 right-6 font-display text-containment-600/20 group-hover:text-cherenkov-400/10">
                  {(i + 1).toString().padStart(2, '0')}
                </div>

                <div className="relative z-10 flex items-center justify-between mb-6">
                  <Icon 
                    className="transition-transform duration-300 text-cherenkov-400 group-hover:scale-110 group-hover:-translate-y-1" 
                    size={32} 
                    strokeWidth={1.5} 
                  />
                </div>
                
                <div className="relative z-10 flex items-center gap-3 mb-3">
                  <span className="data-label text-uranium-400">{a.category}</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 border font-mono text-[10px] uppercase tracking-wider transition-colors border-containment-600 text-alloy-500 group-hover:border-alloy-500/50">
                    <Repeat size={10} /> {a.frequency}
                  </span>
                </div>
                
                <h3 className="relative z-10 mb-3 text-xl font-semibold transition-colors font-display text-alloy-100 group-hover:text-cherenkov-300">
                  {a.title}
                </h3>
                
                <p className="relative z-10 text-sm leading-relaxed text-alloy-400">
                  {a.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}