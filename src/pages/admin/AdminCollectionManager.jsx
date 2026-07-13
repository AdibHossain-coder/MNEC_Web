import { useState } from 'react'
import {
  collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Plus, Pencil, Trash2, X, Save, UploadCloud, Loader2 } from 'lucide-react'
import { db, storage, isFirebaseConfigured } from '../../lib/firebase.js'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection.js'
import DemoBanner from '../../components/DemoBanner.jsx'

/**
 * Config-driven CRUD screen.
 * fields: [{ key, label, type: 'text'|'textarea'|'date'|'image'|'select', options? }]
 */
export default function AdminCollectionManager({ title, description, collectionName, fields, fallbackData }) {
  const { data, usingFallback } = useFirestoreCollection(collectionName, fallbackData)
  const [editing, setEditing] = useState(null) // null | 'new' | doc object
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
    <div>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-alloy-100">{title}</h1>
          {description && <p className="text-sm text-alloy-400 mt-1">{description}</p>}
        </div>
        <button onClick={openNew} disabled={!isFirebaseConfigured} className="btn-primary !py-2.5 disabled:opacity-50">
          <Plus size={16} /> Add new
        </button>
      </div>

      <DemoBanner usingFallback={usingFallback} />

      <div className="mt-6 panel divide-y divide-containment-600">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            {fields.some((f) => f.type === 'image') && item[fields.find((f) => f.type === 'image').key] && (
              <img
                src={item[fields.find((f) => f.type === 'image').key]}
                alt=""
                className="w-12 h-12 rounded-sm object-cover shrink-0 border border-containment-600"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-alloy-100 font-medium truncate">{item[fields[0].key]}</p>
              {fields[1] && <p className="text-xs text-alloy-500 font-mono mt-0.5 truncate">{item[fields[1].key]}</p>}
            </div>
            <button onClick={() => openEdit(item)} className="p-2 text-alloy-400 hover:text-cherenkov-300" aria-label="Edit">
              <Pencil size={15} />
            </button>
            <button onClick={() => setConfirmDelete(item.id)} className="p-2 text-alloy-400 hover:text-hazard" aria-label="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {data.length === 0 && <p className="p-8 text-center text-alloy-500 text-sm">No entries yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-5" onClick={closeForm}>
          <form
            onSubmit={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="panel bg-containment-900 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold text-alloy-100">
                {editing === 'new' ? 'Add entry' : 'Edit entry'}
              </h2>
              <button type="button" onClick={closeForm} className="text-alloy-400 hover:text-alloy-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="data-label block mb-1.5">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-containment-800 border border-containment-600 rounded-sm px-3 py-2 text-sm text-alloy-100 focus:border-cherenkov-400 outline-none"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-containment-800 border border-containment-600 rounded-sm px-3 py-2 text-sm text-alloy-100 focus:border-cherenkov-400 outline-none"
                    >
                      <option value="">Select…</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'date' ? 'date' : 'text'}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-containment-800 border border-containment-600 rounded-sm px-3 py-2 text-sm text-alloy-100 focus:border-cherenkov-400 outline-none"
                    />
                  )}
                  {f.type === 'image' && (
                    <label className="mt-2 flex items-center gap-2 text-xs text-cherenkov-300 cursor-pointer w-fit">
                      {uploading ? <Loader2 size={13} className="animate-spin" /> : <UploadCloud size={13} />}
                      {uploading ? 'Uploading…' : 'Or upload an image file'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpload(e.target.files[0], f.key)}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center mt-6 disabled:opacity-60">
              <Save size={16} /> {saving ? 'Saving…' : 'Save entry'}
            </button>
          </form>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[100] bg-containment-950/90 backdrop-blur-sm flex items-center justify-center p-5" onClick={() => setConfirmDelete(null)}>
          <div className="panel bg-containment-900 p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-alloy-100 mb-5">Delete this entry permanently? This can't be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} className="btn-primary !bg-hazard hover:!bg-hazard/80 flex-1 justify-center">
                Delete
              </button>
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1 justify-center">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
