import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="relative overflow-hidden bg-repeat border-b border-containment-600 hex-bg">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-containment-900/60 to-containment-900" />
      
      <div className="relative py-20 container-page sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full shadow-sm border-containment-600 bg-containment-900/50 backdrop-blur-sm">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cherenkov-400" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cherenkov-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-alloy-300">
                {eyebrow}
              </span>
            </div>
          )}
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-alloy-100 tracking-tight">
            {title}
          </h1>
          
          {description && (
            <p className="max-w-2xl mt-5 text-lg leading-relaxed text-alloy-400">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}