import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface Article {
  _id: string
  name: string
  link: string
  date?: string
  _createdDate?: string
  draft?: boolean
}

function getEffectiveDate(item: Article): number {
  const d = item.date || item._createdDate
  return d ? new Date(d).getTime() : 0
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
      const items: Article[] = res.data.filter((a: Article) => !a.draft)
      articles.value = items.sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch articles'
    } finally {
      loading.value = false
    }
  }

  return { articles, loading, error, fetchArticles }
}
