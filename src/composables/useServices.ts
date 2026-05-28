import { ref } from 'vue'
import { useBagelDB } from '@/plugin/bagelDB'

export interface ServiceImage {
  imageURL: string
  altText?: string
}

export interface Service {
  _id: string
  name: string
  image: ServiceImage[]
  body: string
}

const mockServices: Service[] = [
  {
    _id: 'm1',
    name: 'גינקולוגיה כללית',
    image: [{ imageURL: '', altText: 'גינקולוגיה כללית' }],
    body: 'בדיקות גינקולוגיות שגרתיות, אבחון וטיפול במגוון בעיות גינקולוגיות, ייעוץ ומעקב רפואי מקיף.',
  },
  {
    _id: 'm2',
    name: 'טיפולי פוריות',
    image: [{ imageURL: '', altText: 'טיפולי פוריות' }],
    body: 'ליווי וטיפול מקיף בתחום הפוריות, כולל הערכת פוריות, טיפולי הורמונים והכנה לטיפולי IVF.',
  },
  {
    _id: 'm3',
    name: 'IVF',
    image: [{ imageURL: '', altText: 'IVF' }],
    body: 'הפריה חוץ גופית (IVF) — ליווי מלא של התהליך, מהכנה ועד השתלת עוברים, עם מעקב צמוד.',
  },
  {
    _id: 'm4',
    name: 'שימור פוריות',
    image: [{ imageURL: '', altText: 'שימור פוריות' }],
    body: 'הקפאת ביציות ועוברים לנשים המעוניינות לשמר את פוריותן לעתיד, כולל לנשים בטיפולים אונקולוגיים.',
  },
  {
    _id: 'm5',
    name: 'אונקופוריות',
    image: [{ imageURL: '', altText: 'אונקופוריות' }],
    body: 'ליווי גינקולוגי ופוריותי מיוחד לנשים עם רקע אונקולוגי — שימור פוריות לפני טיפולים ומעקב לאחריהם.',
  },
  {
    _id: 'm6',
    name: 'גיל המעבר',
    image: [{ imageURL: '', altText: 'גיל המעבר' }],
    body: 'ייעוץ וטיפול בתסמיני גיל המעבר, כולל טיפול הורמונלי חלופי, מעקב ובריאות האישה בגיל הביניים.',
  },
  {
    _id: 'm7',
    name: 'מעבר מוקדם',
    image: [{ imageURL: '', altText: 'מעבר מוקדם' }],
    body: 'אבחון וטיפול באי-ספיקת שחלות מוקדמת וגיל מעבר מוקדם, כולל ייעוץ גנטי ותמיכה רפואית.',
  },
  {
    _id: 'm8',
    name: 'ניל המעבר',
    image: [{ imageURL: '', altText: 'ניל המעבר' }],
    body: 'ליווי בתקופת הפרי-מנופאוזה, ניהול תסמינים ושמירה על איכות חיים בתקופת המעבר.',
  },
  {
    _id: 'm9',
    name: 'מחקר קליני',
    image: [{ imageURL: '', altText: 'מחקר קליני' }],
    body: 'עיסוק במחקר בתחום הפריון ושימור הפוריות, השתתפות בכנסים מדעיים והוראת הדור הבא של רופאים.',
  },
  {
    _id: 'm10',
    name: 'ייעוץ גנטי',
    image: [{ imageURL: '', altText: 'ייעוץ גנטי' }],
    body: 'ייעוץ גנטי לנשים עם נשאות X שביר ומצבים גנטיים אחרים המשפיעים על הפוריות וההיריון.',
  },
  {
    _id: 'm11',
    name: 'מעקב היריון',
    image: [{ imageURL: '', altText: 'מעקב היריון' }],
    body: 'מעקב מקיף לאחר טיפולי פוריות, בדיקות שגרתיות ותמיכה לאורך ההיריון.',
  },
  {
    _id: 'm12',
    name: 'ייעוץ ורפואה מונעת',
    image: [{ imageURL: '', altText: 'ייעוץ ורפואה מונעת' }],
    body: 'בדיקות מניעה, ייעוץ רפואי פרסונלי ותוכניות בריאות מותאמות אישית לנשים בכל גיל.',
  },
]

export function useServices() {
  const bagel = useBagelDB()
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const useMock = import.meta.env.VITE_USE_MOCK === 'true'

  async function fetchServices() {
    if (useMock) {
      services.value = mockServices
      return
    }
    loading.value = true
    error.value = null
    try {
      const res = await bagel.collection('Services').everything().get()
      services.value = res.data
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Failed to fetch services'
    } finally {
      loading.value = false
    }
  }

  return { services, loading, error, fetchServices }
}
