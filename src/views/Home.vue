<script setup lang="ts">
import { Btn, Card, EmailInput, Icon, MapEmbed, Modal, TelInput, TextInput } from '@bagelink/vue'
import { computed, onMounted, ref } from 'vue'
import { useArticles } from '@/composables/useArticles'
import { useMedia } from '@/composables/useMedia'
import { useContact, type ContactForm } from '@/composables/useContact'
import Topnav from '@/components/Topnav.vue'
import { useServices, type Service } from '@/composables/useServices'
import { homeContent } from '@/data/homeContent'

const content = homeContent

const { articles, fetchArticles } = useArticles()
const { media, fetchMedia } = useMedia()
const { services, fetchServices } = useServices()
const { submitting, success, error, submitContact } = useContact()

const selectedService = ref<Service | null>(null)
const lightboxImage = ref<string | null>(null)

const mediaLimit = ref(content.media.loadMoreStep)
const articlesLimit = ref(content.articles.loadMoreStep)
const visibleMedia = computed(() => media.value.slice(0, mediaLimit.value))
const visibleArticles = computed(() => articles.value.slice(0, articlesLimit.value))

const mapCenter = computed<[number, number]>(() => [
  content.contact.location.lat,
  content.contact.location.lng,
])

const mapMarkers = computed(() => [
  {
    lat: content.contact.location.lat,
    lng: content.contact.location.lng,
    tooltip: content.contact.address,
  },
])

