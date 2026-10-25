import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Loader from './components/Loader.jsx'

// Lazy load public pages
const Home = lazy(() => import('./pages/Home.jsx'))
const News = lazy(() => import('./pages/News.jsx'))
const NewsDetail = lazy(() => import('./pages/NewsDetail.jsx'))
const Panel = lazy(() => import('./pages/Panel.jsx'))
const Alumni = lazy(() => import('./pages/Alumni.jsx'))
const Activities = lazy(() => import('./pages/Activities.jsx'))
const Resources = lazy(() => import('./pages/Resources.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Lazy load admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminNews = lazy(() => import('./pages/admin/AdminNews.jsx'))
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel.jsx'))
const AdminAlumni = lazy(() => import('./pages/admin/AdminAlumni.jsx'))
const AdminActivities = lazy(() => import('./pages/admin/AdminActivities.jsx'))
const AdminResources = lazy(() => import('./pages/admin/AdminResources.jsx'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery.jsx'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings.jsx'))

// Reusable wrapper for smooth page entrances
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="flex flex-col flex-1"
  >
    {children}
  </motion.div>
)

export default function App() {
  return (
    <Suspense fallback={<Loader label="Initializing Module" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          <Route path="/news/:id" element={<PageTransition><NewsDetail /></PageTransition>} />
          <Route path="/panel" element={<PageTransition><Panel /></PageTransition>} />
          <Route path="/alumni" element={<PageTransition><Alumni /></PageTransition>} />
          <Route path="/activities" element={<PageTransition><Activities /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="news" element={<PageTransition><AdminNews /></PageTransition>} />
          <Route path="panel" element={<PageTransition><AdminPanel /></PageTransition>} />
          <Route path="alumni" element={<PageTransition><AdminAlumni /></PageTransition>} />
          <Route path="activities" element={<PageTransition><AdminActivities /></PageTransition>} />
          <Route path="resources" element={<PageTransition><AdminResources /></PageTransition>} />
          <Route path="gallery" element={<PageTransition><AdminGallery /></PageTransition>} />
          <Route path="settings" element={<PageTransition><AdminSettings /></PageTransition>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
