import { Info, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DemoBanner({ usingFallback }) {
  if (!usingFallback) return null
  return (
    <div className="bg-uranium-400/10 border-b border-uranium-500/30 text-uranium-300 text-xs font-mono px-4 py-2.5 flex flex-wrap items-center gap-3 justify-center">
      <span className="flex items-center gap-2">
        <Info size={14} className="shrink-0" />
        Showing default starter content — add or edit entries anytime from the CMS Dashboard.
      </span>
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 underline underline-offset-4 text-cherenkov-300 hover:text-cherenkov-200 font-semibold"
      >
        Open CMS <ArrowRight size={12} />
      </Link>
    </div>
  )
}
