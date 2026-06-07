<script lang="ts" setup>
import { Btn } from '@bagelink/vue'
import { ref } from 'vue'
import { useBooking } from '@/composables/useBooking'

const openMobileMenu = ref(false)
const { openBooking } = useBooking()

const navLinks = [
  { label: 'שירותי המרפאה', href: '#services' },
  { label: 'מהתקשורת', href: '#media' },
  { label: 'אודות', href: '#about' },
  { label: 'מאמרים רפואיים', href: '#articles' },
  { label: 'צור קשר', href: '#contact' },
]

const SCROLL_OFFSET = 80 // px מתחת לנאב

function scrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
  openMobileMenu.value = false
}
</script>

<template>
  <div
    class="p-1 w-100 sticky z-99 m_p-05 shadow-10"
    style="backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.92) !important"
  >
    <div class="w-1170px gap-075 align-items-center space-between transition flex">
      <!-- Mobile hamburger -->
      <Btn
        class="none m_block"
        icon-size="1.5"
        icon="menu"
        round
        flat
        color="orange-100"
        @click="openMobileMenu = true"
      />
      <!-- Logo / name -->
      <router-link to="/" class="txt-start flex gap-1 m_gap-05 m_me-auto decoration-none">
        <img src="@/assets/logo.svg" alt="ד״ר מרים ספראי" class="w-50px m_w-40px" />
        <div>
          <p class="bold txt-16 line-height-1">ד״ר מרים ספראי</p>
          <p class="txt-12">גינקולוגיה ופוריות</p>
        </div>
      </router-link>

      <!-- menu overlay -->
      <div
        class="mobileMenu mx-auto m_bg-black m_fixed m_z-99 m_vh-100 m_inset transition"
        :class="{ openMobileMenu }"
      >
        <div class="p-1-5 flex justify-content-start none m_block">
          <Btn
            flat
            thin
            round
            icon="close"
            icon-size="1.5"
            class="color-white"
            @click="openMobileMenu = false"
          />
        </div>
        <div class="flex gap-2 m_column">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="decoration-none m_color-white"
            @click.prevent="scrollTo(link.href)"
            >{{ link.label }}</a
          >
        </div>
      </div>

      <!-- CTA button -->
      <Btn class="m_px-1 bg-orange color-black" value="קביעת תור" @click="openBooking" />
    </div>
  </div>
</template>

<style scoped>
.scrolledMenu {
  background: var(--bgl-primary);
}
.mobileMenu .router-link-active.router-link-exact-active.bgl_btn {
  border-bottom: 1px solid var(--bgl-white);
}
@media screen and (max-width: 910px) {
  .mobileMenu {
    transform: translateX(105%);
    transition: var(--bgl-transition);
  }
  .openMobileMenu {
    transform: translateX(0%);
    transition: var(--bgl-transition);
    width: 100vw;
  }
}
</style>
