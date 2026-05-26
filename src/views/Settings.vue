<script setup lang="ts">
import { AppContent, Btn, Card, Layout, Modal, TextInput } from '@bagelink/vue'
import { ref } from 'vue'

const modalOpen = ref(false)
const modalRef = ref<InstanceType<typeof Modal>>()
</script>

<template>
  <AppContent title="Settings">
    <template #header-right>
      <div class="flex gap-05 flex-wrap">
        <Btn value="I'm a button click me" @click="modalOpen = true" />
      </div>
    </template>
    <Modal ref="modalRef" v-model:visible="modalOpen">
      <template #toolbar>
        <p class="bold txt-center block txt-20">New</p>
      </template>
      <div class="flex gap-1 m_flex-wrap m_gap-0">
        <TextInput label="label" />
        <TextInput type="number" label="label" />
      </div>
      <TextInput multiline placeholder="Body" class="mb-2" />
      <template #footer>
        <Btn thin flat value="Cancel" @click="modalRef?.closeModal" />
        <Btn value="Save" @click="modalRef?.closeModal" />
      </template>
    </Modal>
    <Layout class="h-100p" :columns="['minmax(300px, 0.3fr)', '1fr']" :m-columns="['1fr']">
      <Card />
      <Layout :rows="['auto', '1fr', '1fr']">
        <Card>
          <div class="flex gap-1 m_flex-wrap">
            <TextInput label="label" />
            <TextInput type="number" label="label" />
            <SelectInput label="Status" :options="['Option 1', 'Option 2']" />
            <Btn class="mt-05 m_w-100" value="Save" />
          </div>
        </Card>
        <Card>
          <Btn class="m_w-100" value="Modal" @click="modalOpen = true" />
        </Card>
        <Card />
      </Layout>
    </Layout>
  </AppContent>
</template>
