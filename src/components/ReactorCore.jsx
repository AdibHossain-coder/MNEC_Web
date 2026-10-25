import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShieldCheck, Sliders, Activity, Zap } from 'lucide-react'

// Hexagonal-packed PWR fuel-rod & control-rod cross-section
// with interactive 3D tilt, Cherenkov radiation bloom, and live neutron kinetics telemetry.
const hexPositions = (() => {
  const positions = []
  const radius = 3
  const spacing = 34
  let idx = 0
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r
      if (Math.abs(s) <= radius) {
        const x = spacing * (1.5 * q)
        const y = spacing * ((Math.sqrt(3) / 2) * q + Math.sqrt(3) * r)
        const dist = Math.sqrt(q * q + r * r + s * s)
        // Designate control rod cluster positions symmetrically
        const isControlRod =
          dist === 0 ||
          (Math.abs(q) === 1 && Math.abs(r) === 1 && s === 0) ||
          (Math.abs(q) === 2 && r === -1) ||
          (q === -1 && Math.abs(r) === 2)
        positions.push({
          id: `FA-${String(++idx).padStart(2, '0')}`,
          q,
          r,
          s,
          x,
          y,
          dist,
          isControlRod,
        })
      }
    }
  }
  return positions
})()

export default function ReactorCore({ className = '', compact = false }) {
  const containerRef = useRef(null)
  const [rodInsertion, setRodInsertion] = useState(32) // % control rod insertion (32% = 1.000 nominal critical)
  const [hoveredRod, setHoveredRod] = useState(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springCfg = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(my, [0, 1], [16, -16]), springCfg)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-16, 16]), springCfg)

  function handleMouseMove(e) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set(Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1))
    my.set(Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1))
  }

  function handleMouseLeave() {
    mx.set(0.5)
    my.set(0.5)
    setHoveredRod(null)
  }

  // Simulated reactor physics metrics from control rod insertion %
  const reactivityFactor = Math.max(0.15, (100 - rodInsertion) / 68)
  const kEff = (0.94 + (100 - rodInsertion) * 0.00088).toFixed(4)
  const thermalMW = Math.round(1200 * Math.min(1.08, reactivityFactor * 0.96))
  const coreTemp = Math.round(275 + reactivityFactor * 36)
  const doseRate = (0.07 + reactivityFactor * 0.02).toFixed(2)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none perspective-1000 ${className}`}
    >
      {/* 3D Tilt Stage */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col items-center justify-center w-full h-full"
      >
        {/* Deep Ambient Cherenkov Backlight (Z: -30px) */}
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full pointer-events-none blur-3xl transition-opacity duration-500"
          style={{
            transform: 'translateZ(-30px)',
            opacity: Math.min(0.95, 0.35 + reactivityFactor * 0.5),
            background:
              'radial-gradient(circle, rgba(34,211,238,0.42) 0%, rgba(6,182,212,0.18) 50%, transparent 75%)',
          }}
        />

        {/* Main 3D SVG Reactor Vessel */}
        <div className="relative w-full aspect-square max-w-[430px]" style={{ transform: 'translateZ(20px)' }}>
          <svg
            viewBox="-260 -260 520 520"
            className="w-full h-full overflow-visible drop-shadow-[0_0_32px_rgba(34,211,238,0.35)]"
            role="img"
            aria-label="Interactive 3D Hexagonal Pressurized Water Reactor Core Assembly"
          >
            <defs>
              <radialGradient id="coreGlow3D" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A5F3FC" stopOpacity={Math.min(1, 0.55 * reactivityFactor + 0.3)} />
                <stop offset="38%" stopColor="#22D3EE" stopOpacity={Math.min(0.85, 0.38 * reactivityFactor + 0.15)} />
                <stop offset="72%" stopColor="#0284C7" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="fuelRodGrad" cx="32%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="45%" stopColor="#38BDF8" />
                <stop offset="85%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0C4A6E" />
              </radialGradient>

              <radialGradient id="controlRodGrad" cx="32%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="90%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>

              <linearGradient id="vesselSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#475569" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.45" />
              </linearGradient>

              <filter id="cherenkovBloom" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Containment Vessel Wall */}
            <circle
              cx="0"
              cy="0"
              r="248"
              fill="none"
              stroke="url(#vesselSteel)"
              strokeWidth="2.5"
              opacity="0.8"
            />
            <circle
              cx="0"
              cy="0"
              r="240"
              fill="none"
              stroke="#1E293B"
              strokeWidth="6"
              strokeDasharray="18 8"
              opacity="0.7"
            />

            {/* Cherenkov Core Luminance Field */}
            <circle
              cx="0"
              cy="0"
              r="225"
              fill="url(#coreGlow3D)"
              className="animate-pulseCore"
              style={{ transformOrigin: 'center' }}
            />

            {/* Counter-Rotating Neutron Reflector & Shielding Rings */}
            <g className="animate-spinSlow" style={{ transformOrigin: 'center' }}>
              <circle
                cx="0"
                cy="0"
                r="228"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.4"
                strokeWidth="1.2"
                strokeDasharray="3 11"
              />
              <circle
                cx="0"
                cy="0"
                r="192"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.22"
                strokeWidth="1"
                strokeDasharray="24 12 4 12"
              />
            </g>
            <g className="animate-spinSlowReverse" style={{ transformOrigin: 'center' }}>
              <circle
                cx="0"
                cy="0"
                r="210"
                fill="none"
                stroke="#FBBF24"
                strokeOpacity="0.3"
                strokeWidth="1.2"
                strokeDasharray="1 8"
              />
              <polygon
                points="0,-176 152,-88 152,88 0,176 -152,88 -152,-88"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
            </g>

            {/* Coolant Flow Vector Lines */}
            <g stroke="#38BDF8" strokeOpacity="0.16" strokeWidth="1">
              <line x1="-185" y1="0" x2="185" y2="0" strokeDasharray="4 6" />
              <line x1="0" y1="-185" x2="0" y2="185" strokeDasharray="4 6" />
              <line x1="-130" y1="-130" x2="130" y2="130" strokeDasharray="4 6" />
              <line x1="-130" y1="130" x2="130" y2="-130" strokeDasharray="4 6" />
            </g>

            {/* Hexagonal Fuel-Rod & Control-Rod Lattice */}
            <g>
              {hexPositions.map((p) => {
                const isCenter = p.dist === 0
                const isHovered = hoveredRod?.id === p.id
                const delay = (p.dist * 0.16).toFixed(2)
                const baseRadius = isCenter
                  ? 12.5
                  : p.isControlRod
                  ? 9.5
                  : Math.max(5.5, 9.5 - p.dist * 0.55)
                const r = isHovered ? baseRadius * 1.32 : baseRadius

                // Control rods dim or glow amber depending on insertion %
                const rodOpacity = p.isControlRod
                  ? Math.max(0.45, rodInsertion / 100)
                  : Math.min(1, Math.max(0.3, (0.95 - p.dist * 0.11) * reactivityFactor))

                return (
                  <g
                    key={p.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRod(p)}
                  >
                    {/* Outer Fuel Cladding Tube */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={baseRadius + 3.5}
                      fill="none"
                      stroke={p.isControlRod ? '#FBBF24' : '#38BDF8'}
                      strokeOpacity={isHovered ? 0.95 : 0.28}
                      strokeWidth={isHovered ? 1.6 : 0.8}
                    />
                    {/* Active Fuel Pellet / Control Rod Core */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r}
                      fill={p.isControlRod ? 'url(#controlRodGrad)' : 'url(#fuelRodGrad)'}
                      opacity={rodOpacity}
                      filter={isCenter || isHovered ? 'url(#cherenkovBloom)' : undefined}
                      className={isCenter ? 'animate-pulseCore' : 'transition-all duration-200'}
                      style={{
                        transformOrigin: `${p.x}px ${p.y}px`,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  </g>
                )
              })}
            </g>

            {/* Precision Engineering Azimuth Ticks */}
            <g stroke="#64748B" strokeWidth="1.2" opacity="0.65">
              <line x1="-254" y1="0" x2="-238" y2="0" />
              <line x1="254" y1="0" x2="238" y2="0" />
              <line x1="0" y1="-254" x2="0" y2="-238" />
              <line x1="0" y1="254" x2="0" y2="238" />
            </g>
          </svg>

          {/* Floating 3D Rod Inspection Tooltip (Z: +45px) */}
          <div
            className="absolute top-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-sm border border-containment-600/80 bg-containment-950/85 backdrop-blur-md font-mono text-[10px] text-alloy-300 pointer-events-none"
            style={{ transform: 'translateZ(40px)' }}
          >
            {hoveredRod ? (
              <>
                <span className="text-cherenkov-300 font-semibold">
                  {hoveredRod.id} [{hoveredRod.isControlRod ? 'B4C CONTROL ROD' : 'UO₂ FUEL ROD 4.2%'}]
                </span>
                <span className="text-uranium-300">
                  COORDS ({hoveredRod.q},{hoveredRod.r}) · {coreTemp + Math.round((4 - hoveredRod.dist) * 4)}°C
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 text-safety">
                  <ShieldCheck size={12} /> IAEA SAFETY SHIELD: ACTIVE
                </span>
                <span className="text-alloy-400">HOVER RODS TO INSPECT</span>
              </>
            )}
          </div>
        </div>

        {/* Interactive Reactor Control Console & Safe Energy Telemetry */}
        {!compact && (
          <div
            className="w-full mt-3 p-3.5 rounded-sm border border-containment-600/90 bg-containment-950/85 backdrop-blur-md space-y-3"
            style={{ transform: 'translateZ(32px)' }}
          >
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="control-rod-slider"
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-alloy-300"
              >
                <Sliders size={12} className="text-uranium-400" />
                Control Rod Insertion (Reactivity Safety)
              </label>
              <span className="font-mono text-xs font-semibold text-uranium-300">{rodInsertion}%</span>
            </div>

            <input
              id="control-rod-slider"
              type="range"
              min="10"
              max="90"
              value={rodInsertion}
              onChange={(e) => setRodInsertion(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-containment-700 accent-cherenkov-400"
            />

            <div className="grid grid-cols-4 gap-2 pt-1 text-center border-t border-containment-700/80">
              <div>
                <div className="font-mono text-[9px] uppercase text-alloy-500">k_eff</div>
                <div className="font-mono text-xs font-semibold text-cherenkov-300">{kEff}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase text-alloy-500">Thermal</div>
                <div className="font-mono text-xs font-semibold text-alloy-100 flex items-center justify-center gap-0.5">
                  <Zap size={10} className="text-uranium-400" />
                  {thermalMW} MWt
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase text-alloy-500">Core Temp</div>
                <div className="font-mono text-xs font-semibold text-alloy-100">{coreTemp} °C</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase text-alloy-500">Dosimetry</div>
                <div className="font-mono text-xs font-semibold text-safety flex items-center justify-center gap-0.5">
                  <Activity size={10} />
                  {doseRate} μSv/h
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
