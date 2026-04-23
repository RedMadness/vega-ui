<template>
  <div class="vega-pagination">
    <button
      class="vega-pagination-item"
      :class="{ 'disabled': pageCurrent == pageFirst }"
      @click="goToPage(pageCurrent - 1)"
    >
      <vega-icon-arrow :cursor="'unset'" />
    </button>
    <template v-if="pagesOverflow">
      <button
        class="vega-pagination-item"
        :class="{ 'active': pageCurrent == pageFirst}"
        @click="goToPage(pageFirst)"
      >
        {{ pageFirst }}
      </button>
      <button
        v-if="pageCurrent >= 5"
        class="vega-pagination-item"
        @click="goToPage(pageCurrent - 5)"
      >
        <vega-icon-dots :color="itemTextColor" />
      </button>
      <button
        v-for="page in pagesSet"
        :key="page"
        class="vega-pagination-item"
        :class="{ 'active': page === pageCurrent }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        v-if="pageCurrent < pageLast - 3"
        class="vega-pagination-item"
        @click="goToPage(pageCurrent + 5)"
      >
        <vega-icon-dots :color="itemTextColor" />
      </button>
      <button
        class="vega-pagination-item"
        :class="{ 'active': pageLast === pageCurrent }"
        @click="goToPage(pageLast)"
      >
        {{ pageLast }}
      </button>
    </template>
    <template v-else>
      <button
        v-for="page in pagesSet"
        :key="page"
        class="vega-pagination-item"
        :class="{ 'active': page === pageCurrent }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      class="vega-pagination-item"
      :class="{ 'disabled': pageCurrent == pageLast }"
      @click="goToPage(pageCurrent + 1)"
    >
      <vega-icon-arrow :rotate="'-90deg'" :cursor="'unset'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import VegaIconArrow from './VegaIconArrow.vue'
import { computed } from 'vue'
import VegaIconDots from './VegaIconDots.vue'

const props = defineProps<{
  total: number
  perPage: number
  borderColor: string
  backgroundColor: string
  itemBackgroundColor: string
  itemActiveBackgroundColor: string
  itemTextColor: string
  itemActiveTextColor: string
}>()

const emit = defineEmits(['page-changed'])
const pageCurrent = defineModel<number>({ default: 1 })

const pages = computed(() => Math.ceil(props.total / props.perPage))
const pageFirst = 1
const pageLast = computed(() => Math.max(pages.value))
const pagesOverflow = computed(() => pages.value >= 6)
const pagesSet = computed(() => {
  if (!pagesOverflow.value) {
    return Array.from({ length: pages.value }, (_, i) => i + 1);
  }
  const result = [];
  const start = pageCurrent.value >= 5
    ? pageCurrent.value > pageLast.value - 4
      ? pageLast.value - 5
      : pageCurrent.value - 2
    : 2;
  const end = pageCurrent.value >= 5
    ? pageCurrent.value < pageLast.value - 2
      ? pageCurrent.value + 2
      : pageLast.value - 1
    : 6;
  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  return result
})

function goToPage(page: number) {
  if (page < pageFirst) {
    page = pageFirst
  }
  if (page > pageLast.value) {
    page = pageLast.value
  }
  if (pageCurrent.value === page) {
    return
  }

  pageCurrent.value = page
  emit('page-changed', page)
}
</script>

<style scoped>
.vega-pagination {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: center;
  gap: 6px;
  border-top: 1px solid v-bind(borderColor);
  background-color: v-bind(backgroundColor);
  .vega-pagination-item {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind(itemBackgroundColor);
    height: 32px;
    min-width: 32px;
    color: v-bind(itemTextColor);
    &.active {
      background-color: v-bind(itemActiveBackgroundColor);
      color: v-bind(itemActiveTextColor);
    }
    &.disabled {
      cursor: not-allowed;
    }
  }
}
</style>
