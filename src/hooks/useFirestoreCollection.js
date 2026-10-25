import { useEffect, useState, useCallback } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase.js'

const LOCAL_PREFIX = 'mnec_cms_collection_'

export function getLocalCollection(collectionName) {
  try {
    const raw = localStorage.getItem(LOCAL_PREFIX + collectionName)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveLocalCollection(collectionName, items) {
  try {
    localStorage.setItem(LOCAL_PREFIX + collectionName, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('mnec-cms-updated', { detail: { collectionName } }))
  } catch (err) {
    console.error('Local CMS storage error:', err)
  }
}

/**
 * Subscribes to a Firestore collection in real time.
 * Also supports local CMS persistence so changes made in /admin work
 * immediately even before Firestore security rules or collections are initialized.
 */
export function useFirestoreCollection(collectionName, fallbackData = [], orderField = null) {
  const [data, setData] = useState(() => getLocalCollection(collectionName) || fallbackData)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [usingFallback, setUsingFallback] = useState(() => !getLocalCollection(collectionName))
  const [error, setError] = useState(null)

  const syncFromLocal = useCallback(() => {
    const localData = getLocalCollection(collectionName)
    if (localData && localData.length > 0) {
      setData(localData)
      setUsingFallback(false)
    }
  }, [collectionName])

  useEffect(() => {
    const onLocalUpdate = (e) => {
      if (!e.detail || e.detail.collectionName === collectionName) {
        syncFromLocal()
      }
    }
    window.addEventListener('mnec-cms-updated', onLocalUpdate)
    return () => window.removeEventListener('mnec-cms-updated', onLocalUpdate)
  }, [collectionName, syncFromLocal])

  useEffect(() => {
    const localCached = getLocalCollection(collectionName)
    if (!isFirebaseConfigured || !db) {
      setData(localCached || fallbackData)
      setUsingFallback(!localCached)
      setLoading(false)
      return
    }

    const ref = collection(db, collectionName)
    const q = orderField ? query(ref, orderBy(orderField, 'desc')) : ref

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          const local = getLocalCollection(collectionName)
          if (local && local.length > 0) {
            setData(local)
            setUsingFallback(false)
          } else {
            setData(fallbackData)
            setUsingFallback(true)
          }
        } else {
          const remoteDocs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
          setData(remoteDocs)
          setUsingFallback(false)
        }
        setLoading(false)
      },
      (err) => {
        console.warn(`Firestore read fallback for "${collectionName}":`, err.message)
        setError(err)
        const local = getLocalCollection(collectionName)
        setData(local || fallbackData)
        setUsingFallback(!local)
        setLoading(false)
      }
    )
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, orderField])

  return { data, loading, usingFallback, error }
}
