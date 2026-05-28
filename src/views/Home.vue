<script setup lang="ts">
import { Btn, Card, EmailInput, Icon, MapEmbed, Modal, TelInput, TextInput } from '@bagelink/vue'
import { computed, onMounted, ref } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useMedia } from '@/composables/useMedia'
import { useContact, type ContactForm } from '@/composables/useContact'
import { useBooking } from '@/composables/useBooking'
import Topnav from '@/components/Topnav.vue'
import { useServices, type Service } from '@/composables/useServices'

const { articles, fetchArticles } = useArticles()
const { media, fetchMedia } = useMedia()
const { services, fetchServices } = useServices()
const { submitting, success, error, submitContact } = useContact()
const { openBooking } = useBooking()

const selectedService = ref<Service | null>(null)

const mediaLimit = ref(8)
const articlesLimit = ref(12)
const visibleMedia = computed(() => media.value.slice(0, mediaLimit.value))
const visibleArticles = computed(() => articles.value.slice(0, articlesLimit.value))

const timeline = [
  {
    years: '2003–2005',
    text: 'תואר ראשון בביולוגיה, האוניברסיטה העברית בירושלים — סיום בהצטיינות.',
  },
  { years: '2005–2012', text: 'בוגרת בית הספר לרפואה של האוניברסיטה העברית והדסה, ירושלים.' },
  { years: '2015–2021', text: 'התמחות במיילדות וגינקולוגיה במרכז הרפואי הדסה.' },
  {
    years: '2022–2024',
    text: 'פוסט־דוקטורט ב־MWRI פיטסבורג, ארה״ב, בתחום שימור פוריות בילדים, ילדות ונשים.',
  },
  {
    years: '2024–2025',
    text: 'השתלמות עמיתים בתחום הפריון ו-IVF ושימור פוריות במרכז הרפואי שיבא.',
  },
  {
    years: 'החל משנת 2025',
    text: 'רופאה בכירה ביחידת ה-IVF במרכז הרפואי ולפסון, אחראית על שימור פוריות רפואי ואונקופוריות.',
  },
]

const clinicAddress = 'רח׳ הדוגמה 12, תל אביב'
// עדכנו lat/lng לפי המיקום האמיתי (Google Maps → לחיצה ימנית על המקום)
const clinicLocation = { lat: 32.0853, lng: 34.7818 }

const mapCenter = computed<[number, number]>(() => [clinicLocation.lat, clinicLocation.lng])

const mapMarkers = computed(() => [
  { lat: clinicLocation.lat, lng: clinicLocation.lng, tooltip: clinicAddress },
])

const mapLinkUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinicAddress}, ישראל`)}`,
)

const form = ref<ContactForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
})

async function handleSubmit() {
  await submitContact({ ...form.value })
  if (success.value) {
    form.value = { firstName: '', lastName: '', email: '', phone: '', message: '' }
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  fetchArticles()
  fetchMedia()
  fetchServices()
})
</script>

