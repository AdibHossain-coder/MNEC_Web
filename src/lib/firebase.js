import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Reads from .env.local if present, with fallback to the MNEC Firebase project
// so GitHub Pages deployments work out-of-the-box without missing env vars.
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    'AIzaSyAgwJeQUS-1ZLGNYgAMOTusjrRhwa0fLZQ',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    'nuclearclubmist.firebaseapp.com',
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    'nuclearclubmist',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'nuclearclubmist.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    '771196145693',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    '1:771196145693:web:1bb468495f75146a5fb6f4',
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
)

let app, auth, db, storage

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
}

export { app, auth, db, storage }
