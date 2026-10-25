import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Interactive 3D perspective card with real-time cursor tilt,
 * dynamic Cherenkov/Uranium specular spotlight glare, and Z-axis depth.
 */
export default function TiltCard({
  children,
  className = '',
  accent = 'cherenkov',
  intensity = 10,
  as = 'div',
  onClick,
  ...rest
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 22, stiffness: 260, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), springConfig)

  const glareX = useTransform(x, [0, 1], ['0%', '100%'])
  const glareY = useTransform(y, [0, 1], ['0%', '100%'])

  const glowColors = {
    cherenkov: 'rgba(34, 211, 238, 0.16)',
    uranium: 'rgba(251, 191, 36, 0.16)',
    safety: 'rgba(16, 185, 129, 0.16)',
  }
  const borderHoverClass = {
    cherenkov: 'hover:border-cherenkov-400/70 hover:shadow-3d-hover',
    uranium: 'hover:border-uranium-400/70 hover:shadow-glow-amber',
    safety: 'hover:border-safety/70 hover:shadow-glow-safety',
  }

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
    x.set(px)
    y.set(py)
  }

  function handleMouseEnter() {
    setHovered(true)
  }

  function handleMouseLeave() {
    setHovered(false)
    x.set(0.5)
    y.set(0.5)
  }

  const MotionTag = motion[as] || motion.div

  return (
    <div className="perspective-1000 h-full">
      <MotionTag
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015, y: -4 }}
        transition={{ duration: 0.25 }}
        className={`relative h-full transition-colors duration-300 ${borderHoverClass[accent] || borderHoverClass.cherenkov} ${className}`}
        {...rest}
      >
        {/* Dynamic 3D Specular Glare Overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(380px circle at ${gx} ${gy}, ${glowColors[accent] || glowColors.cherenkov}, transparent 70%)`
            ),
          }}
        />

        {/* Top Edge Laser Scan Highlight on Hover */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-6 right-6 h-[1.5px] z-20 transition-all duration-500 ${
            hovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
          } ${
            accent === 'uranium'
              ? 'bg-gradient-to-r from-transparent via-uranium-400 to-transparent'
              : accent === 'safety'
              ? 'bg-gradient-to-r from-transparent via-safety to-transparent'
              : 'bg-gradient-to-r from-transparent via-cherenkov-300 to-transparent'
          }`}
        />

        {/* Card Content with 3D Depth */}
        <div className="relative z-20 h-full flex flex-col" style={{ transform: 'translateZ(18px)' }}>
          {children}
        </div>
      </MotionTag>
    </div>
  )
}
