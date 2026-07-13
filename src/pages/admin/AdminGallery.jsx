import AdminCollectionManager from './AdminCollectionManager.jsx'
import { gallery } from '../../data/dummyData.js'

export default function AdminGallery() {
  return (
    <AdminCollectionManager
      title="Gallery"
      description="Photos shown on the Home and Gallery pages."
      collectionName="gallery"
      fallbackData={gallery}
      fields={[
        { key: 'title', label: 'Caption', type: 'text' },
        { key: 'album', label: 'Album', type: 'text' },
        { key: 'url', label: 'Image URL', type: 'image' },
      ]}
    />
  )
}
