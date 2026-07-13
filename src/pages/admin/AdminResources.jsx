import AdminCollectionManager from './AdminCollectionManager.jsx'
import { resources } from '../../data/dummyData.js'

export default function AdminResources() {
  return (
    <AdminCollectionManager
      title="Resources"
      description="Downloadable materials shown on the Resources page."
      collectionName="resources"
      fallbackData={resources}
      fields={[
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'category', label: 'Category', type: 'text' },
        { key: 'type', label: 'File type', type: 'select', options: ['PDF', 'Tool', 'Image', 'Link'] },
        { key: 'size', label: 'File size (e.g. 2.4 MB)', type: 'text' },
        { key: 'link', label: 'File / download URL', type: 'text' },
      ]}
    />
  )
}
