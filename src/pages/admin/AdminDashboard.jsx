import { Link } from 'react-router-dom'
import { Newspaper, Users, GraduationCap, CalendarClock, BookOpen, Images, ArrowRight } from 'lucide-react'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection.js'
import { isFirebaseConfigured } from '../../lib/firebase.js'
import {
  news, panel, alumni, activities, resources, gallery,
} from '../../data/dummyData.js'

const cards = [
  { to: '/admin/news', label: 'News', icon: Newspaper, collection: 'news', fallback: news },
  { to: '/admin/panel', label: 'Panel', icon: Users, collection: 'panel_executives', fallback: panel.executives },
  { to: '/admin/alumni', label: 'Alumni', icon: GraduationCap, collection: 'alumni', fallback: alumni },
  { to: '/admin/activities', label: 'Activities', icon: CalendarClock, collection: 'activities', fallback: activities },
  { to: '/admin/resources', label: 'Resources', icon: BookOpen, collection: 'resources', fallback: resources },
  { to: '/admin/gallery', label: 'Gallery', icon: Images, collection: 'gallery', fallback: gallery },
]

function CountCard({ card }) {
  const { data } = useFirestoreCollection(card.collection, card.fallback)
  const Icon = card.icon
  return (
    <Link to={card.to} className="panel p-6 hover:border-cherenkov-500/50 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <Icon className="text-cherenkov-400" size={22} strokeWidth={1.5} />
        <ArrowRight size={15} className="text-alloy-500 group-hover:text-cherenkov-300 group-hover:translate-x-1 transition-all" />
      </div>
      <p className="font-mono text-3xl font-semibold text-alloy-100">{data.length}</p>
      <p className="data-label mt-1">{card.label} entries</p>
    </Link>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-alloy-100 mb-1">Overview</h1>
      <p className="text-sm text-alloy-400 mb-8">Manage every section of the public site from here.</p>

      {!isFirebaseConfigured && (
        <div className="mb-8 panel border-uranium-500/30 p-5">
          <p className="text-uranium-300 text-sm">
            Firebase isn't connected yet, so changes here won't persist. Fill in{' '}
            <code className="font-mono text-xs">.env.local</code> with your project keys, then redeploy —
            see the README for the full checklist.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <CountCard key={c.collection} card={c} />
        ))}
      </div>
    </div>
  )
}
