import { useState } from 'react'
import AdminCollectionManager from './AdminCollectionManager.jsx'
import { panel } from '../../data/dummyData.js'

const personFields = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role / title', type: 'text' },
  { key: 'photo', label: 'Photo URL', type: 'image' },
]

export default function AdminPanel() {
  const [tab, setTab] = useState('executives')

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab('executives')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === 'executives' ? 'border-cherenkov-400 text-cherenkov-300' : 'border-transparent text-alloy-400'
          }`}
        >
          Executive Committee
        </button>
        <button
          onClick={() => setTab('advisors')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === 'advisors' ? 'border-cherenkov-400 text-cherenkov-300' : 'border-transparent text-alloy-400'
          }`}
        >
          Faculty Advisors
        </button>
      </div>

      {tab === 'executives' ? (
        <AdminCollectionManager
          title="Executive Committee"
          description="Shown on the Panel page."
          collectionName="panel_executives"
          fallbackData={panel.executives}
          fields={[...personFields, { key: 'batch', label: 'Batch', type: 'text' }]}
        />
      ) : (
        <AdminCollectionManager
          title="Faculty Advisors"
          description="Shown on the Panel page."
          collectionName="panel_advisors"
          fallbackData={panel.advisors}
          fields={[...personFields, { key: 'dept', label: 'Department', type: 'text' }]}
        />
      )}
    </div>
  )
}
