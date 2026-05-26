<script setup lang="ts">
import { AppLayout, AppSidebar, RouterWrapper, type NavLink } from '@bagelink/vue'
import { useRoute } from 'vue-router'

const navLinks: NavLink[] = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/sideList', icon: 'thumbnail_bar', label: 'Side List' },
  { to: '/fullList', icon: 'list', label: 'Full List' },
  { to: '/settings', icon: 'settings', label: 'Settings' },
  { to: '/table', icon: 'table_rows', label: 'Table' },
]
const footerLinks = [
  {
    icon: 'logout',
    label: 'Logout',
    action: () => {
      console.log('Logging out...') // Add your logout logic here
    },
  },
]

const route = useRoute()
</script>

<template>
  <div>
    <RouterWrapper v-if="route.meta.hideMenu" class="relative" />
    <AppLayout v-else>
      <template #sidebar>
        <AppSidebar
          :nav-links="navLinks"
          :footer-links="footerLinks"
          logo="/src/assets/logo.svg"
          logo-alt="BagelDB"
          bg-color="white"
          :card="true"
        />
      </template>
      <RouterWrapper />
    </AppLayout>
  </div>
</template>
