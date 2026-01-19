import { ref, readonly } from 'vue'

interface ContentError {
  file: string
  message: string
  timestamp: Date
}

const errors = ref<ContentError[]>([])
const cache = new Map<string, unknown>()

function getFromLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`ppeak-cache-${key}`)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

function setToLocalStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(`ppeak-cache-${key}`, JSON.stringify(data))
  } catch {
    // localStorage might be full or unavailable
  }
}

export function useContentLoader() {
  async function loadContent<T>(path: string): Promise<T | null> {
    const cacheKey = path.replace(/[^a-z0-9]/gi, '-')

    // Check memory cache first
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey) as T
    }

    try {
      // Prefix with base URL for correct path resolution
      const basePath = import.meta.env.BASE_URL || '/'
      const fullPath = path.startsWith('/') ? `${basePath}${path.slice(1)}` : path
      const response = await fetch(fullPath)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()

      // Store in memory and localStorage
      cache.set(cacheKey, data)
      setToLocalStorage(cacheKey, data)

      return data as T
    } catch (err) {
      const error: ContentError = {
        file: path,
        message: err instanceof Error ? err.message : 'Unknown error',
        timestamp: new Date()
      }
      errors.value.push(error)

      // Try to get cached version
      const cached = getFromLocalStorage<T>(cacheKey)
      if (cached) {
        cache.set(cacheKey, cached)
        return cached
      }

      return null
    }
  }

  function clearErrors(): void {
    errors.value = []
  }

  return {
    loadContent,
    errors: readonly(errors),
    clearErrors
  }
}
