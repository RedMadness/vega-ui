<template>
  <div style="height: 100vh">
    <vega-layout
      :header-first="true"
      header-background="var(--vega-blue)"
      aside-left-border="#dcdfe6"
      aside-left-background="#fff"
      aside-right-background="#fff"
      scrollbar-color="red"
      container-background="var(--vega-gray)"
      content-padding="0 0 0 2rem"
    >
      <template #header>HEADER 1</template>

      <template #aside-left>
        <vega-sidebar title="SIDEBAR TITLE" header-border="1px var(--vega-border-color) solid" scrollbar-color="red" background="white">
          <vega-lorem-ipsum />
        </vega-sidebar>
      </template>

      <template #default>
        <vega-layout
          aside-right-border="#dcdfe6"
          content-border-radius="14px"
          content-background="white"
          content-padding="0 2rem"
          scrollbar-color="red"
        >
          <template #header> HEADER 2 </template>

          <template #default>
            <div style="margin-top: 20px"></div>
            <vega-input label="TEST" hover-border-color="green" focus-border-color="red" />
            <vega-textarea v-model="textareaValue" label="TEXTAREA" placeholder="Placeholder" />
            <vega-lorem-ipsum />
          </template>

          <template #aside-right>
            <vega-sidebar header-right name="vega-sidebar-right" title="SIDEBAR TITLE 2" toggle-icon-color="var(--vega-text-color)">
              <div class="selects">
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
                />

                {{ inputValue2 }}
                <vega-select-storage
                  :options="options"
                  label="Select 2"
                  value-field="id"
                  label-field="title"
                  storage-key="select-2"
                  dropdown-auto-position
                  dropdown-scrollbar-color="var(--vega-blue)"
                  @selected="selected"
                >
                </vega-select-storage>

                {{ inputValue3 }}
                <vega-select
                  label="Select 3"
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
              </div>
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
import VegaInput from './components/VegaInput.vue'
import VegaTextarea from './components/VegaTextarea.vue'

const inputValue = ref({ id: 1, title: 'Frami-Glover' })
const inputValue2 = useSelectState('select-2', 'id', 'title', [{ id: 2, title: '2S' }]).selected
const inputValue3 = ref('')

const textareaValue = ref('asdasd')

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
setTimeout(() => (textareaValue.value = 'wewerewr\n' +
  'werwer\n' +
  '\n' +
  '\n' +
  'werwerwre'), 1000)

function selected(payload: number) {
  console.log(payload)
}
</script>

<style scoped>
.selects {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
