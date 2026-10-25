import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../lib/firebase.js'
import { clubInfo as defaultClubInfo } from '../data/dummyData.js'

const LOCAL_CLUB_KEY = 'mnec_cms_club_info'

export function getLocalClubInfo() {
  try {
    const raw = localStorage.getItem(LOCAL_CLUB_KEY)
    if (!raw) return null
    return { ...defaultClubInfo, ...JSON.parse(raw) }
  } catch {
    return null
  }
}

export async function saveClubInfo(updatedInfo) {
  // Always save locally for instant UI reactivity
  localStorage.setItem(LOCAL_CLUB_KEY, JSON.stringify(updatedInfo))
  window.dispatchEvent(new CustomEvent('mnec-clubinfo-updated'))

  // Also write to Firestore settings/clubInfo if configured
  if (isFirebaseConfigured && db) {
    const ref = doc(db, 'settings', 'clubInfo')
    await setDoc(ref, updatedInfo, { merge: true })
  }
}

export function useClubInfo() {
  const [info, setInfo] = useState(() => getLocalClubInfo() || defaultClubInfo)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    const onLocal = () => {
      const local = getLocalClubInfo()
      if (local) setInfo(local)
    }
    window.addEventListener('mnec-clubinfo-updated', onLocal)
    return () => window.removeEventListener('mnec-clubinfo-updated', onLocal)
  }, [])

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoading(false)
      return
    }
    const ref = doc(db, 'settings', 'clubInfo')
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const merged = { ...defaultClubInfo, ...snap.data() }
          setInfo(merged)
          localStorage.setItem(LOCAL_CLUB_KEY, JSON.stringify(merged))
        }
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  return { clubInfo: info, loading }
}
