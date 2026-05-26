<script lang="ts" setup>
import { AppContent, Btn, Card, SelectInput, TableSchema, TextInput } from '@bagelink/vue'
import { ref } from 'vue'
import people from '@/data/people.json'

const schema = ref([]) // Define your table schema here
</script>

<template>
  <AppContent title="Full List">
    <template #header-right>
      <Btn class="ms-auto" icon="arrow_selector_tool" value="Click" />
    </template>
    <Card thin class="h-100 py-05 p-0 h-100p overflow-hidden grid grid-list-wrapper">
      <div class="flex gap-1 m_flex-wrap p-1">
        <TextInput placeholder="Search" icon="search" class="no-margin" />
        <SelectInput placeholder="Status" class="no-margin" :options="['Option 1', 'Option 2']" />
        <SelectInput placeholder="School" class="no-margin" :options="['Option 1', 'Option 2']" />
        <SelectInput placeholder="Region" class="no-margin" :options="['Option 1', 'Option 2']" />
      </div>
      <TableSchema :schema="schema" :data="people" />
    </Card>
  </AppContent>
</template>

<style></style>
