import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface Article {
  _id: string
  [key: string]: any
}

export function useArticles() {
  const bagel = useBagelDB()
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchArticles() {
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('articles').everything().get()
      articles.value = res.data
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch articles'
    } finally {
      loading.value = false
    }
  }

  return { articles, loading, error, fetchArticles }
}
