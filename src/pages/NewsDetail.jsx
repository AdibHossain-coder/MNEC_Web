import { Link, useParams } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { news as dummyNews } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'
import Loader from '../components/Loader.jsx'

export default function NewsDetail() {
  const { id } = useParams()
  const { data, loading } = useFirestoreCollection('news', dummyNews, 'date')
  const article = data.find((n) => n.id === id)

  if (loading) return <Loader label="Fetching log data" />

  if (!article) {
    return (
      <div className="py-32 text-center container-page">
        <div className="inline-block p-8 border border-dashed rounded-sm border-containment-600 bg-containment-800/20">
          <p className="mb-6 font-mono text-alloy-400">ERROR 404: LOG NOT FOUND IN DATABASE.</p>
          <Link to="/news" className="btn-secondary">
            <ArrowLeft size={16} /> Return to Archives
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="pb-20 lg:pb-28">
      {/* ---------------- HERO ---------------- */}
      <div className="relative h-[55vh] min-h-[400px] border-b border-containment-600">
        <img src={article.cover} alt="" className="absolute inset-0 object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-containment-900 via-containment-900/70 to-containment-900/30" />
        
        <div className="relative flex flex-col justify-end h-full pb-12 container-page">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border rounded-full shadow-sm w-fit border-uranium-500/30 bg-containment-900/60 backdrop-blur-md">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-uranium-400" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-uranium-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-uranium-300">
              {article.tag}
            </span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-alloy-100 max-w-4xl leading-[1.15] tracking-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* ---------------- ARTICLE BODY ---------------- */}
      <div className="py-12 container-page lg:py-16">
        <div className="max-w-[65ch] mx-auto">
          
          {/* Metadata Block */}
          <div className="flex flex-wrap items-center gap-6 py-2 pb-6 pl-4 mb-10 text-sm border-l-2 border-cherenkov-500/30 text-alloy-400 bg-gradient-to-r from-containment-800/40 to-transparent">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-cherenkov-400" />
              <span className="font-mono uppercase tracking-wider text-[11px]">Date:</span>
              {new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <User size={15} className="text-cherenkov-400" />
              <span className="font-mono uppercase tracking-wider text-[11px]">Author:</span>
              {article.author}
            </span>
          </div>

          {/* Typography for long-form reading */}
          <div className="text-lg leading-[1.8] text-alloy-300 whitespace-pre-line font-serif-reading">
            {article.body}
          </div>

          {/* Footer Action */}
          <div className="pt-10 mt-16 border-t border-containment-600">
            <Link to="/news" className="inline-flex btn-secondary">
              <ArrowLeft size={16} /> Back to Bulletin
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}