import AdminCollectionManager from './AdminCollectionManager.jsx'
import { resources } from '../../data/dummyData.js'

export default function AdminResources() {
  return (
    <AdminCollectionManager
      title="Technical & Career Resources"
      description="Job seminar compendiums, IAEA safety guides, lecture notes, and simulation tools shown on the Resources page."
      collectionName="resources"
      fallbackData={resources}
      fields={[
        { key: 'title', label: 'Title', type: 'text' },
        {
          key: 'category',
          label: 'Category',
          type: 'select',
          options: [
            'Career & Job Seminars',
            'Nuclear Safety Awareness',
            'Coursework',
            'Lab Manual',
            'Software',
            'Competition Prep',
          ],
        },
        { key: 'type', label: 'File type', type: 'select', options: ['PDF', 'Tool', 'Image', 'Link'] },
        { key: 'size', label: 'File size (e.g. 3.8 MB)', type: 'text' },
        {
          key: 'summary',
          label: 'Technical Abstract / Dossier Summary (shown in preview modal & download)',
          type: 'textarea',
        },
        {
          key: 'link',
          label: 'External Download URL (optional — leave #preview to use built-in Dossier Viewer)',
          type: 'text',
          required: false,
          placeholder: 'https://drive.google.com/... or #preview',
        },
      ]}
    />
  )
}