const mapLinkUrl = computed(
  () =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${content.contact.address}, ישראל`)}`,
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
        <div class="m_txt-center">
          <p class="color-green-100 txt-20 opacity-6 balance">{{ content.hero.tagline }}</p>
          <h1 class="txt80 line-height-13 pb-1 m-0 semi m_txt-44">{{ content.hero.title }}</h1>
          <h2 class="txt-24 regular w480px m-0 balance line-height-13 m_txt-20">
            {{ content.hero.subtitle }}
          </h2>

          <div class="flex gap-05 mt-1 m_justify-content-center txt-20">
            <span class="flex align-items-center gap-025 opacity-7">🇮🇱 עברית</span>
            <span class="opacity-3">|</span>
            <span class="flex align-items-center gap-025 opacity-7">🇬🇧 English</span>
            <span class="opacity-3">|</span>
            <span class="flex align-items-center gap-025 opacity-7">🇫🇷 Français</span>
          </div>

          <div class="flex gap-1 mt-3 m_justify-content-center m_mt-1">
            <Btn
              class="bg-white color-black min-w150px border shadow-10"
              :value="content.hero.cta.more"
              flat
              href="#contact"
            />
          </div>
        </div>

        <div class="relative me-3 m_mx-1">
          <img
            src="@/assets/safrai.jpg"
            :alt="content.hero.imageAlt"
            class="w-100p h-100p radius-2 z-3 relative m_radius-1"
          />
          <img
            src="@/assets/dots.svg"
            :alt="content.hero.imageAlt"
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
      <h2 class="txt-30 regular m-0 mb-1 txt-center">{{ content.services.title }}</h2>
      <div class="grid grid-wrap-200 m_grid-wrap-2 m_gap-05 txt-center w-1170px gap-1 m_px-1">
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

    <!-- ======= MEDIA ======= -->
    <section id="media" class="py-4 m_py-1 px-05 bg-bg">
      <div class="w-1170px">
        <h3 class="txt-30 regular m-0 pb-1">{{ content.media.title }}</h3>
        <div class="grid grid-wrap-4 gap-1 m_grid-wrap-1">
          <Card
            v-for="item in visibleMedia"
            :key="item._id"
            :href="item.link || undefined"
            :target="item.link ? '_blank' : undefined"
            :rel="item.link ? 'noopener noreferrer' : undefined"
            class="p-0 overflow-hidden hover decoration-none border bg-white"
            :class="{ 'cursor-pointer': !item.link }"
            @click="
              !item.link && item.image?.imageURL ? (lightboxImage = item.image.imageURL) : null
            "
          >
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
        <!-- Lightbox modal for media without link -->
        <Modal :visible="!!lightboxImage" @update:visible="lightboxImage = null">
          <img v-if="lightboxImage" :src="lightboxImage" alt="" class="w-100p radius-1" />
        </Modal>
        <div v-if="media.length > mediaLimit" class="flex justify-content-center mt-2">
          <Btn
            class="bg-orange color-black"
            :value="content.media.loadMore"
            @click="mediaLimit += content.media.loadMoreStep"
          />
        </div>
      </div>
    </section>

    <!-- ======= ABOUT ======= -->
    <section id="about" class="relative py-3 m_pt-0 m_pb-1">
      <Card
        class="w-1170px bg-orange-100 display-flex gap-2 color-white radius-2 m_block m_radius-1"
      >
        <div class="">
          <p class="color-orange">{{ content.about.eyebrow }}</p>
          <h2 class="txt-30 regular mt-05 mb-1 line-height-13">{{ content.about.title }}</h2>

          <div v-html="content.about.paragraphs"></div>
          <div
            class="relative about-img radius-1 shadow-30 mt-2 -ms-4 -mb-4 overflow-hidden m_mb-2"
          >
            <img src="@/assets/about.jpg" :alt="content.about.imageAlt" class="about-img" />
          </div>
        </div>
        <div class="display-flex column gap-1">
          <div v-for="item in content.about.timeline" :key="item.years" class="f">
            <p class="txt-30 light color-orange line-height-12">{{ item.years }}</p>
            <p class="line-height-15">{{ item.text }}</p>
          </div>
        </div>
      </Card>
      <!-- <div class="absolute start end top-0 w-100p h-80p -z-1 bg-white"></div> -->
    </section>

    <!-- ======= ARTICLES ======= -->
    <section id="articles" class="py-4 m_py-1 px-05 bg-bg">
      <div class="w-1170px">
        <h3 class="txt-30 regular m-0 pb-1">{{ content.articles.title }}</h3>
        <div class="grid grid-wrap-6 gap-1 m_grid-wrap-1">
          <Card
            v-for="article in visibleArticles"
            :key="article._id"
            :href="article.link || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="h-100p display-flex column gap-05 p-1 hover decoration-none border bg-white"
          >
            <p v-if="article.date || article._createdDate" class="txt-12 opacity-5">
              {{ formatDate(article.date || article._createdDate) }}
            </p>
            <p class="ellipsis-5 line-height-15">{{ article.name }}</p>
          </Card>
        </div>
        <div v-if="articles.length > articlesLimit" class="flex justify-content-center mt-2">
          <Btn
            class="bg-orange color-black"
            :value="content.articles.loadMore"
            @click="articlesLimit += content.articles.loadMoreStep"
          />
        </div>
      </div>
    </section>

    <!-- ======= CONTACT ======= -->
    <section id="contact" class="mt-5 m_mt-1 px-05 bg-green-100 color-white m_py-1">
      <div class="w-1170px grid grid-wrap-2 gap-3 m_gap-1 align-items-start m_grid-wrap-1">
        <div class="py-3 m_py-1 m_txt-center">
          <p class="txt-14 color-orange">{{ content.contact.eyebrow }}</p>
          <h2 class="txt-30 regular m-0 mb-1">{{ content.contact.title }}</h2>
          <p class="txt-16 pb-1 balance">
            {{ content.contact.intro }}
            <br />
            {{ content.contact.phoneLabel }} {{ content.contact.phone }} |
            {{ content.contact.hoursLabel }} {{ content.contact.hours }}
            <span class="m_none">|</span>
            <span class="m_block">
              {{ content.contact.emailLabel }}
              <a :href="`mailto:${content.contact.email}`" class="color-white">{{
                content.contact.email
              }}</a>
              <span class="m_none">|</span>
            </span>
            {{ content.contact.addressLabel }}
            <a :href="mapLinkUrl" target="_blank" rel="noopener noreferrer" class="color-white">{{
              content.contact.address
            }}</a>
          </p>
          <Btn
            v-for="link in content.contact.social"
            :key="link.icon"
            v-tooltip="link.tooltip"
            :icon="link.icon"
            :href="link.href"
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
                label="אימייל"
                placeholder="israel@example.com"
                required
              />
              <TelInput v-model="form.phone" label="טלפון" placeholder="050-0000000" />
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
                  :value="content.contact.form.submit"
                  full-width-mobile
                  :loading="submitting"
                />
              </div>
            </form>
            <div class="flex gap-1">
              <div v-if="success" class="flex gap-1 column w-100p py-3">
                <Icon name="check" class="color-green line-height-1" size="3" />
                <p class="color-white">{{ content.contact.form.success }}</p>
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
        <div class="contact-map -mt-3 shadow-30 m_mt-0 m_pointer-events-none">
          <MapEmbed
            :center="mapCenter"
            :markers="mapMarkers"
            :zoom="content.contact.mapZoom"
            :height="content.contact.mapHeight"
          />
        </div>
      </div>
      <div class="px-075 py-025 flex justify-content-end m_justify-content-center m_mt-1">
        <p class="txt8 opacity-5">{{ content.footer.credit }}</p>
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
.cursor-pointer {
  cursor: pointer;
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
  .m_place-items-center {
    place-items: center !important;
  }
}
</style>
