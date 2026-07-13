import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center container-page">
      <AlertTriangle className="text-uranium-400 mb-5" size={40} />
      <p className="font-mono text-xs tracking-widest text-alloy-500 uppercase mb-2">Error 404</p>
      <h1 className="font-display text-3xl font-bold text-alloy-100 mb-4">This page went critical (missing).</h1>
      <p className="text-alloy-400 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
