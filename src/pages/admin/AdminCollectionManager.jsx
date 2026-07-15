import { useState } from 'react'
import {
  collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Plus, Pencil, Trash2, X, Save, UploadCloud, Loader2, DatabaseZap } from 'lucide-react'
import { db, storage, isFirebaseConfigured } from '../../lib/firebase.js'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection.js'
import DemoBanner from '../../components/DemoBanner.jsx'

export default function AdminCollectionManager({ title, description, collectionName, fields, fallbackData }) {
  const { data, usingFallback } = useFirestoreCollection(collectionName, fallbackData)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  function openNew() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, '']))
    setForm(blank)
    setEditing('new')
  }

  function openEdit(item) {
    setForm(item)
    setEditing(item.id)
  }

  function closeForm() {
    setEditing(null)
    setForm({})
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!isFirebaseConfigured) return
    setSaving(true)
    try {
      const payload = { ...form }
      delete payload.id
      if (editing === 'new') {
        await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp() })
      } else {
        await updateDoc(doc(db, collectionName, editing), payload)
      }
      closeForm()
    } catch (err) {
      alert('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!isFirebaseConfigured) return
    try {
      await deleteDoc(doc(db, collectionName, id))
      setConfirmDelete(null)
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  async function handleUpload(file, key) {
    if (!file || !isFirebaseConfigured) return
    setUploading(true)
    try {
      const path = `${collectionName}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setForm((f) => ({ ...f, [key]: url }))
    } catch (err) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DatabaseZap size={22} className="text-cherenkov-400" />
            <h1 className="text-2xl font-bold font-display text-alloy-100">{title}</h1>
          </div>
          {description && <p className="text-sm text-alloy-400">{description}</p>}
        </div>
        <button onClick={openNew} disabled={!isFirebaseConfigured} className="btn-primary !py-2.5 disabled:opacity-50">
          <Plus size={16} /> Add New Entry
        </button>
      </div>

      <DemoBanner usingFallback={usingFallback} />

      {/* ---------------- DATA TABLE / LIST ---------------- */}
      <div className="mt-8 overflow-hidden panel">
        <div className="divide-y divide-containment-600">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-containment-800/60 group">
              {fields.some((f) => f.type === 'image') && item[fields.find((f) => f.type === 'image').key] && (
                <img
                  src={item[fields.find((f) => f.type === 'image').key]}
                  alt=""
                  className="object-cover w-12 h-12 border rounded-sm shrink-0 border-containment-600"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate transition-colors text-alloy-100 group-hover:text-cherenkov-300">{item[fields[0].key]}</p>
                {fields[1] && <p className="mt-1 font-mono text-xs truncate text-alloy-500">{item[fields[1].key]}</p>}
              </div>
              <div className="flex items-center gap-1 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <button onClick={() => openEdit(item)} className="p-2 transition-colors border rounded-sm border-containment-600 bg-containment-900 text-alloy-400 hover:text-cherenkov-300 hover:border-cherenkov-400/50" aria-label="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => setConfirmDelete(item.id)} className="p-2 transition-colors border rounded-sm border-containment-600 bg-containment-900 text-alloy-400 hover:text-hazard hover:border-hazard/50 hover:bg-hazard/10" aria-label="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-mono text-sm text-alloy-500">NO DATA RECORDS FOUND.</p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- EDIT / NEW MODAL ---------------- */}
      {editing && (
        <div className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={closeForm}>
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] p-6 overflow-y-auto corner-frame panel bg-containment-900 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-containment-600">
              <h2 className="flex items-center gap-2 text-xl font-bold font-display text-alloy-100">
                {editing === 'new' ? <><Plus size={18} className="text-cherenkov-400"/> Create New Entry</> : <><Pencil size={18} className="text-cherenkov-400"/> Modify Database Entry</>}
              </h2>
              <button type="button" onClick={closeForm} className="p-1 transition-colors rounded-sm text-alloy-500 hover:bg-containment-800 hover:text-alloy-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block mb-2 data-label">{f.label}</label>
                  
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={5}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none resize-y bg-containment-950/50 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/50 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    >
                      <option value="">Select option…</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'date' ? 'date' : 'text'}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/50 border-containment-600 text-alloy-100 focus:border-cherenkov-400"
                    />
                  )}
                  
                  {/* Image Upload Input */}
                  {f.type === 'image' && (
                    <div className="mt-3">
                      <label className="flex items-center justify-center w-full gap-2 p-4 text-sm transition-all border border-dashed rounded-sm cursor-pointer border-containment-500 bg-containment-950/30 text-alloy-400 hover:border-cherenkov-400 hover:text-cherenkov-300">
                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                        {uploading ? 'Transmitting data...' : 'Click to select image file'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUpload(e.target.files[0], f.key)}
                        />
                      </label>
                      {form[f.key] && !uploading && (
                        <div className="mt-3 overflow-hidden border rounded-sm w-fit border-containment-600">
                           <img src={form[f.key]} alt="Preview" className="object-cover h-20 max-w-full" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 mt-8 border-t border-containment-600">
              <button type="submit" disabled={saving || uploading} className="justify-center w-full btn-primary disabled:opacity-60">
                <Save size={18} /> {saving ? 'Writing to database…' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- DELETE CONFIRMATION ---------------- */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-5" onClick={() => setConfirmDelete(null)}>
          <div className="w-full max-w-sm p-6 text-center corner-frame panel bg-containment-900" onClick={(e) => e.stopPropagation()}>
            <Trash2 size={32} className="mx-auto mb-4 text-hazard" strokeWidth={1.5} />
            <h3 className="mb-2 text-xl font-bold font-display text-alloy-100">Confirm Deletion</h3>
            <p className="mb-8 text-sm leading-relaxed text-alloy-400">This action will permanently remove this record from the database. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 justify-center btn-secondary !py-2.5">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 justify-center btn-primary !bg-hazard hover:!bg-hazard/80 hover:shadow-[0_0_20px_rgba(232,84,42,0.3)] !py-2.5">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}