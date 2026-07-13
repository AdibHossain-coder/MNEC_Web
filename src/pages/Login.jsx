import { useState } from 'react'
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

  if (user) navigate('/admin')

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
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto text-cherenkov-400 mb-4" size={36} strokeWidth={1.5} />
          <h1 className="font-display text-2xl font-bold text-alloy-100">Executive Login</h1>
          <p className="text-sm text-alloy-400 mt-2">Panel access for managing news, gallery, and members.</p>
        </div>

        {!isFirebaseConfigured && (
          <div className="mb-6 flex items-start gap-2 bg-uranium-400/10 border border-uranium-500/30 text-uranium-300 text-xs font-mono p-3">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            Firebase isn't configured yet. Add your project keys to .env.local to enable sign-in.
          </div>
        )}

        <form onSubmit={handleSubmit} className="panel p-6 space-y-4">
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

          {error && <p className="text-hazard text-xs">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
            <LogIn size={16} />
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-alloy-500 mt-6">
          Accounts are created by an existing admin via the Firebase console — there is no public sign-up.
        </p>
      </div>
    </div>
  )
}
