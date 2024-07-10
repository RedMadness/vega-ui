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
            <vega-sidebar name="vega-sidebar-right" title="SIDEBAR TITLE 2" width-min="350px">
              <vega-select
                v-model="inputValue"
                :searchable="true"
                :remoteHandler="testOptionsApi"
                background-color-dropdown="green"
                value-field="id"
                label-field="title"
              >
                <!-- prefix -->
                <template #prefix>
                  <VegaIconArrow />
                </template>

                <!-- postfix -->
                <template #postfix>
                  <VegaIconArrow />
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

const inputValue = ref('')

// const options = ref([
//   { id: 1, title: 'one' },
//   { id: 2, title: '2S' },
//   { id: 3, title: '3S' },
//   { id: 4, title: '4S' },
//   { id: 5, title: '5S' },
//   { id: 6, title: '6S' },
//   { id: 7, title: '7S' },
//   { id: 8, title: '8S' },
//   { id: 9, title: '9S' },
//   { id: 12, title: '10S' },
//   { id: 13, title: '11S' },
//   { id: 14, title: '12S' },
//   { id: 15, title: '13S' },
//   { id: 16, title: '14S' },
//   { id: 17, title: '15S' },
//   { id: 18, title: '16S' },
//   { id: 19, title: '17S' },
//   { id: 20, title: '18S' },
// ])

// const options = ref([
//   { id: 1, text: 'one', color: '#005689' },
//   { id: 2, text: '2S', color: 'red' },
// ])

// const options = ref([0, 1])

// const options = ref(['option1', 'option2', 'option3'])
interface ApiResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
    }
  }
}

export interface Option<T> {
  [key: string]: T
}

// test types data
// const testOptionsApi = (): Promise<ApiResponse<number | string | Option<number | string>>> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const dataType = Math.random()
//       if (dataType < 0.33) {
//         resolve({
//           data: {
//             data: [
//               { value: 1, label: 'one' },
//               { value: 2, label: '2S' },
//               { value: 3, label: '3S' },
//               { value: 4, label: '4S' },
//               { value: 5, label: '5S' },
//               { value: 6, label: '6S' },
//               { value: 7, label: '7S' },
//               { value: 8, label: '8S' },
//               { value: 9, label: '9S' },
//               { value: 12, label: '10S' },
//               { value: 13, label: '11S' },
//               { value: 14, label: '12S' },
//               { value: 15, label: '13S' },
//               { value: 16, label: '14S' },
//               { value: 17, label: '15S' },
//               { value: 18, label: '16S' },
//               { value: 19, label: '17S' },
//               { value: 20, label: '18S' },
//             ],
//             meta: { total: 2 },
//           },
//         })
//       } else if (dataType < 0.66) {
//         resolve({
//           data: {
//             data: [0, 1],
//             meta: { total: 1 },
//           },
//         })
//       } else {
//         resolve({
//           data: {
//             data: ['option1', 'option2', 'option3'],
//             meta: { total: 1 },
//           },
//         })
//       }
//     }, 1000)
//   })
// }

//test infinity scroll
const testOptionsApi = (params: {
  page: number
  per_page: number
}): Promise<ApiResponse<Option<number | string>>> => {
  const data = [
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
  ]

  return new Promise((resolve) => {
    setTimeout(() => {
      const page = params.page - 1
      const perPage = params.per_page
      const offset = page * perPage
      const paginatedData = data.slice(offset, offset + perPage)

      resolve({
        data: {
          data: paginatedData,
          meta: { total: data.length },
        },
      })
    }, 1000)
  })
}
</script>

<style scoped></style>
