<template>
  <div v-click-outside="onClickOutside">
    <div ref="vega-dropdown-trigger" @mousedown="toggleOpenState">
      <slot name="trigger" />
    </div>
    <div class="dropdown" v-show="!forceHided" :class="{ open: isOpen }" @scroll="handleScroll">
      <slot>
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
        <div v-if="loading && isOpen" class="loading">
          <vega-loading :scale="0.6" />
        </div>
        <div v-if="!optionsList.length && !loading && isOpen" class="dropdown-no-items">
          {{ noOptionsMessage }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import VegaLoading from './VegaLoading.vue'
import VegaTooltip from './VegaTooltip.vue'
import vClickOutside from '../directives/clickOutside'

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
  backgroundColor?: string
  hoverColor?: string
  textColor?: string
  hoverTextColor?: string
  borderColor?: string
  borderRadius?: string
  fontSize?: string
  optionPadding?: string
  transitionDuration?: string
  infiniteScroll?: boolean
  noOptionsMessage?: string
  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Option<string | number> | string | number>>
  responseHandler?: (
    response: ApiResponse<Option<string | number> | string | number>,
  ) => Array<Option<T> | string | number>
  filters?: object
  width?: string
  offsetLeft?: number
  offsetTop?: number
  zIndex?: number
  hideIfEmpty?: boolean
  scrollbarColor?: string
  itemHeight?: number
  autoPosition?: boolean
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  options: () => [],
  valueField: 'value',
  labelField: 'label',
  backgroundColor: 'var(--vega-secondary)',
  hoverColor: 'ver(--vega-primary)',
  textColor: 'inherit',
  hoverTextColor: 'inherit',
  borderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  fontSize: 'inherit',
  optionPadding: '8px 12px',
  transitionDuration: '0.3s',
  infiniteScroll: false,
  noOptionsMessage: 'No options available',
  width: '300px',
  offsetLeft: 0,
  offsetTop: 8,
  zIndex: 1,
  scrollbarColor: 'var(--vega-border-color)',
  itemHeight: 34,
  autoPosition: false,
})

const emits = defineEmits(['open', 'select', 'close'])

const trigger = useTemplateRef('vega-dropdown-trigger')
const top = ref('0')
const left = ref('0')
const maxHeight = 200
const offsetTopPx = computed(() => props.offsetTop + 'px')
const offsetLeftPx = computed(() => props.offsetLeft + 'px')

const loading = ref(false)
const reachedBottom = ref(false)
const reachedTop = ref(false)
const total = ref(0)
const page = ref(1)
const perPage = ref(25)
const isOpen = ref(false)
/** Is it possible to download additional options from the server? */
const hasNextPage = computed(() => optionsRemote.value?.length < total.value)
/** Options obtained by remote query. */
const optionsRemote = ref<(Option<string | number> | string | number)[]>([])
/** Final list of options */
const optionsList = computed(() => {
  return [
    ...(props.options as (Option<string | number> | string | number)[]),
    ...optionsRemote.value,
  ]
})
const forceHided = computed(() => {
  if (props.hideIfEmpty && optionsList.value.length === 0 && isOpen.value) {
    return true
  }
  return false
})

onMounted(() => updateCoordinated())

function toggleOpenState() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

function open() {
  if (isOpen.value === false) {
    isOpen.value = true
    callApi()
    emits('open')
    updateCoordinated()
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
  // handleUpperBoundary(scrollTop)
  handleLowerBoundary(target)

  if (scrollTop > 0 && scrollTop + clientHeight < scrollHeight - 10) {
    resetScrollState()
  }
}

async function handleLowerBoundary(target: HTMLElement) {
  const { scrollTop, clientHeight, scrollHeight } = target

  /** @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled */
  const isBottomReached = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1

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

// const handleUpperBoundary = (scrollTop: number) => {
//   if (scrollTop !== 0 || loading.value || reachedTop.value) return
//
//   reachedTop.value = true
// }

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

function updateCoordinated() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const positionTrigger = trigger.value.getBoundingClientRect()

  // calculating dropdown height
  const dropdownHeight =
    optionsList.value.length * props.itemHeight > maxHeight
      ? maxHeight
      : optionsList.value.length * props.itemHeight

  // place the dropdown at the bottom if there is enough space.
  // otherwise, place it at top of the trigger element
  // works only if "auto-position" prop is true
  if (props.autoPosition && positionTrigger.bottom + dropdownHeight > window.innerHeight) {
    top.value = positionTrigger.top - dropdownHeight - props.offsetTop * 2 + 'px'
  } else {
    top.value = positionTrigger.bottom + 'px'
  }

  left.value = positionTrigger.left + 'px'
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
          const data = transformResponse(response)
          optionsRemote.value = [...optionsRemote.value, ...data]
          total.value = response.data.meta?.total || 0
          updateCoordinated()
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

function transformResponse(response: ApiResponse<string | number | Option<string | number>>) {
  if (props.responseHandler) {
    return props.responseHandler(response)
  }
  return response.data.data || []
}

watch(
  () => props.filters,
  () => {
    resetRemote()
    callApi()
  },
)
</script>

<style scoped>
.dropdown {
  position: fixed;
  top: calc(v-bind(offsetTopPx) + v-bind(top));
  left: calc(v-bind(offsetLeftPx) + v-bind(left));
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: v-bind(borderColor) 1px solid;
  border-radius: v-bind(borderRadius);
  width: v-bind(width);

  z-index: v-bind(zIndex);

  box-sizing: border-box;
  max-height: 0;
  opacity: 0;
  transition: opacity v-bind(transitionDuration) ease-in-out;
  overflow: auto;
  color: v-bind(textColor);
  font-size: v-bind(fontSize);
  background-color: v-bind(backgroundColor);
  scrollbar-color: v-bind(scrollbarColor) v-bind(backgroundColor);
  scrollbar-width: thin;
}

.dropdown-item {
  padding: v-bind(optionPadding);
  cursor: pointer;
}

.dropdown-no-items {
  padding: v-bind(optionPadding);
  cursor: pointer;
  background-color: v-bind(backgroundColor);
  text-align: center;
}

.dropdown-item:hover {
  background-color: v-bind(hoverColor);
  color: v-bind(hoverTextColor);
}

.dropdown.open {
  max-height: v-bind(maxHeight + 'px');
  opacity: 1;
}

.loading {
  background-color: v-bind(backgroundColor);
  display: flex;
  justify-content: center;
  padding: 6px 0;
}
</style>
