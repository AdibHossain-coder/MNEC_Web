import { motion } from 'framer-motion'
import {
  Atom,
  Brain,
  ShieldAlert,
  FlaskConical,
  MapPin,
  Users,
  Repeat,
  ShieldCheck,
  Briefcase,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DemoBanner from '../components/DemoBanner.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { activities as dummyActivities, clubInfo } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

const iconMap = { Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users }

export default function Activities() {
  const { data, usingFallback } = useFirestoreCollection('activities', dummyActivities)

  return (
    <div>
      <PageHeader
        eyebrow="Safety Awareness · Job Seminars · Technical Labs"
        title="Activities & Programs"
        description="Every activity of the MIST Nuclear Engineering Club is dedicated to creating awareness for the safe use of nuclear energy and exploring job opportunities for MIST students through scholar and industry seminars."
      />
      <DemoBanner usingFallback={usingFallback} />

      <section className="py-20 container-page lg:py-28">
        {/* Highlight Banner for Safe Nuclear Energy & Job Seminars */}
        <div className="grid gap-6 mb-14 lg:grid-cols-2">
          <div className="p-6 corner-frame panel border-l-4 border-l-safety flex items-start gap-4">
            <div className="p-3 rounded-sm bg-safety/15 border border-safety/30 text-safety shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-safety">
                Core Activity Mandate I
              </span>
              <h2 className="text-xl font-bold font-display text-alloy-100 mt-1">
                Promoting Safe Use of Nuclear Energy
              </h2>
              <p className="text-sm text-alloy-300 mt-2 leading-relaxed">
                Each of our club&apos;s activities is dedicated to creating awareness to promote the safe use of
                Nuclear Energy—covering radiation protection, reactor defence-in-depth, and public literacy.
              </p>
            </div>
          </div>

          <div className="p-6 corner-frame panel border-l-4 border-l-uranium-400 flex items-start gap-4">
            <div className="p-3 rounded-sm bg-uranium-400/15 border border-uranium-400/30 text-uranium-400 shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-uranium-300">
                Core Activity Mandate II
              </span>
              <h2 className="text-xl font-bold font-display text-alloy-100 mt-1">
                Job Seminars by MIST Scholars &amp; Partner Orgs
              </h2>
              <p className="text-sm text-alloy-300 mt-2 leading-relaxed">
                Exploring job opportunities for MIST students in Nuclear Engineering through career seminars
                conducted by scholars of MIST and relevant educational &amp; professional organizations.
              </p>
            </div>
          </div>
        </div>

        {/* 3D Activity Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((a, i) => {
            const Icon = iconMap[a.icon] || Atom
            const accent = i % 3 === 1 ? 'safety' : i % 3 === 0 ? 'uranium' : 'cherenkov'
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
              >
                <TiltCard accent={accent} className="p-8 corner-frame panel group">
                  {/* Decorative Background Number */}
                  <div className="absolute text-5xl font-bold transition-colors pointer-events-none top-4 right-6 font-display text-containment-600/30 group-hover:text-cherenkov-400/15">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-sm border border-containment-600 bg-containment-950/70 text-cherenkov-400 group-hover:border-cherenkov-400/60 group-hover:shadow-glow transition-all">
                      <Icon
                        className="transition-transform duration-300 group-hover:scale-110"
                        size={28}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 mb-3">
                    <span className="data-label text-uranium-400">{a.category}</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 border font-mono text-[10px] uppercase tracking-wider transition-colors border-containment-600 text-alloy-400 group-hover:border-cherenkov-400/40">
                      <Repeat size={10} /> {a.frequency}
                    </span>
                  </div>

                  <h3 className="relative z-10 mb-3 text-xl font-bold transition-colors font-display text-alloy-100 group-hover:text-cherenkov-300">
                    {a.title}
                  </h3>

                  <p className="relative z-10 text-sm leading-relaxed text-alloy-300 flex-1">
                    {a.description}
                  </p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
