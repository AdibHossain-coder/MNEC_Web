import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users,
  Calendar, ChevronRight,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import ReactorCore from '../components/ReactorCore.jsx'
import { clubInfo, activities, gallery } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'
import { news as dummyNews } from '../data/dummyData.js'

const iconMap = { Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users }

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

export default function Home() {
  const { data: newsData } = useFirestoreCollection('news', dummyNews, 'date')
  const featuredNews = newsData.slice(0, 3)

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-containment-600">
        <div className="absolute inset-0 hex-bg bg-repeat opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-containment-900/60 to-containment-900" />

        <div className="container-page relative grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <p className="eyebrow mb-5">{clubInfo.institution} · Dept. of Nuclear Science &amp; Engineering</p>
            <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold leading-[0.95] text-alloy-100 tracking-tight">
              Critical mass,<br />
              <span className="text-cherenkov-400">not critical mess.</span>
            </h1>
            <p className="mt-6 text-alloy-400 text-lg leading-relaxed max-w-lg">
              {clubInfo.name} is where MIST's nuclear science students turn coursework into
              reactor models, quiz trophies, and a network that follows you past graduation.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/activities" className="btn-primary">
                Explore Activities <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Who We Are
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-containment-600 pt-8">
              {clubInfo.stats.map((s, i) => (
                <motion.div key={s.label} initial="hidden" animate="show" variants={fadeUp} custom={i + 1}>
                  <div className="font-mono text-2xl sm:text-3xl font-semibold text-cherenkov-300">{s.value}</div>
                  <div className="data-label mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <ReactorCore className="w-full max-w-md aspect-square animate-drift" />
            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-alloy-500 tracking-wider">
              FIG. 01 — FUEL ASSEMBLY LATTICE, SCHEMATIC
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- IDENTITY ---------------- */}
      <section className="container-page py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="eyebrow mb-3">Our Identity</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-alloy-100 mb-5">
              More than a study group.
            </h2>
            <p className="text-alloy-400 leading-relaxed">{clubInfo.history}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="corner-frame panel p-6"
            >
              <span className="data-label text-cherenkov-400">§ 01 — Mission</span>
              <p className="mt-3 text-sm text-alloy-300 leading-relaxed">{clubInfo.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="corner-frame panel p-6"
            >
              <span className="data-label text-uranium-400">§ 02 — Founded {clubInfo.founded}</span>
              <p className="mt-3 text-sm text-alloy-300 leading-relaxed">
                Nearly a decade of running the department's technical culture — from first-year
                orientation to national competitions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- WHY JOIN ---------------- */}
      <section className="border-y border-containment-600 bg-containment-800/40">
        <div className="container-page py-20 sm:py-28">
          <p className="eyebrow mb-3">Why Join</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-alloy-100 mb-12 max-w-xl">
            A structured environment for a genuinely technical hobby.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.slice(0, 6).map((a, i) => {
              const Icon = iconMap[a.icon] || Atom
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="panel p-6 hover:border-cherenkov-500/50 transition-colors group"
                >
                  <Icon className="text-cherenkov-400 mb-4 group-hover:scale-110 transition-transform" size={26} strokeWidth={1.5} />
                  <h3 className="font-semibold text-alloy-100 mb-2">{a.title}</h3>
                  <p className="text-sm text-alloy-400 leading-relaxed">{a.description}</p>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-10">
            <Link to="/activities" className="inline-flex items-center gap-1 text-cherenkov-300 text-sm font-medium hover:gap-2 transition-all">
              See all activities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- LATEST NEWS ---------------- */}
      <section className="container-page py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">Bulletin</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-alloy-100">Latest from the desk</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-1 text-cherenkov-300 text-sm font-medium hover:gap-2 transition-all">
            All news <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredNews.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
              className="panel overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2 py-0.5">{n.tag}</span>
                  <span className="flex items-center gap-1 text-xs text-alloy-500">
                    <Calendar size={12} />
                    {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-semibold text-alloy-100 leading-snug mb-2">{n.title}</h3>
                <p className="text-sm text-alloy-400 leading-relaxed line-clamp-3">{n.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------- GALLERY STRIP ---------------- */}
      <section className="border-t border-containment-600 bg-containment-800/40 py-20 sm:py-24 overflow-hidden">
        <div className="container-page mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">Field Notes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-alloy-100">Moments from the lab floor</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-1 text-cherenkov-300 text-sm font-medium hover:gap-2 transition-all">
            Full gallery <ChevronRight size={16} />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.15}
          spaceBetween={20}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.4 } }}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          loop
          className="container-page !overflow-visible"
        >
          {gallery.map((g) => (
            <SwiperSlide key={g.id}>
              <div className="relative aspect-[4/5] overflow-hidden panel">
                <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-containment-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-cherenkov-300 uppercase tracking-wider">{g.album}</p>
                  <p className="text-sm text-alloy-100 mt-1">{g.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-page py-20 sm:py-28">
        <div className="corner-frame panel bg-containment-800/70 p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 hex-bg bg-repeat opacity-30 pointer-events-none" />
          <div className="relative">
            <Atom className="mx-auto text-cherenkov-400 mb-5" size={40} strokeWidth={1.25} />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-alloy-100 mb-4">
              Ready to get your hands on the core?
            </h2>
            <p className="text-alloy-400 max-w-lg mx-auto mb-8">
              Join {clubInfo.name.split(' ').slice(1).join(' ')} and get access to bootcamps, research
              mentorship, and a peer group that will out-live your undergrad years.
            </p>
            <a href={`mailto:${clubInfo.email}`} className="btn-primary">
              Get in touch <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
