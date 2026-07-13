// One-time helper to push the bundled placeholder content into Firestore
// so the live site isn't empty on day one. Safe to skip — every page
// already falls back to this same data when a collection is empty.
//
// Usage:
//   1. In Firebase Console → Project Settings → Service accounts,
//      click "Generate new private key" and save it as
//      scripts/serviceAccountKey.json (already git-ignored).
//   2. npm install firebase-admin --save-dev
//   3. npm run seed

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))

let serviceAccount
try {
  serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf-8')
  )
} catch {
  console.error(
    '\nMissing scripts/serviceAccountKey.json.\n' +
    'Download it from Firebase Console → Project Settings → Service accounts → Generate new private key.\n'
  )
  process.exit(1)
}

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const { news, panel, alumni, activities, resources, gallery } = await import(
  '../src/data/dummyData.js'
)

async function seedCollection(name, items) {
  const batch = db.batch()
  items.forEach((item) => {
    const { id, ...rest } = item
    const ref = db.collection(name).doc(id)
    batch.set(ref, rest, { merge: true })
  })
  await batch.commit()
  console.log(`Seeded ${items.length} docs into "${name}"`)
}

await seedCollection('news', news)
await seedCollection('panel_executives', panel.executives)
await seedCollection('panel_advisors', panel.advisors)
await seedCollection('alumni', alumni)
await seedCollection('activities', activities)
await seedCollection('resources', resources)
await seedCollection('gallery', gallery)

console.log('\nDone. Your Firestore project now has starter content.')
process.exit(0)
