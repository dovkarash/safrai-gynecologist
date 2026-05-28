<script setup lang="ts">
import { Btn, Card, Modal, TextInput } from '@bagelink/vue'
import { onMounted, ref } from 'vue'
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
            class="absolute -bottom-1 -start-2 min-w-200px m_min-w-100px aspect-ratio-1 bg-primary z-1 radius-2-5 m_radius-1-5 m_-start-1"
          ></div>
        </div>
      </div>
      <div class="absolute inset-0 w-100p h-100p bg-grad-white z-1"></div>
      <img
        src="@/assets/hero-bg.jpg"
        alt=""
        class="absolute inset-0 w-100p h-100p cover z-0 opacity-3"
      />
    </section>

    <!-- ======= SERVICES ======= -->
    <section id="services" class="bg-white">
      <div class="grid grid-wrap-6 txt-center w-1170px gap-1">
        <div
          v-for="service in services"
          :key="service._id"
          class="bg-white radius-1 p-1 hover"
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
          close-placement="header-end"
          @update:visible="selectedService = null"
        >
          <div v-if="selectedService">
            <img
              v-if="selectedService.image?.imageURL"
              :src="selectedService.image.imageURL"
              :alt="selectedService.image.altText || selectedService.name"
              class="w-100p radius-1 mb-1-5"
              style="max-height: 260px; object-fit: cover"
            />
            <div class="txt-16 line-height-17 service-body" v-html="selectedService.body"></div>
          </div>
        </Modal>
      </div>
    </section>

    <!-- ======= MEDIA ======= -->
    <section id="media" class="py-4 px-05 bg-bg">
      <div class="w-1170px">
        <p class="color-green-100 txt-14 mb-05">נוכחות תקשורתית</p>
        <h2 class="txt-36 semi m-0 mb-3 m_txt-28">מהתקשורת</h2>
        <div class="media-grid">
          <a
            v-for="item in media"
            :key="item._id"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="media-card decoration-none"
          >
            <div v-if="item.image?.[0]?.imageURL" class="media-img-wrap">
              <img
                :src="item.image[0].imageURL"
                :alt="item.image[0].altText || item.name"
                class="w-100p h-100p cover"
              />
            </div>
            <div v-else class="media-img-placeholder flex align-center justify-content-center">
              <span class="txt-30">📺</span>
            </div>
            <div class="p-1">
              <p class="bold txt-16 mb-025">{{ item.name }}</p>
              <p v-if="item.date" class="txt-12 color-black-tint">{{ formatDate(item.date) }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ======= ARTICLES ======= -->
    <section id="articles" class="py-4 px-05">
      <div class="w-1170px">
        <p class="color-green-100 txt-14 mb-05">פרסומים מדעיים</p>
        <h2 class="txt-36 semi m-0 mb-3 m_txt-28">מאמרים רפואיים</h2>
        <div class="articles-list">
          <a
            v-for="article in articles"
            :key="article._id"
            :href="article.link"
            target="_blank"
            rel="noopener noreferrer"
            class="article-row decoration-none flex align-center gap-1"
          >
            <div class="article-dot bg-orange radius-full flex-shrink-0"></div>
            <div class="flex-1">
              <p class="txt-16 bold mb-025 color-black">{{ article.name }}</p>
              <p v-if="article.date || article._createdDate" class="txt-12 color-black-tint">
                {{ formatDate(article.date || article._createdDate) }}
              </p>
            </div>
            <span class="txt-20 color-black-tint">←</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ======= CONTACT ======= -->
    <section id="contact" class="py-4 px-05 bg-bg">
      <div class="w-1170px grid grid-wrap-2 gap-3 align-items-start m_grid-wrap-1">
        <div>
          <p class="color-green-100 txt-14 mb-05">נשמח לשמוע ממך</p>
          <h2 class="txt-36 semi m-0 mb-1 m_txt-28">צור קשר</h2>
          <p class="txt-16 color-black-tint line-height-16 mb-2">
            רוצה לקבוע ייעוץ או פשוט לשאול שאלה? מלאי את הפרטים ונחזור אליך בהקדם.
          </p>
          <div class="flex column gap-075">
            <div class="flex align-center gap-075">
              <span
                class="contact-icon bg-orange radius-full flex-shrink-0 flex align-center justify-content-center"
                >📍</span
              >
              <p class="txt-14">כתובת המרפאה</p>
            </div>
            <div class="flex align-center gap-075">
              <span
                class="contact-icon bg-orange radius-full flex-shrink-0 flex align-center justify-content-center"
                >📞</span
              >
              <p class="txt-14">מספר טלפון</p>
            </div>
            <div class="flex align-center gap-075">
              <span
                class="contact-icon bg-orange radius-full flex-shrink-0 flex align-center justify-content-center"
                >✉️</span
              >
              <p class="txt-14">כתובת אימייל</p>
            </div>
          </div>
        </div>
        <Card>
          <div class="flex gap-1 m_flex-wrap mb-05">
            <TextInput
              v-model="form.firstName"
              label="שם פרטי"
              placeholder="ישראל"
              class="flex-1"
            />
            <TextInput
              v-model="form.lastName"
              label="שם משפחה"
              placeholder="ישראלי"
              class="flex-1"
            />
          </div>
          <div class="flex gap-1 m_flex-wrap mb-05">
            <TextInput
              v-model="form.email"
              type="email"
              label="אימייל"
              placeholder="israel@example.com"
              class="flex-1"
            />
            <TextInput
              v-model="form.phone"
              type="tel"
              label="טלפון"
              placeholder="050-0000000"
              class="flex-1"
            />
          </div>
          <TextInput
            v-model="form.message"
            multiline
            label="הודעה"
            placeholder="כתוב את הודעתך כאן..."
            class="mb-1"
          />
          <div class="flex gap-1 align-center">
            <Btn
              class="bg-orange color-black"
              value="שלח הודעה"
              :loading="submitting"
              @click="handleSubmit"
            />
            <p v-if="success" class="color-green txt-14">✓ הודעתך נשלחה בהצלחה!</p>
            <p v-if="error" class="color-red txt-14">{{ error }}</p>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<style>
.bg-grad-white {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}
</style>
