import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="relative border-b border-containment-600 hex-bg bg-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-containment-900/40 to-containment-900 pointer-events-none" />
      <div className="container-page relative py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-alloy-100 tracking-tight">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-alloy-400 text-base leading-relaxed">{description}</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
