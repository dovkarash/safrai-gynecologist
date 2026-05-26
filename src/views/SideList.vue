<script lang="ts" setup>
import {
  AppContent,
  Btn,
  Card,
  Layout,
  ListItem,
  ListView,
  TableSchema,
  TabsBody,
  TabsNav,
  TextInput,
} from '@bagelink/vue'
import { ref } from 'vue'

import people from '@/data/people.json'

const peopleList = ref(people)
const schema = ref([]) // Define your table schema here
</script>

<template>
  <AppContent title="Side List">
    <template #header-right>
      <Btn class="ms-auto" icon="arrow_selector_tool" value="Click" />
    </template>
    <Layout
      :columns="['minmax(300px, 0.3fr)', '1fr']"
      :m-columns="['1fr']"
      :m-rows="['1fr']"
      class="h-100p overflow-hidden"
    >
      <ListView class="border-inner-bottom">
        <template #header>
          <div class="flex gap-025 p-1">
            <TextInput placeholder="Search" icon="search" class="mb-0" />
            <Btn icon="add" />
          </div>
        </template>
        <ListItem
          v-for="person in peopleList"
          :key="person.email"
          :title="person.name"
          :subtitle="person.email"
        />
      </ListView>
      <Layout :rows="['auto', '1fr']">
        <Card thin>
          <p>
            Name Name
            <Btn flat thin class="m-0" icon="edit" />
          </p>
          <p class="txt12 txtgray">email@email.com</p>

          <TabsNav
            class="mt-1"
            :tabs="[
              { id: 'tab-1', label: 'Tab 1' },
              { id: 'tab-2', label: 'Tab 2' },
              { id: 'tab-3', label: 'Tab 3' },
            ]"
            group="tabs"
          />
        </Card>
        <TabsBody group="tabs" class="overflow">
          <template #tab-1>
            <Card thin class="h-100 py-05 p-0 h-100p overflow-hidden">
              <TableSchema :schema="schema" :data="people" />
            </Card>
          </template>
          <template #tab-2>
            <Card thin class="h-100 py-05 pe-0 h-100p overflow-hidden">
              <p class="px-1 pt-1">Hi</p>
            </Card>
          </template>
          <template #tab-3>
            <Card thin class="h-100 py-05 pe-0 h-100p overflow-hidden">
              <p class="px-1 pt-1">bye</p>
            </Card>
          </template>
        </TabsBody>
      </Layout>
    </Layout>
  </AppContent>
</template>

<style></style>
