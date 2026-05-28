import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface Article {
  _id: string
  name: string
  link: string
  date?: string
  _createdDate?: string
}

const mockArticles: Article[] = [
  {
    _id: 'a1',
    name: 'שימור פוריות בנשים צעירות עם סרטן שד — סקירה עדכנית',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-01-10',
  },
  {
    _id: 'a2',
    name: 'IVF לאחר כימותרפיה: תוצאות ופרוגנוזה',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-02-18',
  },
  {
    _id: 'a3',
    name: 'אי-ספיקת שחלות מוקדמת: גישות טיפוליות חדשות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-11-05',
  },
  {
    _id: 'a4',
    name: 'הקפאת ביציות לנשים נשאות BRCA — המלצות עדכניות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-12-20',
  },
  {
    _id: 'a5',
    name: 'גיל המעבר המוקדם: השלכות ואסטרטגיות טיפוליות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-03-07',
  },
  {
    _id: 'a6',
    name: 'ניטור מחזור בגיל הפוריות: כלים וטכנולוגיות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-04-14',
  },
  {
    _id: 'a7',
    name: 'אנדומטריוזיס ופוריות: ניהול אופטימלי',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-10-30',
  },
  {
    _id: 'a8',
    name: 'טיפול הורמונלי חלופי בגיל המעבר — עדכון 2025',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-05-02',
  },
  {
    _id: 'a9',
    name: 'כרומוזום X שביר: השלכות גינקולוגיות ופוריותיות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-09-15',
  },
  {
    _id: 'a10',
    name: 'ליווי פסיכולוגי בטיפולי פוריות: חשיבות וגישות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-01-28',
  },
  {
    _id: 'a11',
    name: 'אונקופוריות — שדה מתפתח בגינקולוגיה המודרנית',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-06-01',
  },
  {
    _id: 'a12',
    name: 'הפריה חוץ גופית בנשים מעל גיל 40: ניתוח תוצאות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-08-22',
  },
  {
    _id: 'a13',
    name: 'מניעת סרטן צוואר הרחם: חיסון HPV בגיל הבגרות',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2024-07-11',
  },
  {
    _id: 'a14',
    name: 'בריאות האישה לאחר מחלה אונקולוגית',
    link: 'https://pubmed.ncbi.nlm.nih.gov',
    date: '2025-07-20',
  },
]

function getEffectiveDate(item: Article): number {
  const d = item.date || item._createdDate
  return d ? new Date(d).getTime() : 0
}

export function useArticles() {
  const bagel = useBagelDB()
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'

  async function fetchArticles() {
    if (useMock) {
      articles.value = [...mockArticles].sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
      return
    }
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('articles').everything().get()
      const items: Article[] = res.data
      articles.value = items.sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch articles'
    } finally {
      loading.value = false
    }
  }

  return { articles, loading, error, fetchArticles }
}
