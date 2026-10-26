import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Loader from './components/Loader.jsx'

// Eagerly load public pages (~18 KB gzip total) for instant 0ms tab transitions
import Home from './pages/Home.jsx'
import News from './pages/News.jsx'
import NewsDetail from './pages/NewsDetail.jsx'
import Panel from './pages/Panel.jsx'
import Alumni from './pages/Alumni.jsx'
import Activities from './pages/Activities.jsx'
import Resources from './pages/Resources.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'

// Lazy load admin CMS pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminNews = lazy(() => import('./pages/admin/AdminNews.jsx'))
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel.jsx'))
const AdminAlumni = lazy(() => import('./pages/admin/AdminAlumni.jsx'))
const AdminActivities = lazy(() => import('./pages/admin/AdminActivities.jsx'))
const AdminResources = lazy(() => import('./pages/admin/AdminResources.jsx'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery.jsx'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader label="Initializing CMS" />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="panel" element={<AdminPanel />} />
        <Route path="alumni" element={<AdminAlumni />} />
        <Route path="activities" element={<AdminActivities />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
