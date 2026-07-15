import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

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

export default function App() {
  return (
    <Suspense fallback={<Loader label="Initializing Module" />}>
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
              <AdminLayout />
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
        </Route>
      </Routes>
    </Suspense>
  )
}