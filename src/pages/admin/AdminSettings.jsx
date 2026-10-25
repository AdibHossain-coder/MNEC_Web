import { useState, useEffect } from 'react'
import { Settings, Save, CheckCircle2, RotateCcw } from 'lucide-react'
import { useClubInfo, saveClubInfo } from '../../hooks/useClubInfo.js'
import { clubInfo as defaultClubInfo } from '../../data/dummyData.js'

export default function AdminSettings() {
  const { clubInfo } = useClubInfo()
  const [form, setForm] = useState(clubInfo)
  const [saving, setSaving] = useState(false)
  const [savedToast, setSavedToast] = useState(false)

  useEffect(() => {
    setForm(clubInfo)
  }, [clubInfo])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveClubInfo(form)
      setSavedToast(true)
      setTimeout(() => setSavedToast(false), 3500)
    } finally {
      setSaving(false)
    }
  }

  async function handleResetDefaults() {
    setForm(defaultClubInfo)
    await saveClubInfo(defaultClubInfo)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3500)
  }

  function updateStat(index, field, val) {
    const nextStats = [...(form.stats || [])]
    nextStats[index] = { ...nextStats[index], [field]: val }
    setForm({ ...form, stats: nextStats })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Settings size={22} className="text-cherenkov-400" />
            <h1 className="text-2xl font-bold font-display text-alloy-100">
              Club Settings, Charter &amp; Contact Info
            </h1>
          </div>
          <p className="text-sm text-alloy-400">
            Update the club identity, official charter quote, mission statement, statistics, and contact details shown across the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="btn-secondary !py-2 !px-3.5 !text-xs"
        >
          <RotateCcw size={14} /> Restore Defaults
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identity */}
        <div className="p-6 space-y-5 corner-frame panel">
          <h2 className="font-mono text-xs uppercase tracking-widest text-cherenkov-400 border-b border-containment-600 pb-3">
            § 01 — Club Identity
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block mb-2 data-label">Full Club Name</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 data-label">Short Acronym</label>
              <input
                type="text"
                value={form.shortName || ''}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block mb-2 data-label">Institution</label>
              <input
                type="text"
                value={form.institution || ''}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 data-label">Founded Year</label>
              <input
                type="number"
                value={form.founded || 2016}
                onChange={(e) => setForm({ ...form, founded: Number(e.target.value) })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Charter & Story */}
        <div className="p-6 space-y-5 corner-frame panel">
          <h2 className="font-mono text-xs uppercase tracking-widest text-uranium-400 border-b border-containment-600 pb-3">
            § 02 — Official Charter, Mission &amp; History
          </h2>
          <div>
            <label className="block mb-2 data-label">
              Official Club Charter (Featured on Home Hero, About &amp; Footer)
            </label>
            <textarea
              rows={4}
              value={form.charter || ''}
              onChange={(e) => setForm({ ...form, charter: e.target.value, mission: e.target.value })}
              className="w-full px-4 py-3 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 data-label">Founding Story &amp; History</label>
            <textarea
              rows={4}
              value={form.history || ''}
              onChange={(e) => setForm({ ...form, history: e.target.value })}
              className="w-full px-4 py-3 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
            />
          </div>
        </div>

        {/* Hero Statistics */}
        <div className="p-6 space-y-5 corner-frame panel">
          <h2 className="font-mono text-xs uppercase tracking-widest text-safety border-b border-containment-600 pb-3">
            § 03 — Key Statistics (Home Hero Counters)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {(form.stats || []).map((st, idx) => (
              <div
                key={idx}
                className="grid grid-cols-2 gap-3 p-3.5 border rounded-sm border-containment-600 bg-containment-950/50"
              >
                <div>
                  <label className="block mb-1 data-label">Value</label>
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => updateStat(idx, 'value', e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono border rounded-sm bg-containment-900 border-containment-600 text-cherenkov-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 data-label">Label</label>
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => updateStat(idx, 'label', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-sm bg-containment-900 border-containment-600 text-alloy-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social */}
        <div className="p-6 space-y-5 corner-frame panel">
          <h2 className="font-mono text-xs uppercase tracking-widest text-cherenkov-400 border-b border-containment-600 pb-3">
            § 04 — Contact &amp; Social Links
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block mb-2 data-label">Official Email</label>
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 data-label">Department Address</label>
              <input
                type="text"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="block mb-2 data-label">Facebook URL</label>
              <input
                type="url"
                value={form.social?.facebook || ''}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, facebook: e.target.value } })
                }
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 data-label">LinkedIn URL</label>
              <input
                type="url"
                value={form.social?.linkedin || ''}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })
                }
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 data-label">YouTube URL</label>
              <input
                type="url"
                value={form.social?.youtube || ''}
                onChange={(e) =>
                  setForm({ ...form, social: { ...form.social, youtube: e.target.value } })
                }
                className="w-full px-4 py-2.5 text-sm border rounded-sm bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {savedToast && (
            <span className="flex items-center gap-1.5 text-sm text-safety font-mono">
              <CheckCircle2 size={16} /> Settings saved &amp; live!
            </span>
          )}
          <button type="submit" disabled={saving} className="btn-primary">
            <Save size={18} /> {saving ? 'Saving Settings...' : 'Save Club Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
