import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, ShieldCheck, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { isFirebaseConfigured } from '../lib/firebase.js'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate('/admin')
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Could not sign in — check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] py-16 overflow-hidden">
      {/* ---------------- BACKGROUND ELEMENTS ---------------- */}
      <div className="absolute inset-0 pointer-events-none hex-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-containment-900/60 to-containment-900" />
      
      <div className="relative z-10 w-full max-w-md container-page">
        {/* ---------------- HEADER ---------------- */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border rounded-full border-containment-600 bg-containment-800/50 shadow-glow">
            <ShieldCheck className="text-cherenkov-400" size={32} strokeWidth={1.5} />
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight font-display text-alloy-100">Executive Login</h1>
          <p className="text-sm leading-relaxed text-alloy-400">Panel access for managing news, gallery, and members.</p>
        </div>

        {/* ---------------- WARNING BANNER ---------------- */}
        {!isFirebaseConfigured && (
          <div className="flex items-start gap-3 p-4 mb-6 border rounded-sm bg-uranium-500/10 border-uranium-500/30 text-uranium-300 backdrop-blur-sm">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <p className="font-mono text-xs leading-relaxed tracking-wide">
              SYSTEM ALERT: Firebase is not configured. Add project keys to .env.local to enable authentication.
            </p>
          </div>
        )}

        {/* ---------------- LOGIN FORM ---------------- */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5 corner-frame panel bg-containment-800/80">
          <div>
            <label className="block mb-2 data-label">Email Designation</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-900/50 border-containment-600 text-alloy-100 placeholder:text-alloy-600 focus:border-cherenkov-400 focus:bg-containment-800"
              placeholder="exec@mist.ac.bd"
            />
          </div>
          <div>
            <label className="block mb-2 data-label">Passcode</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-900/50 border-containment-600 text-alloy-100 placeholder:text-alloy-600 focus:border-cherenkov-400 focus:bg-containment-800"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="px-3 py-2 text-sm border rounded-sm bg-hazard/10 border-hazard/30 text-hazard">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={submitting} 
            className="justify-center w-full mt-2 btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogIn size={18} />
            {submitting ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-alloy-500">
          Accounts are provisioned exclusively by system administrators via the Firebase console. Public registration is disabled.
        </p>
      </div>
    </div>
  )
}