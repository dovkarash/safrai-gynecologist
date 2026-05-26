<script lang="ts" setup>
import { Card, Icon, type NavLink } from '@bagelink/vue'

defineProps<{
  navLinks: NavLink[]
}>()
</script>

<template>
  <Card
    class="hide m_grid gap-05 bgl_bottombar px-1 txt14 justify-content-start align-items-center overflow-x"
  >
    <slot name="brand" />
    <div
      v-for="(nav, i) in navLinks"
      :key="i"
      class="flex column hover txt-center nav-button router-link-active"
    >
      <Icon :icon="nav.icon" :size="1.4" />
      <p class="mb-0 -mt-025 pb-025">
        {{ nav.label }}
      </p>
    </div>
  </Card>
</template>

<style scoped>
.bgl_bottombar {
  background-color: var(--bgl-primary);
  color: var(--bgl-white);
  grid-template-columns: repeat(auto-fill, var(--bgl_bottombar-btn-width));
  grid-auto-flow: column;
  border-radius: 0;
  padding: 0;
  --bgl_bottombar-btn-width: 62px;
}

.bgl_bottombar > * {
  width: var(--bgl_bottombar-btn-width);
}

.bgl_bottombar::-webkit-scrollbar {
  display: none;
}

.bgl_bottombar .nav-button {
  border-radius: var(--card-border-radius);
}

.bgl_bottombar .router-link-active {
  background: var(--bgl-white);
  color: var(--bgl-primary) !important;
}
</style>
