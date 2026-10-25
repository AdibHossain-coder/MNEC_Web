import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, ShieldCheck, UserPlus, KeyRound, Sparkles } from 'lucide-react'
import { useAuth, MASTER_ACCESS_CODE } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, registerAdmin, user } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accessCode, setAccessCode] = useState('')
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
      if (mode === 'register') {
        await registerAdmin(email, password, accessCode)
      } else {
        await login(email, password)
      }
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Authentication failed — check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleQuickDemoLogin() {
    setEmail('admin@mnec.mist.ac.bd')
    setPassword(MASTER_ACCESS_CODE)
  }

  return (
    <div className="relative flex items-center justify-center min-h-[82vh] py-16 overflow-hidden">
      {/* ---------------- BACKGROUND ELEMENTS ---------------- */}
      <div className="absolute inset-0 pointer-events-none hex-bg opacity-35" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-containment-900/60 to-containment-900" />

      <div className="relative z-10 w-full max-w-md container-page">
        {/* ---------------- HEADER ---------------- */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 border rounded-full border-cherenkov-400/50 bg-containment-800/80 shadow-glow">
            <ShieldCheck className="text-cherenkov-400" size={32} strokeWidth={1.5} />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight font-display text-alloy-100">
            MNEC CMS Portal
          </h1>
          <p className="text-sm leading-relaxed text-alloy-400">
            Executive Command Center — Upload photos, publish news, and manage panel, alumni, activities &amp; resources.
          </p>
        </div>

        {/* ---------------- MODE TABS ---------------- */}
        <div className="grid grid-cols-2 gap-2 p-1 mb-6 border rounded-sm border-containment-600 bg-containment-950/70">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setError('')
            }}
            className={`py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
              mode === 'login'
                ? 'bg-cherenkov-400 text-slate-950 font-bold shadow-glow'
                : 'text-alloy-400 hover:text-alloy-100'
            }`}
          >
            Executive Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setError('')
            }}
            className={`py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
              mode === 'register'
                ? 'bg-uranium-400 text-slate-950 font-bold shadow-glow-amber'
                : 'text-alloy-400 hover:text-alloy-100'
            }`}
          >
            Create Admin Account
          </button>
        </div>

        {/* ---------------- LOGIN / REGISTER FORM ---------------- */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5 corner-frame panel bg-containment-800/85">
          <div>
            <label className="block mb-2 data-label">Executive Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/70 border-containment-600 text-alloy-100 placeholder:text-alloy-500 focus:border-cherenkov-400"
              placeholder="admin@mnec.mist.ac.bd"
            />
          </div>

          <div>
            <label className="block mb-2 data-label">
              {mode === 'register' ? 'Choose Password (min 6 chars)' : 'Passcode / Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm transition-colors border rounded-sm outline-none bg-containment-950/70 border-containment-600 text-alloy-100 placeholder:text-alloy-500 focus:border-cherenkov-400"
              placeholder="••••••••"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="flex items-center gap-1.5 mb-2 data-label text-uranium-400">
                <KeyRound size={12} /> MNEC Club Authorization Code
              </label>
              <input
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-3 text-sm font-mono transition-colors border rounded-sm outline-none bg-containment-950/70 border-uranium-400/50 text-alloy-100 placeholder:text-alloy-500 focus:border-uranium-400"
                placeholder="MNEC-2026"
              />
            </div>
          )}

          {error && (
            <div className="px-3.5 py-2.5 text-xs leading-relaxed border rounded-sm bg-hazard/10 border-hazard/40 text-hazard font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="justify-center w-full mt-2 btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {mode === 'register' ? <UserPlus size={18} /> : <LogIn size={18} />}
            {submitting
              ? 'Authenticating...'
              : mode === 'register'
              ? 'Register & Enter CMS'
              : 'Enter CMS Dashboard'}
          </button>

          {/* Instant Fill Helper for Club Owner */}
          <div className="pt-4 border-t border-containment-600/80 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-alloy-400">
              Master Key: <strong className="text-cherenkov-300">{MASTER_ACCESS_CODE}</strong>
            </span>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-uranium-300 hover:text-uranium-400 underline underline-offset-4"
            >
              <Sparkles size={11} /> Auto-fill Master Key
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
