import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Atom, Brain, ShieldAlert, FlaskConical, MapPin, Users,
  Calendar, ChevronRight, ChevronDown, Target, Clock,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import ReactorCore from '../components/ReactorCore.jsx'
import { clubInfo, activities as dummyActivities, gallery as dummyGallery, news as dummyNews } from '../data/dummyData.js'
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
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-containment-600">
        <div className="absolute inset-0 bg-repeat hex-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-containment-900/60 to-containment-900" />

        <div className="relative grid items-center gap-12 py-20 container-page lg:grid-cols-2 lg:py-28">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full border-containment-600">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cherenkov-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cherenkov-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-alloy-300">Reactor Status: Nominal</span>
            </div>
            <p className="mb-5 eyebrow">{clubInfo.institution} · Dept. of Nuclear Science &amp; Engineering</p>
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold leading-[0.95] text-alloy-100 tracking-tight">
              Critical mass,<br />
              <span className="text-cherenkov-400">not critical mess.</span>
            </h1>
            <p className="max-w-lg mt-6 text-lg leading-relaxed text-alloy-400">
              {clubInfo.name} is where MIST's nuclear science students turn coursework into
              reactor models, quiz trophies, and a network that follows you past graduation.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link to="/activities" className="btn-primary">
                Explore Activities <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Who We Are
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t mt-14 sm:grid-cols-4 border-containment-600">
              {clubInfo.stats.map((s, i) => (
                <motion.div key={s.label} initial="hidden" animate="show" variants={fadeUp} custom={i + 1}>
                  <div className="font-mono text-2xl font-semibold sm:text-3xl text-cherenkov-300">{s.value}</div>
                  <div className="mt-1 data-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center p-6 corner-frame"
          >
            <ReactorCore className="w-full max-w-md aspect-square animate-drift" />
            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-alloy-500 tracking-wider">
              FIG. 01 — FUEL ASSEMBLY LATTICE, SCHEMATIC
            </div>
          </motion.div>
        </div>

        <a
          href="#identity"
          className="absolute flex-col items-center hidden gap-1 transition-colors -translate-x-1/2 sm:flex bottom-6 left-1/2 text-alloy-500 hover:text-cherenkov-300"
          aria-label="Scroll to next section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </section>

      {/* ---------------- IDENTITY ---------------- */}
      <section id="identity" className="py-20 container-page sm:py-28">
        <div className="grid lg:grid-cols-2 gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="mb-3 eyebrow">Our Identity</p>
            <h2 className="mb-5 text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              More than a study group.
            </h2>
            <p className="pl-5 leading-relaxed border-l-2 text-alloy-400 border-cherenkov-500/40">{clubInfo.history}</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="p-6 transition-all corner-frame panel hover:-translate-y-1 hover:shadow-glow"
            >
              <Target className="mb-3 text-cherenkov-400" size={20} strokeWidth={1.5} />
              <span className="data-label text-cherenkov-400">§ 01 — Mission</span>
              <p className="mt-3 text-sm leading-relaxed text-alloy-300">{clubInfo.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 transition-all corner-frame panel hover:-translate-y-1 hover:shadow-glow-amber"
            >
              <Clock className="mb-3 text-uranium-400" size={20} strokeWidth={1.5} />
              <span className="data-label text-uranium-400">§ 02 — Founded {clubInfo.founded}</span>
              <p className="mt-3 text-sm leading-relaxed text-alloy-300">
                Nearly a decade of running the department's technical culture — from first-year
                orientation to national competitions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- WHY JOIN ---------------- */}
      <section className="border-y border-containment-600 bg-containment-800/40">
        <div className="py-20 container-page sm:py-28">
          <p className="mb-3 eyebrow">Why Join</p>
          <h2 className="max-w-xl mb-12 text-3xl font-bold font-display sm:text-4xl text-alloy-100">
            A structured environment for a genuinely technical hobby.
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.slice(0, 6).map((a, i) => {
              const Icon = iconMap[a.icon] || Atom
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="p-6 transition-all panel hover:border-cherenkov-500/50 hover:-translate-y-1 hover:shadow-glow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="transition-transform text-cherenkov-400 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    <span className="font-mono text-[10px] text-alloy-500">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-alloy-100">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-alloy-400">{a.description}</p>
                </motion.div>
              )
            })}
          </div>
          <div className="mt-10">
            <Link to="/activities" className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2">
              See all activities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- LATEST NEWS ---------------- */}
      <section className="py-20 container-page sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="mb-3 eyebrow">Bulletin</p>
            <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">Latest from the desk</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2">
            All news <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredNews.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden transition-shadow panel group hover:shadow-glow"
            >
              <Link to={`/news/${n.id}`} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={n.cover} alt="" className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2 py-0.5">{n.tag}</span>
                    <span className="flex items-center gap-1 text-xs text-alloy-500">
                      <Calendar size={12} />
                      {new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold leading-snug transition-colors text-alloy-100 group-hover:text-cherenkov-300">{n.title}</h3>
                  <p className="text-sm leading-relaxed text-alloy-400 line-clamp-3">{n.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium transition-opacity opacity-0 text-cherenkov-300 group-hover:opacity-100">
                    Read article <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------------- GALLERY STRIP ---------------- */}
      <section className="py-20 overflow-hidden border-t border-containment-600 bg-containment-800/40 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 container-page">
          <div>
            <p className="mb-3 eyebrow">Field Notes</p>
            <h2 className="text-3xl font-bold font-display sm:text-4xl text-alloy-100">Moments from the lab floor</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-1 text-sm font-medium transition-all text-cherenkov-300 hover:gap-2">
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
              <Link to="/gallery" className="relative block aspect-[4/5] overflow-hidden panel group">
                <img src={g.url} alt={g.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-containment-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-xs tracking-wider uppercase text-cherenkov-300">{g.album}</p>
                  <p className="mt-1 text-sm text-alloy-100">{g.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-20 container-page sm:py-28">
        <div className="relative p-10 overflow-hidden text-center corner-frame panel bg-containment-800/70 sm:p-16">
          <div className="absolute inset-0 bg-repeat pointer-events-none hex-bg opacity-30" />
          <div className="relative">
            <Atom className="mx-auto mb-5 text-cherenkov-400" size={40} strokeWidth={1.25} />
            <h2 className="mb-4 text-3xl font-bold font-display sm:text-4xl text-alloy-100">
              Ready to get your hands on the core?
            </h2>
            <p className="max-w-lg mx-auto mb-8 text-alloy-400">
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