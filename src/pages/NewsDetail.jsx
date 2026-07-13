import { Link, useParams } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { news as dummyNews } from '../data/dummyData.js'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection.js'
import Loader from '../components/Loader.jsx'

export default function NewsDetail() {
  const { id } = useParams()
  const { data, loading } = useFirestoreCollection('news', dummyNews, 'date')
  const article = data.find((n) => n.id === id)

  if (loading) return <Loader label="Fetching article" />

  if (!article) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-alloy-300 mb-4">That article couldn't be found — it may have been moved.</p>
        <Link to="/news" className="btn-secondary inline-flex">
          <ArrowLeft size={16} /> Back to News
        </Link>
      </div>
    )
  }

  return (
    <article>
      <div className="relative h-[45vh] min-h-[320px]">
        <img src={article.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-containment-900 via-containment-900/60 to-containment-900/30" />
        <div className="container-page relative h-full flex flex-col justify-end pb-10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-uranium-400 border border-uranium-500/30 px-2 py-0.5 w-fit mb-4">
            {article.tag}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-alloy-100 max-w-3xl leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="container-page py-12 max-w-3xl">
        <div className="flex items-center gap-6 text-sm text-alloy-400 mb-8 divider-dashed pb-6">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-cherenkov-400" />
            {new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-2">
            <User size={14} className="text-cherenkov-400" />
            {article.author}
          </span>
        </div>

        <p className="text-alloy-200 text-lg leading-relaxed whitespace-pre-line">{article.body}</p>

        <Link to="/news" className="btn-secondary mt-12 inline-flex">
          <ArrowLeft size={16} /> Back to all news
        </Link>
      </div>
    </article>
  )
}
