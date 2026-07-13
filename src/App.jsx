import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

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

import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminNews from './pages/admin/AdminNews.jsx'
import AdminPanel from './pages/admin/AdminPanel.jsx'
import AdminAlumni from './pages/admin/AdminAlumni.jsx'
import AdminActivities from './pages/admin/AdminActivities.jsx'
import AdminResources from './pages/admin/AdminResources.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'

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
  )
}
