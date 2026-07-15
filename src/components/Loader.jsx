import { Atom } from 'lucide-react'

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 text-alloy-400">
      <div className="relative flex items-center justify-center">
        {/* Ambient reactor glow */}
        <div className="absolute rounded-full inset-1 animate-pulseCore bg-cherenkov-400/20 blur-md" />
        
        {/* Slowly spinning atom */}
        <Atom 
          className="relative animate-spinSlow text-cherenkov-400 drop-shadow-[0_0_10px_rgba(94,200,232,0.4)]" 
          size={40} 
          strokeWidth={1.5} 
        />
        
        {/* Active inner core */}
        <div className="absolute w-2 h-2 rounded-full bg-cherenkov-200 animate-ping opacity-70" />
      </div>
      
      <span className="tracking-widest data-label animate-pulse">
        {label}…
      </span>
    </div>
  )
}