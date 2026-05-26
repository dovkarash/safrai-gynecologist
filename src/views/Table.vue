<script setup lang="ts">
import {
  AppContent,
  Btn,
  Card,
  CheckInput,
  DataTable,
  Dropdown,
  Modal,
  Pill,
  SelectInput,
  TextInput,
} from '@bagelink/vue'
import { computed, ref } from 'vue'
import people from '@/data/people.json'

const peopleList = ref(people)
const selectedItems = ref<string[]>([])
const modalOpen = ref(false)

// Define table schema like in your example
const peopleTableSchema = computed(() => [
  { id: 'id', label: 'ID', type: 'text' },
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'text' },
  { id: 'role', label: 'Role', type: 'text' },
  { id: 'status', label: 'Status', type: 'text' },
])

const allFields = peopleTableSchema.value.map((field) => field.id) as string[]
const visibleFields = ref<string[]>(allFields)
</script>

<template>
  <AppContent title="Table">
    <template #header-right>
      <Btn class="ms-auto" icon="arrow_selector_tool" value="Click" />
    </template>
    <Modal v-model:visible="modalOpen" class="txt-center" width="500" title="New" dismissable>
      <div class="grid grid-wrap-2 gap-05">
        <TextInput class="m-0 grid-span-2" placeholder="input" />
        <TextInput multiline class="m-0 grid-span-2" placeholder="input" />
      </div>
      <div class="flex space-between pt-2">
        <Btn flat value="Cancel" />
        <Btn value="Save" />
      </div>
    </Modal>
    <Card thin class="p-0 h-100p overflow-hidden grid grid-list-wrapper testMe1">
      <div class="px-1 pt-1">
        <!-- Search Bar -->
        <div class="flex gap-05 m_gap-05">
          <TextInput placeholder="Search" icon="search" class="mb-0" />
          <Btn v-tooltip="'Add'" icon="add" round @click="modalOpen = true" />
          <Btn v-tooltip="'Download'" icon="download" color="gray" round />
          <SelectInput
            v-model="visibleFields"
            :hide-label="true"
            icon="tune"
            style="max-width: 56px"
            placeholder="Fields"
            class="no-margin bg-input-transparent"
            multiselect
            :options="peopleTableSchema.map(({ label, id }) => ({ label, value: id }))"
          />
        </div>
        <!-- Actions Bar -->
        <div class="flex gap-05 flex-wrap mt-05">
          <Transition name="selectedItems">
            <div v-if="selectedItems.length" class="flex gap-05">
              <div class="flex gap-025 txt-14">
                <Btn icon="indeterminate_check_box" thin flat @click="selectedItems = []" />
                <p class="bold white-space">{{ selectedItems.length.toLocaleString() }} Selected</p>
              </div>
              <Btn flat icon="inventory_2" thin class="px-05" value="Archive" />
              <Btn flat icon="delete" thin class="px-05 txtblue" value="Delete" />
              <p class="me-05 opacity-3">|</p>
            </div>
          </Transition>
          <Dropdown
            flat
            placement="bottom-start"
            icon="filter_alt"
            value="Filter"
            thin
            trigger-class=""
          >
            <div class="flex p-05 gap-025 m_column overflow-hidden">
              <SelectInput
                style="min-width: 100px"
                placeholder="Amount"
                class="mb-0"
                :options="[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                  { label: '3', value: 3 },
                  { label: '4', value: 4 },
                ]"
              />
              <SelectInput
                style="min-width: 200px"
                placeholder="stuff"
                class="mb-0"
                :options="[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]"
              />
              <CheckInput label="Show Archived" class="mb-0 white-space pe-05" />
            </div>
          </Dropdown>
          <Pill
            v-for="opt in 2"
            :key="opt"
            class="m-0"
            round
            value="Option 1"
            :btn-end="{ onClick: () => {}, icon: 'close', value: '' }"
          />
          <Btn flat thin class="m-0 opacity-7 txt-14" value="Clear Filters" />
        </div>
      </div>
      <!-- Data Table -->
      <DataTable
        v-model:selected-items="selectedItems"
        selectable
        :show-fields="visibleFields"
        :schema="peopleTableSchema"
        :data="peopleList"
      />
    </Card>
  </AppContent>
</template>