<template>
  <div class="testMe1">
    <Topnav />

    <!-- ======= HERO ======= -->
    <section class="relative py-3 px-05">
      <div
        class="w-1170px grid grid-wrap-2 align-items-center relative z-5 gap-2 m_flex m_column-reverse"
      >
        <!-- Text side -->
        <div class="m_txt-center">
          <p class="color-green-100 opacity-6">רפואת נשים בגישה אישית ומקצועית</p>
          <h1 class="txt70 line-height-13 m-0 semi m_txt-44">ד״ר מרים ספראי</h1>
          <h2 class="txt-16 regular w480px m-0">
            רפואת נשים ופוריות בהתאמה אישית לאורך כל שלבי החיים
          </h2>
          <div class="flex gap-1 mt-3 m_justify-content-center m_mt-1">
            <Btn class="bg-orange color-black min-w150px" value="קביעת תור" @click="openBooking" />
            <Btn
              class="bg-white color-black min-w150px border"
              value="לפרטים נוספים"
              flat
              href="#services"
            />
          </div>
        </div>

        <!-- Image side -->
        <div class="relative me-3 m_mx-1">
          <img
            src="@/assets/safrai.jpg"
            alt="ד״ר מרים ספראי"
            class="w-100p h-100p radius-2 z-3 relative m_radius-1"
          />
          <img
            src="@/assets/dots.svg"
            alt="ד״ר מרים ספראי"
            class="w-70p h-70p absolute top-3 -end-2-5 m_-end-1"
          />
          <div
            class="absolute -bottom-1 -start-2 min-w-200px m_min-w-100px aspect-ratio-1 bg-primary z-1 radius-2 m_radius-1-5 m_-start-1"
          ></div>
        </div>
      </div>
      <div class="absolute start end bottom w-100p h-200px bg-grad-white z-1"></div>
      <img
        src="@/assets/hero-bg.jpg"
        alt=""
        class="absolute inset-0 w-100p h-100p cover z-0 opacity-3"
      />
    </section>

    <!-- ======= SERVICES ======= -->
    <section id="services" class="bg-white py-3 m_pt-0 m_pb-1">
      <div class="grid grid-wrap-200 m_grid-wrap-150 m_gap-05 txt-center w-1170px gap-1 m_px-1">
        <div
          v-for="service in services"
          :key="service._id"
          class="bg-white radius-1 p-1 hover m_p-05"
          @click="selectedService = service"
        >
          <div
            v-if="service.image?.imageURL"
            class="service-img-wrap radius-1 mb-1 overflow-hidden"
          >
            <img
              :src="service.image.imageURL"
              :alt="service.image.altText || service.name"
              class="w-100p h-100p cover"
            />
          </div>
          <p class="line-height-13 balance">{{ service.name }}</p>
        </div>
      </div>
      <div class="w-1170px">
        <!-- Service Modal -->
        <Modal
          :visible="!!selectedService"
          :title="selectedService?.name"
          @update:visible="selectedService = null"
        >
          <div v-if="selectedService" class="flex gap-1 align-items-start m_block m_txt-center">
            <img
              v-if="selectedService.image?.imageURL"
              :src="selectedService.image.imageURL"
              :alt="selectedService.image.altText || selectedService.name"
              class="w-100px radius-1 mb-1-5 m_w-200px"
            />
            <div
              class="txt-16 line-height-17 service-body txt-start"
              v-html="selectedService.body"
            ></div>
          </div>
        </Modal>
      </div>
    </section>

    <!-- ======= ABOUT ======= -->
    <section id="about" class="relative py-3 m_pt-0 m_pb-1">
      <Card
        class="w-1170px bg-orange-100 display-flex gap-2 color-white radius-2 m_block m_radius-1"
      >
        <div class="">
          <p class="color-orange">נעים להכיר</p>
          <h2 class="txt-30 regular mt-05 mb-1 line-height-13">
            רופאת נשים שמחברת מקצועיות, רגישות ובהירות
          </h2>
          <p>
            ד״ר מרים ספראי היא רופאת נשים מומחית בתחום הפריון, שימור פוריות, IVF, טיפולי ART ומניל
            המעבר. תחום ייחודי בעבודתה הוא ליווי גינקולוגי ופוריותי של נשים עם רקע אונקולוגי — משלב
            האבחנה ושימור הפוריות, דרך מעבר גינקולוגי בתקופת הטיפולים, ועד מעקב לאחור החלמה וכניון
            הריון.
          </p>
          <p>
            בנוסף, ד״ר ספראי מבצעת מעקבים במצבים ייחודיים, כגון רזרבה שחלתית נמוכה, תסמונת טרנר,
            נשאות X שביר ומעבר מוקדם. לצד עבודתה הקלינית, היא עוסקת במחקר בתחום הפריון ושימור
            הפוריות, מרצה בכנסים ומדריכה סטודנטים ומתמחים.
          </p>
          <div
            class="relative about-img radius-1 shadow-30 mt-2 -ms-4 -mb-4 overflow-hidden m_mb-2"
          >
            <img src="@/assets/about.jpg" alt="אודות" class="about-img" />
          </div>
        </div>
        <!-- Timeline -->
        <div class="display-flex column gap-1">
          <div v-for="item in timeline" :key="item.years" class="f">
            <p class="txt-30 light color-orange line-height-12">{{ item.years }}</p>
            <p class="line-height-15">{{ item.text }}</p>
          </div>
        </div>
      </Card>
      <div class="absolute start end top-0 w-100p h-80p -z-1 bg-white"></div>
    </section>

    <!-- ======= MEDIA ======= -->
    <section id="media" class="py-4 m_py-1 px-05 bg-bg">
      <div class="w-1170px">
        <h3 class="txt-30 regular m-0 pb-1">בתקשורת</h3>
        <div class="grid grid-wrap-4 gap-1 m_grid-wrap-1">
          <Card
            v-for="item in visibleMedia"
            :key="item._id"
            :href="item.link || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="p-0 overflow-hidden hover decoration-none border bg-white"
          >
            <!-- Main image -->
            <div class="relative border-bottom h-150px">
              <img
                v-if="item.image?.imageURL"
                :src="item.image.imageURL"
                :alt="item.image.altText || item.name"
                class="w-100p h-100p cover"
              />
              <div v-else class="w-100p h-100p bg-bg flex align-center justify-content-center">
                <img src="@/assets/logo.svg" alt="" class="h-100px grayscale opacity-3" />
              </div>
            </div>
            <!-- Logo + content -->
            <div class="p-1 display-flex column gap-05 align-items-start">
              <img
                v-if="item.logo?.imageURL"
                :src="item.logo.imageURL"
                :alt="item.name"
                class="h-30px contain"
              />
              <p class="ellipsis-3">{{ item.name }}</p>
              <p v-if="item.date || item._createdDate" class="txt-12 opacity-5 mt-auto">
                {{ formatDate(item.date || item._createdDate) }}
              </p>
            </div>
          </Card>
        </div>
        <div v-if="media.length > mediaLimit" class="flex justify-content-center mt-2">
          <Btn class="bg-orange color-black" value="הצגת עוד" @click="mediaLimit += 8" />
        </div>
      </div>
    </section>

    <!-- ======= ARTICLES ======= -->
    <section id="articles" class="py-4 m_py-1 px-05 bg-bg">
      <div class="w-1170px">
        <h3 class="txt-30 regular m-0 pb-1">מאמרים רפואיים</h3>
        <div class="grid grid-wrap-6 gap-1 m_grid-wrap-2">
          <Card
            v-for="article in visibleArticles"
            :key="article._id"
            :href="article.link || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="h-100p display-flex column gap-05 p-1 hover decoration-none border bg-white h-150px"
          >
            <p v-if="article.date || article._createdDate" class="txt-12 opacity-5">
              {{ formatDate(article.date || article._createdDate) }}
            </p>
            <p class="ellipsis-4">{{ article.name }}</p>
          </Card>
        </div>
        <div v-if="articles.length > articlesLimit" class="flex justify-content-center mt-2">
          <Btn class="bg-orange color-black" value="הצגת עוד" @click="articlesLimit += 12" />
        </div>
      </div>
    </section>

    <!-- ======= CONTACT ======= -->
    <section id="contact" class="mt-5 m_mt-1 px-05 bg-green-100 color-white m_py-1">
      <div class="w-1170px grid grid-wrap-2 gap-3 m_gap-1 align-items-start m_grid-wrap-1">
        <div class="py-3 m_py-1">
          <p class="txt-14 color-orange">נשמח לשמוע ממך</p>
          <h2 class="txt-30 regular m-0 mb-1">צור קשר</h2>
          <p class="txt-16 pb-1">
            אפשר להשאיר פרטים ונחזור אלייך בהקדם, או ליצור קשר ישירות עם המרפאה.
            <br />
            טלפון: 03-0000000 | שעות פעילות: א׳–ה׳ 09:00–17:00 | כתובת:
            <a :href="mapLinkUrl" target="_blank" rel="noopener noreferrer" class="color-white">{{
              clinicAddress
            }}</a>
          </p>
          <Btn
            v-tooltip="'פייסבוק'"
            icon="facebook"
            href="https://www.facebook.com/profile.php?id=100063543434343"
            target="_blank"
            rel="noopener noreferrer"
            class="rotate-0 color-white"
            flat
            icon-size="2.5"
            size="l"
          />
          <Btn
            v-tooltip="'אימסטגרם'"
            icon="instagram"
            href="https://www.instagram.com/profile.php?id=100063543434343"
            target="_blank"
            rel="noopener noreferrer"
            class="rotate-0 color-white"
            flat
            icon-size="2.5"
            size="l"
          />
          <div>
            <form v-if="!success" class="grid grid-wrap-2 gap-col-1" @submit.prevent="handleSubmit">
              <TextInput v-model="form.firstName" label="שם פרטי" placeholder="ישראל" required />
              <TextInput v-model="form.lastName" label="שם משפחה" placeholder="ישראלי" required />
              <EmailInput
                v-model="form.email"
                type="email"
                label="אימייל"
                placeholder="israel@example.com"
                required
              />
              <TelInput
                v-model="form.phone"
                type="tel"
                label="טלפון"
                placeholder="050-0000000"
                required
              />
              <TextInput
                v-model="form.message"
                multiline
                label="הודעה"
                placeholder="כתבו את הודעתכם כאן..."
                class="grid-span-2 m_grid-span-1"
              />
              <div class="flex justify-content-end grid-span-2 m_grid-span-1">
                <Btn
                  type="submit"
                  class="bg-orange color-black"
                  value="שליחת הודעה"
                  full-width-mobile
                  :loading="submitting"
                />
              </div>
            </form>
            <div class="flex gap-1">
              <div v-if="success" class="flex gap-1 column w-100p py-3">
                <Icon name="check" class="color-green line-height-1" size="3" />
                <p class="color-black">הודעתך נשלחה בהצלחה!</p>
              </div>
              <p
                v-if="error"
                class="color-red txt-14 bg-red-30 w-100p p-025 txt-center mt-1 radius-025"
              >
                {{ error }}
              </p>
            </div>
          </div>
        </div>
        <div class="contact-map -mt-3 shadow-30 m_mt-0">
          <MapEmbed :center="mapCenter" :markers="mapMarkers" :zoom="16" :height="640" />
        </div>
      </div>
      <div class="px-075 py-025 flex justify-content-end">
        <p class="txt8 opacity-5">Dov Karash</p>
      </div>
    </section>
  </div>
</template>

<style>
.bg-grad-white {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}
.bg-dark {
  overflow: auto !important;
}
.grayscale {
  filter: grayscale(1);
}

.contact-map {
  width: 100%;
  overflow: hidden;
}
@media (max-width: 910px) {
  .contact-map {
    height: 500px;
    border-radius: var(--btn-border-radius);
  }
}
</style>
