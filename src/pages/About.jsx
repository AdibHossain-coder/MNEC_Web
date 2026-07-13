import { motion } from 'framer-motion'
import { Target, BookOpen, Mail, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { clubInfo } from '../data/dummyData.js'
import ReactorCore from '../components/ReactorCore.jsx'

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="Since 2016"
        title="About MIST NESC"
        description="The story, the mission, and how to reach the desk."
      />

      <section className="container-page py-16 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-cherenkov-400" size={22} />
            <h2 className="font-display text-2xl font-semibold text-alloy-100">Mission</h2>
          </div>
          <p className="text-alloy-400 leading-relaxed mb-10">{clubInfo.mission}</p>

          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-uranium-400" size={22} />
            <h2 className="font-display text-2xl font-semibold text-alloy-100">History</h2>
          </div>
          <p className="text-alloy-400 leading-relaxed">{clubInfo.history}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <ReactorCore className="w-full max-w-sm aspect-square" />
        </motion.div>
      </section>

      <section className="border-t border-containment-600 bg-containment-800/40">
        <div className="container-page py-16 grid sm:grid-cols-2 gap-6">
          <div className="panel p-8">
            <Mail className="text-cherenkov-400 mb-4" size={22} />
            <h3 className="font-semibold text-alloy-100 mb-1">Email the desk</h3>
            <a href={`mailto:${clubInfo.email}`} className="text-alloy-400 hover:text-cherenkov-300 transition-colors">{clubInfo.email}</a>
          </div>
          <div className="panel p-8">
            <MapPin className="text-uranium-400 mb-4" size={22} />
            <h3 className="font-semibold text-alloy-100 mb-1">Find us</h3>
            <p className="text-alloy-400">{clubInfo.address}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
