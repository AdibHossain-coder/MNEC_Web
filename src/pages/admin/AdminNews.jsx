import AdminCollectionManager from './AdminCollectionManager.jsx'
import { news } from '../../data/dummyData.js'

export default function AdminNews() {
  return (
    <AdminCollectionManager
      title="News & Announcements"
      description="Posts shown on the Home and News pages."
      collectionName="news"
      fallbackData={news}
      fields={[
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'tag', label: 'Tag', type: 'select', options: ['Event', 'Achievement', 'Seminar', 'Announcement'] },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'author', label: 'Author', type: 'text' },
        { key: 'excerpt', label: 'Short excerpt', type: 'textarea' },
        { key: 'body', label: 'Full article body', type: 'textarea' },
        { key: 'cover', label: 'Cover image URL', type: 'image' },
      ]}
    />
  )
}
