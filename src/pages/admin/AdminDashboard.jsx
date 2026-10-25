import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Newspaper,
  Users,
  GraduationCap,
  CalendarClock,
  BookOpen,
  Images,
  ArrowRight,
  Database,
  Settings,
  CloudUpload,
  Download,
  Upload,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../../lib/firebase.js'
import {
  useFirestoreCollection,
  saveLocalCollection,
  getLocalCollection,
} from '../../hooks/useFirestoreCollection.js'
import { saveClubInfo, getLocalClubInfo } from '../../hooks/useClubInfo.js'
import {
  clubInfo,
  news,
  panel,
  alumni,
  activities,
  resources,
  gallery,
} from '../../data/dummyData.js'

const cards = [
  { to: '/admin/news', label: 'News & Seminars', icon: Newspaper, collection: 'news', fallback: news },
  { to: '/admin/panel', label: 'Executive Panel', icon: Users, collection: 'panel_executives', fallback: panel.executives },
  { to: '/admin/alumni', label: 'Alumni Network', icon: GraduationCap, collection: 'alumni', fallback: alumni },
  { to: '/admin/activities', label: 'Activities & Safety', icon: CalendarClock, collection: 'activities', fallback: activities },
  { to: '/admin/resources', label: 'Career & Lab Dossiers', icon: BookOpen, collection: 'resources', fallback: resources },
  { to: '/admin/gallery', label: 'Photo Gallery', icon: Images, collection: 'gallery', fallback: gallery },
]

function CountCard({ card }) {
  const { data } = useFirestoreCollection(card.collection, card.fallback)
  const Icon = card.icon
  return (
    <Link to={card.to} className="relative flex flex-col p-6 corner-frame panel card-hover group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-2.5 transition-colors border rounded-sm border-containment-600 bg-containment-950/80 group-hover:border-cherenkov-400/50 group-hover:bg-cherenkov-400/10">
          <Icon className="text-cherenkov-400" size={24} strokeWidth={1.5} />
        </div>
        <ArrowRight
          size={18}
          className="transition-all text-alloy-500 group-hover:text-cherenkov-300 group-hover:translate-x-1"
        />
      </div>
      <p className="font-mono text-4xl font-semibold text-alloy-100">{data.length}</p>
      <p className="mt-2 data-label">{card.label}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const [seeding, setSeeding] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  async function handleSeedAll() {
    setSeeding(true)
    setStatusMsg('')
    const allCollections = {
      news: getLocalCollection('news') || news,
      panel_executives: getLocalCollection('panel_executives') || panel.executives,
      panel_advisors: getLocalCollection('panel_advisors') || panel.advisors,
      alumni: getLocalCollection('alumni') || alumni,
      activities: getLocalCollection('activities') || activities,
      resources: getLocalCollection('resources') || resources,
      gallery: getLocalCollection('gallery') || gallery,
    }

    // 1. Save to local CMS cache so Demo Mode banners vanish immediately
    Object.entries(allCollections).forEach(([colName, items]) => {
      saveLocalCollection(colName, items)
    })
    await saveClubInfo(getLocalClubInfo() || clubInfo)

    // 2. Also push to Cloud Firestore if connected
    if (isFirebaseConfigured && db) {
      try {
        for (const [colName, items] of Object.entries(allCollections)) {
          await Promise.all(
            items.map((item) => {
              const { id, ...rest } = item
              return setDoc(doc(collection(db, colName), id), rest, { merge: true })
            })
          )
        }
        setStatusMsg('All 7 collections & Club Settings synced to Cloud Firestore & Live Portal!')
      } catch {
        setStatusMsg('Initialized all collections in Portal CMS! (Enable Firestore Rules in console for cloud write)')
      }
    } else {
      setStatusMsg('All starter collections initialized in Portal CMS!')
    }
    setSeeding(false)
  }

  function handleExportJson() {
    const payload = {
      exportedAt: new Date().toISOString(),
      clubInfo: getLocalClubInfo() || clubInfo,
      news: getLocalCollection('news') || news,
      panel_executives: getLocalCollection('panel_executives') || panel.executives,
      panel_advisors: getLocalCollection('panel_advisors') || panel.advisors,
      alumni: getLocalCollection('alumni') || alumni,
      activities: getLocalCollection('activities') || activities,
      resources: getLocalCollection('resources') || resources,
      gallery: getLocalCollection('gallery') || gallery,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mnec-cms-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function handleImportJson(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        const cols = [
          'news',
          'panel_executives',
          'panel_advisors',
          'alumni',
          'activities',
          'resources',
          'gallery',
        ]
        cols.forEach((c) => {
          if (Array.isArray(parsed[c])) {
            saveLocalCollection(c, parsed[c])
          }
        })
        if (parsed.clubInfo) {
          await saveClubInfo(parsed.clubInfo)
        }
        setStatusMsg('Backup JSON imported and applied across the website!')
      } catch (err) {
        setStatusMsg('Invalid JSON backup file: ' + err.message)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Database size={24} className="text-cherenkov-400" />
            <h1 className="text-3xl font-bold font-display text-alloy-100">
              MNEC Content Management System (CMS)
            </h1>
          </div>
          <p className="text-alloy-400">
            Upload photos, publish news &amp; job seminars, edit panel members, and manage club settings from one dashboard.
          </p>
        </div>

        {/* 1-Click Database Sync & Backup Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSeedAll}
            disabled={seeding}
            className="btn-primary !py-2.5 !px-4 !text-xs"
          >
            {seeding ? <Loader2 size={15} className="animate-spin" /> : <CloudUpload size={15} />}
            {seeding ? 'Syncing Database...' : '1-Click Sync & Activate All Collections'}
          </button>

          <button
            onClick={handleExportJson}
            className="btn-secondary !py-2.5 !px-3.5 !text-xs"
            title="Download full JSON backup of all website content"
          >
            <Download size={14} /> Export JSON
          </button>

          <label className="btn-secondary !py-2.5 !px-3.5 !text-xs cursor-pointer">
            <Upload size={14} /> Import JSON
            <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
          </label>
        </div>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2.5 p-4 mb-8 border rounded-sm border-safety/40 bg-safety/10 text-safety font-mono text-xs">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Club Info & Charter Settings Banner Card */}
      <Link
        to="/admin/settings"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 mb-8 corner-frame panel card-hover border-l-4 border-l-uranium-400 group"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-sm border border-uranium-400/40 bg-uranium-400/10 text-uranium-400">
            <Settings size={24} />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-uranium-300">
              Global Configuration
            </span>
            <h2 className="text-xl font-bold font-display text-alloy-100 mt-0.5 group-hover:text-cherenkov-300 transition-colors">
              Edit Club Name, Official Charter, Statistics &amp; Contact Info
            </h2>
            <p className="text-sm text-alloy-400 mt-1">
              Customize the hero charter quote, mission statement, member counters, email, and social media links.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-uranium-300 shrink-0 group-hover:translate-x-1 transition-transform">
          Open Settings <ArrowRight size={15} />
        </span>
      </Link>

      {/* Collection Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <CountCard key={c.collection} card={c} />
        ))}
      </div>
    </div>
  )
}
