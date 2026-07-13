import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Loader from './Loader.jsx'
import { isFirebaseConfigured } from '../lib/firebase.js'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (!isFirebaseConfigured) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-alloy-300">
          Connect Firebase (see <code className="text-cherenkov-300">.env.example</code>) to enable the admin dashboard.
        </p>
      </div>
    )
  }

  if (loading) return <Loader label="Verifying access" />
  if (!user) return <Navigate to="/login" replace />
  return children
}
