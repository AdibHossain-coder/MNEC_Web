// Signature visual for the site: a hexagonal-packed fuel-rod cross-section
// (the way real fuel assemblies are arranged) with a pulsing Cherenkov core.
// This stands in for the generic "stat card" hero pattern.

const hexPositions = (() => {
  const positions = []
  const radius = 3
  const spacing = 34
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      const s = -q - r
      if (Math.abs(s) <= radius) {
        const x = spacing * (1.5 * q)
        const y = spacing * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r)
        const dist = Math.sqrt(q * q + r * r + s * s)
        positions.push({ x, y, dist })
      }
    }
  }
  return positions
})()

export default function ReactorCore({ className = '' }) {
  return (
    <svg
      viewBox="-260 -260 520 520"
      className={className}
      role="img"
      aria-label="Stylised hexagonal fuel-assembly reactor core"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8FE0F5" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#38AAD1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38AAD1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rodGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#BEEFFB" />
          <stop offset="60%" stopColor="#5EC8E8" />
          <stop offset="100%" stopColor="#2687AC" />
        </radialGradient>
      </defs>

      <circle cx="0" cy="0" r="230" fill="url(#coreGlow)" className="animate-pulseCore" style={{ transformOrigin: 'center' }} />

      {/* orbital containment rings */}
      <g className="animate-spinSlow" style={{ transformOrigin: 'center' }}>
        <circle cx="0" cy="0" r="235" fill="none" stroke="#334255" strokeWidth="1" strokeDasharray="2 10" />
      </g>
      <g className="animate-spinSlowReverse" style={{ transformOrigin: 'center' }}>
        <circle cx="0" cy="0" r="205" fill="none" stroke="#22303F" strokeWidth="1" strokeDasharray="1 7" />
      </g>

      {/* hexagonal fuel-rod lattice */}
      <g>
        {hexPositions.map((p, i) => {
          const isCenter = p.dist === 0
          const delay = (p.dist * 0.18).toFixed(2)
          const r = isCenter ? 11 : Math.max(4, 9 - p.dist * 0.6)
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={r}
              fill="url(#rodGrad)"
              opacity={isCenter ? 1 : Math.max(0.25, 0.9 - p.dist * 0.13)}
              className={isCenter ? 'animate-pulseCore' : ''}
              style={{ transformOrigin: `${p.x}px ${p.y}px`, animationDelay: `${delay}s` }}
            />
          )
        })}
      </g>

      {/* measurement ticks, technical-drawing style */}
      <g stroke="#647082" strokeWidth="1" opacity="0.5">
        <line x1="-250" y1="0" x2="-236" y2="0" />
        <line x1="250" y1="0" x2="236" y2="0" />
        <line x1="0" y1="-250" x2="0" y2="-236" />
        <line x1="0" y1="250" x2="0" y2="236" />
      </g>
    </svg>
  )
}
