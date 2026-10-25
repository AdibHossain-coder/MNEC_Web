import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase.js'

const AuthContext = createContext(null)
const LOCAL_SESSION_KEY = 'mnec_exec_session'
export const MASTER_ACCESS_CODE = 'MNEC-2026'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_SESSION_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        // Check if there is an active local executive session
        try {
          const saved = localStorage.getItem(LOCAL_SESSION_KEY)
          setUser(saved ? JSON.parse(saved) : null)
        } catch {
          setUser(null)
        }
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  async function login(email, password) {
    // Allow direct Master Access Code login or standard Firebase Auth login
    if (password === MASTER_ACCESS_CODE) {
      if (isFirebaseConfigured && auth) {
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password)
          return cred
        } catch {
          try {
            const cred = await createUserWithEmailAndPassword(auth, email, password)
            return cred
          } catch {
            // Fall through to local executive session if Firebase Auth email provider isn't enabled yet
          }
        }
      }
      const sessionUser = { email: email || 'admin@mnec.mist.ac.bd', uid: 'mnec-exec-local', isLocalExec: true }
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser))
      setUser(sessionUser)
      return sessionUser
    }

    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase Auth is not reachable. Use passcode MNEC-2026 for Executive Access.')
    }

    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      if (
        err.code === 'auth/configuration-not-found' ||
        err.code === 'auth/operation-not-allowed'
      ) {
        throw new Error(
          'Email/Password sign-in is not enabled in Firebase Console yet. Enable it in Firebase Console → Authentication → Sign-in method, OR use Master Passcode: MNEC-2026'
        )
      }
      throw err
    }
  }

  async function registerAdmin(email, password, accessCode) {
    if (accessCode.trim() !== MASTER_ACCESS_CODE) {
      throw new Error('Invalid MNEC Executive Access Code. (Use: MNEC-2026)')
    }
    if (isFirebaseConfigured && auth) {
      try {
        return await createUserWithEmailAndPassword(auth, email, password)
      } catch (err) {
        if (
          err.code === 'auth/configuration-not-found' ||
          err.code === 'auth/operation-not-allowed'
        ) {
          // Fallback to local executive session so the admin is never locked out
          const sessionUser = { email, uid: 'mnec-exec-local', isLocalExec: true }
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser))
          setUser(sessionUser)
          return sessionUser
        }
        throw err
      }
    }
    const sessionUser = { email, uid: 'mnec-exec-local', isLocalExec: true }
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionUser))
    setUser(sessionUser)
    return sessionUser
  }

  async function logout() {
    localStorage.removeItem(LOCAL_SESSION_KEY)
    setUser(null)
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth)
      } catch {
        // Ignore signOut error if not signed into firebase
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, registerAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
