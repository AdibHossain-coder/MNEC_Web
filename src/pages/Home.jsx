import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Atom,
  Brain,
  ShieldAlert,
  FlaskConical,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Building2,
  Sparkles,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import ReactorCore from '../components/ReactorCore.jsx'
import TiltCard from '../components/TiltCard.jsx'
import {
  clubInfo,
  activities as dummyActivities,
  gallery as dummyGallery,
  news as dummyNews,
} from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'

const iconMap = { Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users }

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

export default function Home() {
  const { data: newsData } = useFirestoreCollection('news', dummyNews, 'date')
  const { data: activities } = useFirestoreCollection('activities', dummyActivities)
  const { data: gallery } = useFirestoreCollection('gallery', dummyGallery)
  const featuredNews = newsData.slice(0, 3)

  return (
    <div>
      {/* ---------------- 3D HYPER-REALISTIC HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-containment-600">
        <div className="absolute inset-0 bg-repeat hex-bg opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-containment-900/65 to-containment-900" />

        {/* Ambient Cherenkov & Uranium Volumetric Light Orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-cherenkov-400/15 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-uranium-400/10 blur-[110px]"
        />

        <div className="relative grid items-center gap-12 py-16 container-page lg:grid-cols-12 lg:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border rounded-full border-cherenkov-400/40 bg-containment-950/70 backdrop-blur-md shadow-glow">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cherenkov-400" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-cherenkov-400" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cherenkov-300">
                  Reactor Core: Critical &amp; Safe
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full border-safety/40 bg-safety/10 backdrop-blur-md">
                <ShieldCheck size={13} className="text-safety" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-safety">
                  Safe Nuclear Energy Advocacy
                </span>
              </div>
            </div>

            <p className="mb-4 eyebrow">
              {clubInfo.institution} · Dept. of Nuclear Science &amp; Engineering
            </p>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold leading-[0.96] text-alloy-100 tracking-tight">
              Safe Nuclear Energy.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherenkov-300 via-cherenkov-400 to-uranium-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                Future-Ready Engineers.
              </span>
            </h1>

            {/* Official Club Charter Highlight Box */}
            <div className="relative mt-7 p-5 sm:p-6 corner-frame panel border-l-4 border-l-cherenkov-400 bg-containment-950/65">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-uranium-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-uranium-300">
                  Official Club Charter — {clubInfo.shortName}
                </span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-alloy-200">
                “{clubInfo.charter}”
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/activities" className="btn-primary">
                Explore Activities &amp; Seminars <ArrowRight size={16} />
              </Link>
              <a href="#career-seminars" className="btn-amber">
                <Briefcase size={16} /> Career &amp; Job Seminars
              </a>
              <Link to="/about" className="btn-secondary">
                About {clubInfo.shortName}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t mt-12 sm:grid-cols-4 border-containment-600">
              {clubInfo.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  custom={i + 1}
                  className="p-3.5 rounded-sm border border-containment-600/80 bg-containment-950/50 hover:border-cherenkov-400/60 hover:shadow-glow transition-all duration-300"
                >
                  <div className="font-mono text-2xl font-bold sm:text-3xl text-cherenkov-300">
                    {s.value}
                  </div>
                  <div className="mt-1 data-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:col-span-5 flex flex-col items-center justify-center p-5 sm:p-6 corner-frame panel bg-containment-950/60"
          >
            <div className="w-full flex items-center justify-between mb-2 pb-2 border-b border-containment-600/80 font-mono text-[10px] text-alloy-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-cherenkov-300">
                <Atom size={13} className="animate-spinSlow" /> 3D VVER-1200 CORE TELEMETRY
              </span>
              <span>INTERACTIVE 3D SIMULATOR</span>
            </div>

            <ReactorCore className="w-full" />

            <div className="w-full mt-3 flex items-center justify-between font-mono text-[10px] text-alloy-500 tracking-wider">
              <span>FIG. 01 — HEXAGONAL PWR FUEL LATTICE</span>
              <span className="text-safety">ALARA SHIELDING: OK</span>
            </div>
          </motion.div>
        </div>

        <a
          href="#mandate"
          className="absolute flex-col items-center hidden gap-1 transition-colors -translate-x-1/2 sm:flex bottom-4 left-1/2 text-alloy-500 hover:text-cherenkov-300"
          aria-label="Scroll to next section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </section>

      {/* ---------------- CORE MANDATE & 3 PILLARS (3D TILT CARDS) ---------------- */}
      <section id="mandate" className="py-20 container-page sm:py-28">
        <div className="max-w-3xl mb-14">
          <p className="mb-3 eyebrow">Our Core Mandate</p>
          <h2 className="mb-4 text-3xl font-bold font-display sm:text-5xl text-alloy-100">
            Three Pillars of <span className="text-cherenkov-400">MIST Nuclear Engineering Club</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-alloy-400">
            Every initiative at {clubInfo.shortName} is engineered around student passion for Nuclear
            Engineering at MIST, promoting awareness for the safe use of nuclear energy, and unlocking
            career opportunities through scholar-led job seminars.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {clubInfo.pillars.map((pillar, i) => {
            const icons = [Atom, ShieldCheck, Briefcase]
            const Icon = icons[i] || Atom
            const accentColor =
              pillar.accent === 'uranium'
                ? 'text-uranium-400 border-uranium-400/30 bg-uranium-400/10'
                : pillar.accent === 'safety'
                ? 'text-safety border-safety/30 bg-safety/10'
                : 'text-cherenkov-400 border-cherenkov-400/30 bg-cherenkov-400/10'

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard
                  accent={pillar.accent}
                  className="p-7 sm:p-8 corner-frame panel"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-sm border ${accentColor}`}>
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-alloy-400">
                      {pillar.code}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-wider text-cherenkov-400 mb-1.5">
                    {pillar.subtitle}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold font-display text-alloy-100">
                    {pillar.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-alloy-300 flex-1">
                    {pillar.description}
                  </p>

                  <div className="pt-4 mt-auto border-t border-containment-600/80 flex items-center justify-between font-mono text-[11px] text-alloy-400">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-alloy-200 font-semibold">{pillar.metric}</span>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ---------------- CAREER & JOB SEMINARS SHOWCASE ---------------- */}
      <section
        id="career-seminars"
        className="relative py-20 border-y border-containment-600 bg-containment-950/70 sm:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-repeat hex-bg opacity-40 pointer-events-none" />
        <div className="relative container-page">
          <div className="grid gap-10 lg:grid-cols-12 items-end mb-14">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border rounded-full border-uranium-400/40 bg-uranium-400/10">
                <GraduationCap size={14} className="text-uranium-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-uranium-300">
                  MIST Scholars × Educational &amp; Professional Organizations
                </span>
              </div>
              <h2 className="text-3xl font-bold font-display sm:text-5xl text-alloy-100">
                Exploring Job Opportunities in{' '}
                <span className="text-uranium-400">Nuclear Engineering</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-alloy-300 max-w-3xl">
                We organize dedicated career and job seminars conducted by scholars of MIST alongside
                leading national and international nuclear organizations—connecting students directly to
                reactor engineering, radiation safety, regulatory, and global research careers.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link to="/alumni" className="btn-amber">
                Meet Alumni in the Sector <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {clubInfo.careerSeminars.map((seminar, i) => (
              <motion.div
                key={seminar.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <TiltCard accent="uranium" className="p-7 corner-frame panel">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded-sm border border-uranium-400/40 bg-uranium-400/10 text-uranium-300">
                      {seminar.badge}
                    </span>
                    <span className="font-mono text-xs text-alloy-500">0{i + 1}</span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold font-display text-alloy-100">
                    {seminar.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-alloy-300 flex-1">
                    {seminar.topic}
                  </p>

                  <div className="p-3.5 rounded-sm bg-containment-950/70 border border-containment-600 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-alloy-200">
                      <GraduationCap size={15} className="text-cherenkov-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-mono text-[10px] uppercase text-alloy-400 block">
                          Conducted By:
                        </strong>
                        {seminar.speakers}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-alloy-300">
                      <Building2 size={15} className="text-uranium-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-mono text-[10px] uppercase text-alloy-400 block">
                          Partner Organizations:
                        </strong>
                        {seminar.organization}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ACTIVITIES & SAFE NUCLEAR ENERGY PROGRAMS ---------------- */}
      <section className="py-20 container-page sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="mb-3 eyebrow">Activities &amp; Outreach</p>
            <h2 className="max-w-2xl text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              Dedicated to Safe Nuclear Energy &amp; Technical Mastery
            </h2>
          </div>
          <Link
            to="/activities"
            className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2"
          >
            See all activities <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.slice(0, 6).map((a, i) => {
            const Icon = iconMap[a.icon] || Atom
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <TiltCard
                  accent={i % 3 === 1 ? 'safety' : i % 3 === 0 ? 'uranium' : 'cherenkov'}
                  className="p-6 corner-frame panel group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-sm border border-containment-600 bg-containment-950/70 text-cherenkov-400 group-hover:border-cherenkov-400/50 group-hover:shadow-glow transition-all">
                      <Icon
                        className="transition-transform duration-300 group-hover:scale-110"
                        size={24}
                        strokeWidth={1.6}
                      />
                    </div>
                    <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border border-containment-600 rounded-sm text-alloy-400">
                      {a.frequency}
                    </span>
                  </div>
                  <span className="data-label text-uranium-400 mb-1">{a.category}</span>
                  <h3 className="mb-2 text-lg font-bold font-display text-alloy-100 group-hover:text-cherenkov-300 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-alloy-300">{a.description}</p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ---------------- LATEST NEWS ---------------- */}
      <section className="py-20 border-t border-containment-600 bg-containment-800/30 sm:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="mb-3 eyebrow">Bulletin</p>
              <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">
                Seminars, Safety Drives &amp; Department Dispatches
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2"
            >
              All news <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredNews.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <TiltCard className="overflow-hidden corner-frame panel group">
                  <Link to={`/news/${n.id}`} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-containment-600">
                      <img
                        src={n.cover}
                        alt={n.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider text-uranium-300 bg-slate-950/85 border border-uranium-400/40 px-2.5 py-0.5 rounded-sm">
                        {n.tag}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-2.5 text-xs text-alloy-400 font-mono">
                        <Calendar size={12} className="text-cherenkov-400" />
                        {new Date(n.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <h3 className="mb-2.5 text-lg font-bold leading-snug transition-colors font-display text-alloy-100 group-hover:text-cherenkov-300">
                        {n.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-alloy-400 line-clamp-3 flex-1">
                        {n.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-5 text-xs font-mono uppercase tracking-wider text-cherenkov-300 group-hover:translate-x-1 transition-transform">
                        Read Full Dispatch <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY STRIP ---------------- */}
      <section className="py-20 overflow-hidden border-t border-containment-600 bg-containment-950/60 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 container-page">
          <div>
            <p className="mb-3 eyebrow">Visual Telemetry</p>
            <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              Moments from Job Seminars, Labs &amp; Safety Drives
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2"
          >
            Full gallery <ChevronRight size={16} />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.4 } }}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          loop={gallery.length > 4}
          className="container-page !overflow-visible"
        >
          {gallery.map((g) => (
            <SwiperSlide key={g.id}>
              <Link
                to="/gallery"
                className="relative block aspect-[4/5] overflow-hidden corner-frame panel group"
              >
                <img
                  src={g.url}
                  alt={g.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-cyan-300 px-2 py-0.5 rounded-sm bg-slate-950/70 border border-cyan-400/30 w-fit">
                    {g.album}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{g.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---------------- 3D CTA ---------------- */}
      <section className="py-20 container-page sm:py-28">
        <TiltCard intensity={5} className="p-10 overflow-hidden text-center corner-frame panel sm:p-16">
          <div className="absolute inset-0 bg-repeat pointer-events-none hex-bg opacity-35" />
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-cherenkov-400/25 animate-pulseCore blur-sm" />
              <Atom className="relative text-cherenkov-400 animate-spinSlow" size={44} strokeWidth={1.4} />
            </div>
            <h2 className="mb-4 text-3xl font-bold font-display sm:text-5xl text-alloy-100">
              Interested in Nuclear Engineering at MIST?
            </h2>
            <p className="mb-8 text-base sm:text-lg leading-relaxed text-alloy-300">
              Join the <strong className="text-alloy-100">{clubInfo.name} ({clubInfo.shortName})</strong>{' '}
              to champion the safe use of nuclear energy, build reactor simulations, and attend career
              seminars with scholars of MIST and partner organizations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href={`mailto:${clubInfo.email}`} className="btn-primary">
                Connect with {clubInfo.shortName} <ArrowRight size={16} />
              </a>
              <Link to="/activities" className="btn-amber">
                View Upcoming Seminars
              </Link>
              <Link to="/about" className="btn-secondary">
                Read Our Charter
              </Link>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-alloy-400">
              Open to all MIST students interested in Nuclear Engineering · Safety First
            </p>
          </div>
        </TiltCard>
      </section>
    </div>
  )
}
