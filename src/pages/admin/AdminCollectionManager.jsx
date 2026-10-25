import { useState } from 'react'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  UploadCloud,
  Loader2,
  DatabaseZap,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { db, isFirebaseConfigured } from '../../lib/firebase.js'
import { uploadCmsImage } from '../../lib/imageUploader.js'
import {
  useFirestoreCollection,
  saveLocalCollection,
} from '../../hooks/useFirestoreCollection.js'
import DemoBanner from '../../components/DemoBanner.jsx'

export default function AdminCollectionManager({
  title,
  description,
  collectionName,
  fields,
  fallbackData,
}) {
  const { data, usingFallback } = useFirestoreCollection(collectionName, fallbackData)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  function openNew() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, '']))
    // Default date field to today's YYYY-MM-DD
    fields.forEach((f) => {
      if (f.type === 'date') {
        blank[f.key] = new Date().toISOString().split('T')[0]
      }
    })
    setForm(blank)
    setEditing('new')
  }

  function openEdit(item) {
    setForm({ ...item })
    setEditing(item.id)
  }

  function closeForm() {
    setEditing(null)
    setForm({})
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)

    const recordId = editing === 'new' ? `${collectionName.slice(0, 2)}_${Date.now()}` : editing
    const payload = { ...form }
    delete payload.id

    // Update local CMS state immediately so UI is always responsive
    const updatedList =
      editing === 'new'
        ? [{ id: recordId, ...payload }, ...data]
        : data.map((item) => (item.id === recordId ? { id: recordId, ...payload } : item))

    saveLocalCollection(collectionName, updatedList)

    // Attempt Firestore cloud sync
    if (isFirebaseConfigured && db) {
      try {
        // If collection was still using fallback data, seed existing items too so none disappear
        if (usingFallback && editing === 'new') {
          await Promise.all(
            data.map((existing) => {
              const { id: exId, ...exRest } = existing
              return setDoc(doc(collection(db, collectionName), exId), exRest, { merge: true })
            })
          )
        }
        await setDoc(
          doc(collection(db, collectionName), recordId),
          {
            ...payload,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        )
        showToast(
          editing === 'new'
            ? 'New entry published to Cloud Firestore & live portal!'
            : 'Entry updated in Cloud Firestore & live portal!'
        )
      } catch (err) {
        console.warn('Firestore write warning:', err)
        showToast(
          'Saved to portal! (Note: Enable Firestore Rules in Firebase Console for global cloud sync)',
          'success'
        )
      }
    } else {
      showToast('Entry saved to CMS portal!')
    }

    setSaving(false)
    closeForm()
  }

  async function handleDelete(id) {
    const updatedList = data.filter((item) => item.id !== id)
    saveLocalCollection(collectionName, updatedList)

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, collectionName, id))
        showToast('Record permanently deleted from Cloud Firestore.')
      } catch {
        showToast('Record removed from portal.')
      }
    } else {
      showToast('Record removed from portal.')
    }
    setConfirmDelete(null)
  }

  async function handleUpload(file, key) {
    if (!file) return
    setUploading(true)
    try {
      const { url, method } = await uploadCmsImage(file, collectionName)
      setForm((f) => ({ ...f, [key]: url }))
      showToast(
        method === 'firebase-storage'
          ? 'Image uploaded to Firebase Cloud Storage!'
          : 'Image compressed & ready (inline WebP storage — no paid bucket required)!'
      )
    } catch (err) {
      showToast('Image processing failed: ' + err.message, 'error')
    } finally {
      setUploading(false)
    }
  }

  const imageField = fields.find((f) => f.type === 'image')
  const filteredData = data.filter((item) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return fields.some((f) => String(item[f.key] || '').toLowerCase().includes(q))
  })

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DatabaseZap size={22} className="text-cherenkov-400" />
            <h1 className="text-2xl font-bold font-display text-alloy-100">{title}</h1>
            <span className="px-2 py-0.5 font-mono text-xs rounded-sm bg-cherenkov-400/15 text-cherenkov-300 border border-cherenkov-400/30">
              {data.length} items
            </span>
          </div>
          {description && <p className="text-sm text-alloy-400">{description}</p>}
        </div>
        <button onClick={openNew} className="btn-primary !py-2.5">
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      <DemoBanner usingFallback={usingFallback} />

      {/* ---------------- SEARCH BAR ---------------- */}
      <div className="relative mt-6 mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-alloy-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Filter ${title.toLowerCase()}...`}
          className="w-full pl-10 pr-4 py-2.5 text-sm border rounded-sm bg-containment-950/60 border-containment-600 text-alloy-100 placeholder:text-alloy-500 focus:border-cherenkov-400 outline-none"
        />
      </div>

      {/* ---------------- DATA TABLE / LIST ---------------- */}
      <div className="overflow-hidden panel">
        <div className="divide-y divide-containment-600">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-containment-800/60 group"
            >
              {imageField && item[imageField.key] && (
                <img
                  src={item[imageField.key]}
                  alt=""
                  className="object-cover w-14 h-14 border rounded-sm shrink-0 border-containment-600 bg-containment-950"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate transition-colors text-alloy-100 group-hover:text-cherenkov-300">
                  {item[fields[0].key]}
                </p>
                {fields[1] && (
                  <p className="mt-1 font-mono text-xs truncate text-uranium-400">
                    {item[fields[1].key]}
                    {fields[2] && item[fields[2].key] ? ` · ${item[fields[2].key]}` : ''}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border rounded-sm border-containment-600 bg-containment-900 text-alloy-300 hover:text-cherenkov-300 hover:border-cherenkov-400/50"
                  aria-label="Edit"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(item.id)}
                  className="p-2 transition-colors border rounded-sm border-containment-600 bg-containment-900 text-alloy-400 hover:text-hazard hover:border-hazard/50 hover:bg-hazard/10"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-mono text-sm text-alloy-500">NO DATA RECORDS FOUND.</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- EDIT / NEW MODAL ---------------- */}
      {editing && (
        <div
          className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closeForm}
        >
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] p-6 overflow-y-auto corner-frame panel bg-containment-900 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-containment-600">
              <h2 className="flex items-center gap-2 text-xl font-bold font-display text-alloy-100">
                {editing === 'new' ? (
                  <>
                    <Plus size={18} className="text-cherenkov-400" /> Create New Entry
                  </>
                ) : (
                  <>
                    <Pencil size={18} className="text-cherenkov-400" /> Modify Database Entry
                  </>
                )}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="p-1 transition-colors rounded-sm text-alloy-400 hover:bg-containment-800 hover:text-alloy-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block mb-2 data-label">{f.label}</label>

                  {f.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      required={f.required !== false}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder || ''}
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none resize-y bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      required={f.required !== false}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    >
                      <option value="">Select option…</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'date' ? 'date' : 'text'}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={
                        f.type === 'image'
                          ? 'Paste image URL or upload file below...'
                          : f.placeholder || ''
                      }
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/70 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    />
                  )}

                  {/* Built-in Zero-Cost Image Uploader */}
                  {f.type === 'image' && (
                    <div className="mt-3">
                      <label className="flex items-center justify-center w-full gap-2 p-4 text-sm transition-all border border-dashed rounded-sm cursor-pointer border-cherenkov-400/50 bg-cherenkov-400/5 text-cherenkov-300 hover:border-cherenkov-400 hover:bg-cherenkov-400/10">
                        {uploading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <UploadCloud size={16} />
                        )}
                        {uploading
                          ? 'Optimizing & uploading photo...'
                          : 'Upload Photo from Computer (Auto-Compressed WebP)'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpload(e.target.files[0], f.key)}
                        />
                      </label>
                      {form[f.key] && !uploading && (
                        <div className="flex items-center gap-4 mt-3 p-2.5 border rounded-sm border-containment-600 bg-containment-950/60">
                          <img
                            src={form[f.key]}
                            alt="Preview"
                            className="object-cover w-20 h-20 rounded-sm border border-containment-600"
                          />
                          <div className="text-xs text-alloy-300 font-mono">
                            <p className="text-safety flex items-center gap-1">
                              <CheckCircle2 size={13} /> Image Ready
                            </p>
                            <button
                              type="button"
                              onClick={() => setForm({ ...form, [f.key]: '' })}
                              className="mt-2 text-hazard hover:underline"
                            >
                              Remove Image
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-6 mt-8 border-t border-containment-600">
              <button
                type="button"
                onClick={closeForm}
                className="justify-center btn-secondary !py-2.5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 justify-center btn-primary disabled:opacity-60"
              >
                <Save size={18} /> {saving ? 'Publishing to database…' : 'Save & Publish Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- DELETE CONFIRMATION ---------------- */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-5"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="w-full max-w-sm p-6 text-center corner-frame panel bg-containment-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={32} className="mx-auto mb-4 text-hazard" strokeWidth={1.5} />
            <h3 className="mb-2 text-xl font-bold font-display text-alloy-100">Confirm Deletion</h3>
            <p className="mb-8 text-sm leading-relaxed text-alloy-400">
              This action will permanently remove this record from the database.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 justify-center btn-secondary !py-2.5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 justify-center btn-primary !bg-hazard !from-hazard !to-hazard hover:!bg-hazard/80 !text-white !py-2.5"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TOAST NOTIFICATION ---------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 border rounded-sm shadow-xl backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-hazard/10 border-hazard/30 text-hazard'
                : 'bg-containment-900 border-cherenkov-400/50 text-alloy-100 shadow-glow'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <CheckCircle2 size={18} className="text-cherenkov-400" />
            )}
            <p className="text-sm font-medium">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
