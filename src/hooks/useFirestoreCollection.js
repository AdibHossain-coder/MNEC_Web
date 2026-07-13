import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase.js'

/**
 * Subscribes to a Firestore collection in real time.
 * Falls back to the provided dummy dataset when Firebase isn't configured
 * yet, or when the live collection is still empty (fresh project).
 *
 * @param {string} collectionName
 * @param {Array}  fallbackData
 * @param {string} orderField  field to sort by, descending
 */
export function useFirestoreCollection(collectionName, fallbackData = [], orderField = null) {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(isFirebaseConfigured)
  const [usingFallback, setUsingFallback] = useState(!isFirebaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setData(fallbackData)
      setUsingFallback(true)
      setLoading(false)
      return
    }

    const ref = collection(db, collectionName)
    const q = orderField ? query(ref, orderBy(orderField, 'desc')) : ref

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setData(fallbackData)
          setUsingFallback(true)
        } else {
          setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
          setUsingFallback(false)
        }
        setLoading(false)
      },
      (err) => {
        console.error(`Firestore read failed for "${collectionName}":`, err)
        setError(err)
        setData(fallbackData)
        setUsingFallback(true)
        setLoading(false)
      }
    )
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])

  return { data, loading, usingFallback, error }
}
