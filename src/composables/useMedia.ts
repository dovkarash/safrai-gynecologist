import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface MediaItem {
  _id: string
  [key: string]: any
}

export function useMedia() {
  const bagel = useBagelDB()
  const media = ref<MediaItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMedia() {
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('media').everything().get()
      media.value = res.data
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch media'
    } finally {
      loading.value = false
    }
  }

  return { media, loading, error, fetchMedia }
}
