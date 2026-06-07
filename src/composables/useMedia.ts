import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface MediaImage {
  imageURL: string
  altText?: string
  imageName?: string
  extension?: string
}

export interface MediaItem {
  _id: string
  name: string
  image: MediaImage
  logo: MediaImage
  date?: string
  link: string
  _createdDate?: string
  draft?: boolean
}

function getEffectiveDate(item: MediaItem): number {
  const d = item.date || item._createdDate
  return d ? new Date(d).getTime() : 0
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
      const items: MediaItem[] = res.data.filter((m: MediaItem) => !m.draft)
      media.value = items.sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch media'
    } finally {
      loading.value = false
    }
  }

  return { media, loading, error, fetchMedia }
}
