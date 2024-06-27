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
            <vega-sidebar name="vega-sidebar-right" title="SIDEBAR TITLE 2">
              <vega-select v-model="inputValue" :options="options" searchable />
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

const inputValue = ref({ value: null, label: 'Select option' })

const options = ref([
  { value: 1, label: 'one' },
  { value: 2, label: '2S' },
  { value: 3, label: '3S' },
  { value: 4, label: '4S' },
  { value: 5, label: '5S' },
  { value: 6, label: '6S' },
  { value: 7, label: '7S' },
  { value: 8, label: '8S' },
  { value: 9, label: '9S' },
  { value: 11, label: '10S' },
])
</script>

<style scoped></style>
