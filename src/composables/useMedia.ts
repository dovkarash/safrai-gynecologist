import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface MediaImage {
  imageURL: string
  altText?: string
}

export interface MediaItem {
  _id: string
  name: string
  image: MediaImage[]
  logo: MediaImage[]
  date?: string
  link: string
  _createdDate?: string
}

const mockMedia: MediaItem[] = [
  {
    _id: 'med1',
    name: 'כאן חדשות',
    image: [{ imageURL: '', altText: 'כאן חדשות' }],
    logo: [{ imageURL: '', altText: 'כאן חדשות לוגו' }],
    date: '2025-03-15',
    link: 'https://www.kan.org.il',
  },
  {
    _id: 'med2',
    name: 'ynet',
    image: [{ imageURL: '', altText: 'ynet' }],
    logo: [{ imageURL: '', altText: 'ynet לוגו' }],
    date: '2025-04-02',
    link: 'https://www.ynet.co.il',
  },
  {
    _id: 'med3',
    name: 'מאקו',
    image: [{ imageURL: '', altText: 'מאקו' }],
    logo: [{ imageURL: '', altText: 'מאקו לוגו' }],
    date: '2025-01-20',
    link: 'https://www.mako.co.il',
  },
  {
    _id: 'med4',
    name: 'וואלה',
    image: [{ imageURL: '', altText: 'וואלה' }],
    logo: [{ imageURL: '', altText: 'וואלה לוגו' }],
    date: '2025-05-10',
    link: 'https://www.walla.co.il',
  },
  {
    _id: 'med5',
    name: 'הארץ',
    image: [{ imageURL: '', altText: 'הארץ' }],
    logo: [{ imageURL: '', altText: 'הארץ לוגו' }],
    date: '2024-11-08',
    link: 'https://www.haaretz.co.il',
  },
  {
    _id: 'med6',
    name: 'ידיעות אחרונות',
    image: [{ imageURL: '', altText: 'ידיעות אחרונות' }],
    logo: [{ imageURL: '', altText: 'ידיעות אחרונות לוגו' }],
    date: '2025-02-14',
    link: 'https://www.yediot.co.il',
  },
  {
    _id: 'med7',
    name: 'ערוץ 12',
    image: [{ imageURL: '', altText: 'ערוץ 12' }],
    logo: [{ imageURL: '', altText: 'ערוץ 12 לוגו' }],
    date: '2024-12-01',
    link: 'https://www.mako.co.il/tv/keshet-12',
  },
  {
    _id: 'med8',
    name: 'ערוץ 13',
    image: [{ imageURL: '', altText: 'ערוץ 13' }],
    logo: [{ imageURL: '', altText: 'ערוץ 13 לוגו' }],
    date: '2025-06-01',
    link: 'https://13tv.co.il',
  },
  {
    _id: 'med9',
    name: 'מגזין לאישה',
    image: [{ imageURL: '', altText: 'מגזין לאישה' }],
    logo: [{ imageURL: '', altText: 'מגזין לאישה לוגו' }],
    date: '2024-09-18',
    link: 'https://www.laisha.co.il',
  },
  {
    _id: 'med10',
    name: 'רדיו 103FM',
    image: [{ imageURL: '', altText: 'רדיו 103FM' }],
    logo: [{ imageURL: '', altText: 'רדיו 103FM לוגו' }],
    date: '2025-07-22',
    link: 'https://www.103fm.co.il',
  },
]

function getEffectiveDate(item: MediaItem): number {
  const d = item.date || item._createdDate
  return d ? new Date(d).getTime() : 0
}

export function useMedia() {
  const bagel = useBagelDB()
  const media = ref<MediaItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'

  async function fetchMedia() {
    if (useMock) {
      media.value = [...mockMedia].sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
      return
    }
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('media').everything().get()
      const items: MediaItem[] = res.data
      media.value = items.sort((a, b) => getEffectiveDate(b) - getEffectiveDate(a))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch media'
    } finally {
      loading.value = false
    }
  }

  return { media, loading, error, fetchMedia }
}
