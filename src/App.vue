<template>
  <div style="height: 100vh">
    <vega-layout
      :header-first="true"
      header-background="#005689"
      aside-left-border="#dcdfe6"
      aside-left-background="#fff"
      aside-right-background="#fff"
      content-background="#ececec"
    >
      <template #header>AWESOME HEADER</template>

      <template #aside-left>
        <vega-sidebar title="SIDEBAR TITLE">
          <vega-lorem-ipsum />
        </vega-sidebar>
      </template>

      <template #default>
        <vega-layout header-border="#dcdfe6" aside-right-border="#dcdfe6">
          <template #header> AWESOME HEADER 2 </template>

          <template #default>
            <vega-lorem-ipsum />
          </template>

          <template #aside-right>
            <vega-sidebar header-right name="vega-sidebar-right" title="SIDEBAR TITLE 2">
              {{ inputValue }}
              <vega-select
                v-model="inputValue"
                :searchable="true"
                :remoteHandler="testOptionsApi"
                value-field="id"
                label-field="title"
                tooltip-field="title"
                label="Select 1"
                infinite-scroll
                dropdown-auto-position
                @selected="selected"
              >
                <template #prefix>
                  <VegaIconArrow />
                </template>
                <template #postfix="{ isOpened }">
                  <vega-icon-arrow :rotate="isOpened ? '180deg' : '0deg'" />
                </template>
              </vega-select>

              {{ inputValue2 }}
              <vega-select-storage
                :options="options"
                value-field="id"
                label-field="title"
                storage-key="select-2"
                dropdown-auto-position
                dropdown-scrollbar-color="var(--vega-blue)"
                @selected="selected"
              >
                <!-- prefix -->
                <template #prefix>
                  <vega-icon-arrow />
                </template>
              </vega-select-storage>

              {{ inputValue3 }}
              <vega-select
                v-model="inputValue3"
                :searchable="true"
                :options="options3"
                storage-key="select-3"
                dropdown-auto-position
                @selected="selected"
              >
                <!-- prefix -->
                <template #prefix>
                  <vega-icon-arrow />
                </template>
              </vega-select>
            </vega-sidebar>
          </template>
        </vega-layout>
      </template>
    </vega-layout>
  </div>
</template>

<script setup lang="ts">
import VegaLayout from './components/VegaLayout.vue'
import VegaLoremIpsum from './components/VegaLoremIpsum.vue'
import VegaSidebar from './components/VegaSidebar.vue'
import VegaSelect from './components/VegaSelect.vue'
import { ref } from 'vue'
import VegaIconArrow from './components/VegaIconArrow.vue'
import api from './service/api.ts'
import VegaSelectStorage from './components/VegaSelectStorage.vue'
import useSelectState from './use/useSelectState.ts'

const inputValue = ref({ id: 1, title: 'Frami-Glover' })
const inputValue2 = useSelectState('select-2').selected
const inputValue3 = ref('')

const options = ref([
  { id: 1, title: 'one' },
  { id: 2, title: '2S' },
  { id: 3, title: '3S' },
  { id: 4, title: '4S' },
  { id: 5, title: '5S' },
  { id: 6, title: '6S' },
  { id: 7, title: '7S' },
  { id: 8, title: '8S' },
  { id: 9, title: '9S' },
  { id: 12, title: '10S' },
  { id: 13, title: '11S' },
  { id: 14, title: '12S' },
  { id: 15, title: '13S' },
  { id: 16, title: '14S' },
  { id: 17, title: '15S' },
  { id: 18, title: '16S' },
  { id: 19, title: '17S' },
  { id: 20, title: '18S' },
])

// const options3 = ref([
//   { id: 1, title: 'one', color: '#005689' },
//   { id: 2, title: '2S', color: 'red' },
// ])

const options3 = ref([0, 1])

// const options3 = ref(['option1', 'option2', 'option3'])

export interface Option<T> {
  [key: string]: T
}

//test infinity scroll
const testOptionsApi = api.getOrganizations

setTimeout(() => (inputValue.value = { id: 3, title: 'qweqweqe' }), 1000)

function selected(payload: number) {
  console.log(payload)
}
</script>

<style scoped></style>
