import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, isFirebaseConfigured } from './firebase.js'

/**
 * Compresses and resizes an image file in the browser using HTML5 Canvas
 * into a lightweight, high-sharpness WebP/JPEG data URL (~35KB - 110KB).
 * This guarantees instant, zero-cost image uploads stored directly in Firestore
 * even when Firebase Cloud Storage is not enabled or requires Blaze billing.
 */
export function compressImageToDataUrl(file, maxWidth = 1100, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read image file.'))
    reader.onload = (event) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Invalid image format.'))
      img.onload = () => {
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Try WebP first for superior compression; fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality)
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }

        // If still larger than ~650KB, step down quality slightly to fit Firestore 1MB limit comfortably
        if (dataUrl.length > 680_000) {
          dataUrl = canvas.toDataURL('image/jpeg', 0.65)
        }
        resolve(dataUrl)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Uploads an image file for the CMS:
 * 1. Compresses the image client-side immediately.
 * 2. Attempts Firebase Storage upload with a 3.5s race timeout;
 *    if Storage is not configured/enabled, seamlessly returns the compressed WebP Data URL.
 */
export async function uploadCmsImage(file, folder = 'uploads') {
  if (!file) throw new Error('No file selected.')

  const maxWidth = folder.includes('panel') || folder.includes('alumni') ? 600 : 1200
  const compressedDataUrl = await compressImageToDataUrl(file, maxWidth, 0.82)

  if (!isFirebaseConfigured || !storage) {
    return { url: compressedDataUrl, method: 'firestore-inline' }
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `${folder}/${Date.now()}-${safeName}`
    const storageRef = ref(storage, path)

    const uploadPromise = uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef))
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storage timeout — using inline compressed storage')), 3500)
    )

    const cloudUrl = await Promise.race([uploadPromise, timeoutPromise])
    return { url: cloudUrl, method: 'firebase-storage' }
  } catch {
    // Fallback to inline compressed WebP stored directly in the Firestore document
    return { url: compressedDataUrl, method: 'firestore-inline' }
  }
}
