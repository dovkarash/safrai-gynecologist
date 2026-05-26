<script lang="ts" setup>
import { Btn } from '@bagelink/vue'
import { ref } from 'vue'

const scrolledMenu = ref(false)
const openMobileMenu = ref(false)

window.addEventListener('scroll', () => {
  scrolledMenu.value = window.scrollY > 60
})
</script>

<template>
  <div
    class="flex p-1 w-100 align-items-center space-between sticky transition z-99 gap-075"
    :class="{ scrolledMenu }"
  >
    <router-link to="/" thin flat class="menuLogo">
      <img src="@/assets/logo.svg" alt="logo" />
    </router-link>
    <Btn class="none m_block color-white" icon="menu" round flat @click="openMobileMenu = true" />
    <div
      class="mobileMenu ms-auto m_bg-primary m_fixed m_z-99 m_vh-100 m_top m_end m_w200 m_flex m_column transition"
      :class="{ openMobileMenu }"
    >
      <div class="flex justify-content-end p-025 none m_block">
        <Btn flat thin round icon="close" class="color-white" @click="openMobileMenu = false" />
      </div>
      <div class="flex m_column gap-075">
        <Btn to="/" flat class="color-white px-05 m_mx-2 txt-16" value="nav" />
      </div>
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
  .menuLogo {
    width: 140px;
  }

  .mobileMenu {
    transform: translateX(105%);
    transition: var(--bgl-transition);
  }
  .openMobileMenu {
    transform: translateX(0%);
    transition: var(--bgl-transition);
  }
}
</style>
