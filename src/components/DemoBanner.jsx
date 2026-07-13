import { Info } from 'lucide-react'
import { isFirebaseConfigured } from '../lib/firebase.js'

export default function DemoBanner({ usingFallback }) {
  if (!usingFallback) return null
  return (
    <div className="bg-uranium-400/10 border border-uranium-500/30 text-uranium-300 text-xs font-mono px-4 py-2.5 flex items-center gap-2 justify-center">
      <Info size={14} className="shrink-0" />
      {isFirebaseConfigured
        ? 'This collection is empty in Firestore — showing placeholder content. Add entries from /admin.'
        : 'Demo mode: showing placeholder content. Connect Firebase to make this section live-editable.'}
    </div>
  )
}
