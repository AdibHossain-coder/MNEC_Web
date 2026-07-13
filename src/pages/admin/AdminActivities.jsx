import AdminCollectionManager from './AdminCollectionManager.jsx'
import { activities } from '../../data/dummyData.js'

export default function AdminActivities() {
  return (
    <AdminCollectionManager
      title="Activities & Programs"
      description="Recurring programs shown on the Home and Activities pages."
      collectionName="activities"
      fallbackData={activities}
      fields={[
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'category', label: 'Category', type: 'text' },
        { key: 'frequency', label: 'Frequency', type: 'select', options: ['Weekly', 'Monthly', 'Bi-annual', 'Yearly', 'Ongoing'] },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'icon', label: 'Icon', type: 'select', options: ['Atom', 'Brain', 'ShieldAlert', 'FlaskConical', 'MapPin', 'Users'] },
      ]}
    />
  )
}
