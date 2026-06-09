export const APP_VERSION = __APP_VERSION__

const STORAGE_KEY = 'vbshare-ai-deck-version'

export function ensureFreshAppVersion() {
  const currentVersion = window.localStorage.getItem(STORAGE_KEY)
  const url = new URL(window.location.href)

  if (currentVersion !== APP_VERSION) {
    window.localStorage.setItem(STORAGE_KEY, APP_VERSION)
    void clearRuntimeCaches()
  }

  if (url.searchParams.get('v') !== APP_VERSION) {
    url.searchParams.set('v', APP_VERSION)
    window.location.replace(url)
    return false
  }

  return true
}

async function clearRuntimeCaches() {
  if (!('caches' in window)) return

  const cacheNames = await window.caches.keys()
  await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)))
}
