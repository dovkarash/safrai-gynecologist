import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface ServiceImage {
  imageURL: string
  altText?: string
  imageName?: string
  extension?: string
}

export interface Service {
  _id: string
  name: string
  image: ServiceImage
  body: string
  draft?: boolean
}

export function useServices() {
  const bagel = useBagelDB()
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchServices() {
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('services').everything().get()
      services.value = res.data.filter((s: Service) => !s.draft)
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch services'
    } finally {
      loading.value = false
    }
  }

  return { services, loading, error, fetchServices }
}
