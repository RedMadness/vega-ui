<template>
  <div v-click-outside="onClickOutside">
    <div @mousedown="toggleOpenState">
      <slot name="trigger" />
    </div>
    <div class="dropdown" :class="{ open: isOpen }" @scroll="handleScroll">
      <div v-if="optionsList.length" class="dropdown-items">
        <div
          v-for="option in optionsList"
          :key="getOptionValue(option)"
          class="dropdown-item"
          @mousedown.left="onSelect(option)"
        >
          <vega-tooltip v-if="tooltipField" :text="getOptionTooltip(option)">
            {{ getOptionText(option) }}
          </vega-tooltip>
          <template v-else>
            {{ getOptionText(option) }}
          </template>
        </div>
        <div ref="loaderRef" />
      </div>
      <div v-if="loading && isOpen" class="loading">
        <vega-loading />
      </div>
      <div v-if="!optionsList.length && !loading && isOpen" class="dropdown-no-item">
        {{ noOptionsMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VegaLoading from './VegaLoading.vue'
import VegaTooltip from './VegaTooltip.vue'

export interface Option<T> {
  [key: string]: T
}

interface ApiResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
    }
  }
}

export interface Props<T> {
  options?: Array<Option<T> | string | number>
  valueField?: string
  labelField?: string
  tooltipField?: string
  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
  infiniteScroll?: boolean
  noOptionsMessage?: string
  remoteHandler?: (params: any) => Promise<ApiResponse<Option<string | number> | string | number>>
  filters?: object
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  options: () => [],
  valueField: 'value',
  labelField: 'label',
  backgroundColorDropdown: 'transparent',
  hoverColorDropdown: 'transparent',
  textColorDropdown: 'inherit',
  borderColorDropdown: 'var(--vega-border-color)',
  borderRadiusDropdown: '4px',
  fontSizeDropdown: 'inherit',
  optionPaddingDropdown: '8px 12px',
  transitionDurationDropdown: '0.3s',
  infiniteScroll: false,
  noOptionsMessage: 'No options available',
})

const emits = defineEmits(['open', 'select', 'close'])

const loading = ref(false)
const reachedBottom = ref(false)
const reachedTop = ref(false)
const total = ref(0)
const page = ref(1)
const perPage = ref(25)
const isOpen = ref(false)
/** Is it possible to download additional options from the server? */
const hasNextPage = computed(() => optionsRemote.value?.length < total.value)
/** The list of options passed through props. */
const optionsStatic = ref(props.options)
/** Options obtained by remote query. */
const optionsRemote = ref<(Option<string | number> | string | number)[]>([])
/** Final list of options */
const optionsList = computed(() => {
  return [
    ...(optionsStatic.value as (Option<string | number> | string | number)[]),
    ...optionsRemote.value,
  ]
})

/** Click outside vue directive. See v-click-outside in root div element. */
const vClickOutside = {
  beforeMount(el: HTMLElement, binding: any) {
    // @ts-ignore
    el.__ClickOutsideHandler__ = (event: Event) => {
      const target = event.target as HTMLElement
      if (el !== target && !el.contains(target)) {
        binding.value(event)
      }
    }
    // @ts-ignore
    document.body.addEventListener('click', el.__ClickOutsideHandler__)
  },
  unmounted(el: HTMLElement) {
    // @ts-ignore
    document.body.removeEventListener('click', el.__ClickOutsideHandler__)
  },
}

function toggleOpenState() {
  isOpen.value ? close() : open()
}

function open() {
  if (isOpen.value === false) {
    isOpen.value = true
    callApi()
    emits('open')
  }
}

const onSelect = (item: Option<number | string> | string | number) => {
  emits('select', item)
  close()
}

function onClickOutside() {
  close()
}

function close() {
  if (isOpen.value === true) {
    isOpen.value = false
    resetRemote()
    emits('close')
  }
}

function resetRemote() {
  optionsRemote.value = []
  page.value = 1
}

const handleScroll = (event: Event) => {
  if (!props.infiniteScroll) return

  const target = event.target as HTMLElement

  const { scrollTop, clientHeight, scrollHeight } = target as HTMLElement
  handleUpperBoundary(scrollTop)
  handleLowerBoundary(target)

  if (scrollTop > 0 && scrollTop + clientHeight < scrollHeight - 10) {
    resetScrollState()
  }
}

async function handleLowerBoundary(target: HTMLElement) {
  const { scrollTop, clientHeight, scrollHeight } = target
  const isBottomReached = scrollTop + clientHeight === scrollHeight
  if (!isBottomReached || loading.value || reachedBottom.value) return

  reachedBottom.value = true

  if (hasNextPage.value && isOpen.value) {
    loading.value = true
    page.value++
    const scrollPosition = target.scrollTop
    await callApi()
    target.scrollTop = scrollPosition
  }
}

const handleUpperBoundary = (scrollTop: number) => {
  if (scrollTop !== 0 || loading.value || reachedTop.value) return

  reachedTop.value = true
  loading.value = true
}

function resetScrollState() {
  reachedBottom.value = reachedTop.value = false
}

function getOptionValue(option: Option<number | string> | string | number) {
  if (typeof option === 'object') {
    return option[props.valueField]
  }

  return option
}

function getOptionText(option: Option<number | string> | string | number) {
  if (typeof option === 'object') {
    return option[props.labelField]
  }

  return option
}

function getOptionTooltip(option: Option<number | string> | string | number) {
  if (typeof option === 'object' && props.tooltipField) {
    return String(option[props.tooltipField])
  }

  return ''
}

async function callApi() {
  if (props.remoteHandler) {
    loading.value = true

    await props
      .remoteHandler({
        ...props.filters,
        page: page.value,
        per_page: perPage.value,
      })
      .then((response) => {
        if (isOpen.value) {
          const data = response.data.data || []
          optionsRemote.value = [...optionsRemote.value, ...data]
          total.value = response.data.meta?.total || 0
        }
      })
      .catch((error) => {
        console.error('API call failed:', error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

watch(
  () => props.filters,
  () => {
    resetRemote()
    callApi()
  }
)
</script>

<style scoped>
.dropdown {
  position: absolute;
  top: 115%;
  left: 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: v-bind(borderColorDropdown) 1px solid;
  border-radius: v-bind(borderRadiusDropdown);
  width: 100%;

  z-index: 1;

  box-sizing: border-box;
  max-height: 0;
  opacity: 0;
  transition: all v-bind(transitionDurationDropdown) ease-in-out;
  overflow: auto;
  color: v-bind(textColorDropdown);
  font-size: v-bind(fontSizeDropdown);
}

.dropdown-item {
  padding: v-bind(optionPaddingDropdown);
  cursor: pointer;
  background-color: v-bind(backgroundColorDropdown);
}

.dropdown-no-item {
  padding: v-bind(optionPaddingDropdown);
  cursor: pointer;
  background-color: v-bind(backgroundColorDropdown);
  text-align: center;
}

.dropdown-item:hover {
  background-color: v-bind(hoverColorDropdown);
}

.dropdown.open {
  max-height: 200px;
  opacity: 1;
}

.loading {
  background-color: v-bind(backgroundColorDropdown);
}
</style>
