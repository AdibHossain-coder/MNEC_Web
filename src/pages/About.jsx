import { motion } from 'framer-motion'
import { Target, Mail, MapPin, ShieldAlert, FlaskConical, Cpu } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { clubInfo } from '../data/dummyData.js'
import ReactorCore from '../components/ReactorCore.jsx'

const focusAreas = [
  {
    icon: FlaskConical,
    title: "Applied Research",
    desc: "Translating theoretical reactor kinetics and fluid dynamics into practical, modeled solutions."
  },
  {
    icon: ShieldAlert,
    title: "Nuclear Safety",
    desc: "Instilling a culture of rigorous safety, radiation protection, and environmental stewardship."
  },
  {
    icon: Cpu,
    title: "Instrumentation",
    desc: "Building physical data acquisition systems and microcontroller-based radiation monitors."
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
}

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow={`Since ${clubInfo.founded || '2016'}`}
        title="About MIST NESC"
        description="The story, the mission, and how to reach the desk."
      />

      {/* ---------------- FOUNDING STORY ---------------- */}
      <section className="py-20 container-page lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={fadeUp}
          >
            <p className="mb-3 eyebrow">Genesis</p>
            <h2 className="mb-8 text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              The Founding Story
            </h2>
            
            {/* Timeline-style text block */}
            <div className="relative pl-6 border-l border-containment-600">
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-cherenkov-400 shadow-glow" />
              <p className="mb-5 text-lg leading-relaxed text-alloy-300">
                {clubInfo.history}
              </p>
              <p className="text-sm leading-relaxed text-alloy-400">
                From our initial core members to our current roster, we have grown into the central hub for technical collaboration, professional networking, and academic excellence within the department.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center w-full max-w-md p-8 mx-auto corner-frame panel"
          >
            <ReactorCore className="w-full aspect-square animate-drift" />
            <div className="absolute bottom-3 right-3 font-mono text-[10px] text-alloy-500 tracking-wider uppercase">
              Simulated Core state
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- MISSION & FOCUS ---------------- */}
      <section className="py-20 border-y border-containment-600 bg-containment-800/40 lg:py-28">
        <div className="container-page">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={fadeUp}
            className="max-w-2xl mx-auto mb-16 text-center"
          >
            <div className="flex justify-center mb-4">
              <Target className="text-cherenkov-400" size={28} strokeWidth={1.5} />
            </div>
            <p className="mb-3 eyebrow">Our Mandate</p>
            <h2 className="mb-6 text-3xl font-bold font-display sm:text-4xl text-alloy-100">Mission & Focus</h2>
            <p className="text-lg leading-relaxed text-alloy-400">{clubInfo.mission}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-8 transition-colors panel hover:border-cherenkov-500/50 group"
                >
                  <div className="inline-flex p-3 mb-5 transition-colors border rounded-sm bg-containment-900 border-containment-600 text-cherenkov-400 group-hover:bg-cherenkov-400/10">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-alloy-100">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-alloy-400">{area.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }} 
            variants={fadeUp}
            className="mb-12"
          >
            <p className="mb-3 eyebrow">Communications</p>
            <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">Reach the Desk</h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            <motion.a
              href={`mailto:${clubInfo.email}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="flex flex-col p-8 transition-all corner-frame panel group hover:border-cherenkov-400/50 hover:bg-containment-800/80"
            >
              <Mail className="mb-5 transition-transform text-cherenkov-400 group-hover:-translate-y-1" size={28} strokeWidth={1.5} />
              <span className="mb-2 data-label">Direct Line</span>
              <h3 className="mb-2 text-xl font-semibold text-alloy-100">Email Us</h3>
              <p className="text-sm transition-colors text-alloy-400 group-hover:text-cherenkov-300">
                {clubInfo.email}
              </p>
            </motion.a>

            <motion.a
              href={`https://maps.google.com/?q=${encodeURIComponent(clubInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="flex flex-col p-8 transition-all corner-frame panel group hover:border-uranium-400/50 hover:bg-containment-800/80"
            >
              <MapPin className="mb-5 transition-transform text-uranium-400 group-hover:-translate-y-1" size={28} strokeWidth={1.5} />
              <span className="mb-2 data-label">Headquarters</span>
              <h3 className="mb-2 text-xl font-semibold text-alloy-100">Find Us</h3>
              <p className="text-sm transition-colors text-alloy-400 group-hover:text-uranium-300">
                {clubInfo.address}
              </p>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}