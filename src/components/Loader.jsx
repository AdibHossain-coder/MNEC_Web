import { Loader2 } from 'lucide-react'

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-alloy-400">
      <Loader2 className="animate-spin text-cherenkov-400" size={28} />
      <span className="data-label">{label}…</span>
    </div>
  )
}
