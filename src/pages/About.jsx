import { motion } from 'framer-motion'
import {
  Target,
  Mail,
  MapPin,
  ShieldCheck,
  FlaskConical,
  Briefcase,
  GraduationCap,
  Building2,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { clubInfo } from '../data/dummyData.js'
import ReactorCore from '../components/ReactorCore.jsx'
import TiltCard from '../components/TiltCard.jsx'

const focusAreas = [
  {
    icon: FlaskConical,
    accent: 'cherenkov',
    title: 'Nuclear Engineering Student Community',
    desc: 'Uniting MIST students interested in Nuclear Engineering through hands-on reactor physics simulations, radiation detection labs, and inter-university competitions.',
  },
  {
    icon: ShieldCheck,
    accent: 'safety',
    title: 'Safe Use of Nuclear Energy Awareness',
    desc: 'Every club activity is dedicated to creating public and academic awareness around radiation protection, ALARA principles, defence-in-depth reactor design, and safe clean baseload nuclear power.',
  },
  {
    icon: Briefcase,
    accent: 'uranium',
    title: 'Job Seminars with MIST Scholars & Industry',
    desc: 'Exploring career opportunities for MIST students by organizing job seminars conducted by scholars of MIST and partner educational & professional organizations (BAEC, Rooppur NPP, NINMAS, IAEA).',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
}

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow={`Est. ${clubInfo.founded || '2016'} · MIST NSE`}
        title={`About ${clubInfo.name} (${clubInfo.shortName})`}
        description="Dedicated to students interested in Nuclear Engineering at MIST — championing the safe use of nuclear energy and connecting students with career opportunities through scholar-led job seminars."
      />

      {/* ---------------- OFFICIAL CHARTER & STORY ---------------- */}
      <section className="py-20 container-page lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <p className="mb-3 eyebrow">Genesis &amp; Official Charter</p>
            <h2 className="mb-6 text-3xl font-bold font-display sm:text-5xl text-alloy-100">
              Advancing Safe Nuclear Energy &amp; Student Careers at MIST
            </h2>

            {/* Official Charter Quote Card */}
            <div className="p-6 mb-8 corner-frame panel border-l-4 border-l-cherenkov-400">
              <span className="block mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cherenkov-400">
                Founding Constitutional Mandate
              </span>
              <p className="text-base sm:text-lg font-medium leading-relaxed text-alloy-100">
                “{clubInfo.charter}”
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-containment-600 space-y-4">
              <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-cherenkov-400 shadow-glow" />
              <p className="text-base leading-relaxed text-alloy-300">{clubInfo.history}</p>
              <p className="text-sm leading-relaxed text-alloy-400">
                By combining rigorous safety education with career seminars featuring MIST faculty scholars,
                BAEC scientists, Rooppur Nuclear Power Plant (NPCBL) engineers, and international fellows,
                {` ${clubInfo.shortName} `}prepares MIST students to lead Bangladesh&apos;s nuclear era safely and
                responsibly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-5 flex flex-col items-center justify-center w-full p-6 mx-auto corner-frame panel"
          >
            <ReactorCore className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* ---------------- MISSION & THREE FOCUS PILLARS ---------------- */}
      <section className="py-20 border-y border-containment-600 bg-containment-800/40 lg:py-28">
        <div className="container-page">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full border border-cherenkov-400/40 bg-cherenkov-400/10 shadow-glow">
                <Target className="text-cherenkov-400" size={28} strokeWidth={1.5} />
              </div>
            </div>
            <p className="mb-3 eyebrow">Our Mandate</p>
            <h2 className="mb-5 text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              Mission, Safety Awareness &amp; Career Exploration
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-alloy-300">{clubInfo.mission}</p>
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
                >
                  <TiltCard accent={area.accent} className="p-8 corner-frame panel group">
                    <div className="inline-flex p-3.5 mb-5 transition-colors border rounded-sm bg-containment-950/70 border-containment-600 text-cherenkov-400 group-hover:border-cherenkov-400/60 group-hover:bg-cherenkov-400/10 w-fit">
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold font-display text-alloy-100">
                      {area.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-alloy-300">{area.desc}</p>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- JOB SEMINAR COLLABORATION NETWORK ---------------- */}
      <section className="py-20 border-b border-containment-600 lg:py-24">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <p className="mb-3 eyebrow">Career &amp; Job Seminar Ecosystem</p>
            <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              Scholars of MIST &amp; Partner Organizations
            </h2>
            <p className="mt-3 text-alloy-400">
              Our job seminars bring together academic scholars and industry pioneers to mentor MIST students on
              real-world nuclear engineering career tracks.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {clubInfo.careerSeminars.map((cs, idx) => (
              <TiltCard key={cs.id} accent="uranium" className="p-6 corner-frame panel">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-uranium-400/30 bg-uranium-400/10 text-uranium-300 rounded-sm">
                    {cs.badge}
                  </span>
                  <span className="font-mono text-xs text-alloy-500">SEMINAR 0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-alloy-100 mb-2">{cs.title}</h3>
                <p className="text-sm text-alloy-300 leading-relaxed mb-4 flex-1">{cs.topic}</p>
                <div className="pt-3 border-t border-containment-600 space-y-1.5 text-xs text-alloy-400">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-cherenkov-400 shrink-0" />
                    <span className="truncate">{cs.speakers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-uranium-400 shrink-0" />
                    <span className="truncate">{cs.organization}</span>
                  </div>
                </div>
              </TiltCard>
            ))}
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
            <TiltCard accent="cherenkov" className="corner-frame panel group">
              <a href={`mailto:${clubInfo.email}`} className="flex flex-col p-8 h-full">
                <Mail
                  className="mb-5 transition-transform text-cherenkov-400 group-hover:-translate-y-1"
                  size={30}
                  strokeWidth={1.5}
                />
                <span className="mb-2 data-label">Direct Line</span>
                <h3 className="mb-2 text-xl font-bold font-display text-alloy-100">Email Us</h3>
                <p className="text-sm transition-colors text-alloy-300 group-hover:text-cherenkov-300">
                  {clubInfo.email}
                </p>
              </a>
            </TiltCard>

            <TiltCard accent="uranium" className="corner-frame panel group">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(clubInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col p-8 h-full"
              >
                <MapPin
                  className="mb-5 transition-transform text-uranium-400 group-hover:-translate-y-1"
                  size={30}
                  strokeWidth={1.5}
                />
                <span className="mb-2 data-label">Headquarters</span>
                <h3 className="mb-2 text-xl font-bold font-display text-alloy-100">Find Us</h3>
                <p className="text-sm transition-colors text-alloy-300 group-hover:text-uranium-300">
                  {clubInfo.address}
                </p>
              </a>
            </TiltCard>
          </div>
        </div>
      </section>
    </div>
  )
}
