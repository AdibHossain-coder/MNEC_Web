import { Link } from 'react-router-dom'
import { Newspaper, Users, GraduationCap, CalendarClock, BookOpen, Images, ArrowRight, Database } from 'lucide-react'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection.js'
import { isFirebaseConfigured } from '../../lib/firebase.js'
import {
  news, panel, alumni, activities, resources, gallery,
} from '../../data/dummyData.js'

const cards = [
  { to: '/admin/news', label: 'News Logs', icon: Newspaper, collection: 'news', fallback: news },
  { to: '/admin/panel', label: 'Executives', icon: Users, collection: 'panel_executives', fallback: panel.executives },
  { to: '/admin/alumni', label: 'Alumni', icon: GraduationCap, collection: 'alumni', fallback: alumni },
  { to: '/admin/activities', label: 'Activities', icon: CalendarClock, collection: 'activities', fallback: activities },
  { to: '/admin/resources', label: 'Resources', icon: BookOpen, collection: 'resources', fallback: resources },
  { to: '/admin/gallery', label: 'Gallery', icon: Images, collection: 'gallery', fallback: gallery },
]

function CountCard({ card }) {
  const { data } = useFirestoreCollection(card.collection, card.fallback)
  const Icon = card.icon
  return (
    <Link to={card.to} className="relative flex flex-col p-6 transition-all duration-300 corner-frame panel group hover:border-cherenkov-400/50 hover:bg-containment-800/80 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className="p-2 transition-colors border rounded-sm border-containment-600 bg-containment-900 group-hover:border-cherenkov-400/50 group-hover:bg-cherenkov-400/10">
          <Icon className="text-cherenkov-400" size={24} strokeWidth={1.5} />
        </div>
        <ArrowRight size={18} className="transition-all text-alloy-600 group-hover:text-cherenkov-300 group-hover:translate-x-1" />
      </div>
      <p className="font-mono text-4xl font-semibold text-alloy-100">{data.length}</p>
      <p className="mt-2 data-label">{card.label} Database</p>
    </Link>
  )
}

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Database size={24} className="text-cherenkov-400" />
        <h1 className="text-3xl font-bold font-display text-alloy-100">System Overview</h1>
      </div>
      <p className="mb-10 text-alloy-400">Manage all portal databases and external records from this terminal.</p>

      {!isFirebaseConfigured && (
        <div className="p-5 mb-10 border rounded-sm bg-uranium-500/10 border-uranium-500/30 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-uranium-300">
            <strong className="font-mono tracking-wide uppercase">System Alert:</strong> Firebase isn't connected yet. Changes made here will be temporary. 
            Fill in <code className="px-1.5 py-0.5 mx-1 font-mono text-xs bg-containment-900 border border-containment-600 rounded-sm">.env.local</code> 
            with your project keys to enable persistent storage.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <CountCard key={c.collection} card={c} />
        ))}
      </div>
    </div>
  )
}