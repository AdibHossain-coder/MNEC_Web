import AdminCollectionManager from './AdminCollectionManager.jsx'
import { alumni } from '../../data/dummyData.js'

export default function AdminAlumni() {
  return (
    <AdminCollectionManager
      title="Alumni"
      description="Distinguished former members shown on the Alumni page."
      collectionName="alumni"
      fallbackData={alumni}
      fields={[
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'batch', label: 'Batch', type: 'text' },
        { key: 'role', label: 'Former role in club', type: 'text' },
        { key: 'current', label: 'Current position', type: 'text' },
        { key: 'photo', label: 'Photo URL', type: 'image' },
      ]}
    />
  )
}
