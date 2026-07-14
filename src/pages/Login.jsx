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
    <div className="min-h-[80vh] flex items-center justify-center container-page py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <ShieldCheck className="mx-auto mb-4 text-cherenkov-400" size={36} strokeWidth={1.5} />
          <h1 className="text-2xl font-bold font-display text-alloy-100">Executive Login</h1>
          <p className="mt-2 text-sm text-alloy-400">Panel access for managing news, gallery, and members.</p>
        </div>

        {!isFirebaseConfigured && (
          <div className="flex items-start gap-2 p-3 mb-6 font-mono text-xs border bg-uranium-400/10 border-uranium-500/30 text-uranium-300">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            Firebase isn't configured yet. Add your project keys to .env.local to enable sign-in.
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4 panel">
          <div>
            <label className="data-label block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-containment-900 border border-containment-600 rounded-sm px-3 py-2.5 text-sm text-alloy-100 focus:border-cherenkov-400 outline-none"
              placeholder="exec@mist.ac.bd"
            />
          </div>
          <div>
            <label className="data-label block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-containment-900 border border-containment-600 rounded-sm px-3 py-2.5 text-sm text-alloy-100 focus:border-cherenkov-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-hazard">{error}</p>}

          <button type="submit" disabled={submitting} className="justify-center w-full btn-primary disabled:opacity-60">
            <LogIn size={16} />
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-alloy-500">
          Accounts are created by an existing admin via the Firebase console — there is no public sign-up.
        </p>
      </div>
    </div>
  )
}