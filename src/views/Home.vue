<script setup lang="ts">
import { AppContent, Btn, Card, Modal } from '@bagelink/vue'
import { ref } from 'vue'

const modalOpen = ref(false)
</script>

<template>
  <AppContent title="Home">
    <template #header-right>
      <div class="flex gap-05 flex-wrap">
        <Btn value="I'm a button click me" @click="modalOpen = true" />
      </div>
    </template>
    <Modal v-model:visible="modalOpen" title="Do a thing ">
      <p>I'm a modal!</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus eligendi ad aliquam in
        nostrum nisi saepe officia sequi, provident, repellat illo ducimus ipsum placeat dolore
        quis? Quod ratione accusamus quaerat?
      </p>
      <template #footer>
        <Btn thin flat value="Cancel" @click="modalOpen = false" />
        <Btn thin flat value="Delete" @click="modalOpen = false" />
        <Btn value="Save" class="ms-auto" @click="modalOpen = false" />
      </template>
    </Modal>
    <Card class="h-100p">
      <p>This is the home view content area.</p>
      <p>You can add your dashboard components or welcome messages here.</p>
    </Card>
  </AppContent>
</template>
