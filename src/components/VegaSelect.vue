<template>
  <div class="select-container">
    <div v-if="$slots.label || label">
      <slot name="label">{{ label }}</slot>
    </div>
    <vega-dropdown
      :options="options"
      :value-field="valueField"
      :label-field="labelField"
      :tooltip-field="tooltipField"
      :no-options-message="noOptionsMessage"
      :background-color="backgroundColorDropdown"
      :hover-color="hoverColorDropdown"
      :text-color="textColorDropdown"
      :hover-text-color="hoverTextColorDropdown"
      :border-color="borderColorDropdown"
      :border-radius="borderRadiusDropdown"
      :font-size="fontSizeDropdown"
      :option-padding="optionPaddingDropdown"
      :transition-duration="transitionDurationDropdown"
      :infinite-scroll="infiniteScroll"
      :remote-handler="remoteHandler"
      :filters="filters"
      @select="onSelect"
      @open="onOpen"
      @close="onClose"
    >
      <template #trigger>
        <vega-input
          :model-value="inputModel"
          :placeholder="placeholderCurrent"
          :readonly="!searchable || !isOpened"
          :cursor-type="cursor"
          :font-size="fontSize"
          :font-color="fontColor"
          :font-weight="fontWeight"
          :placeholder-color="placeholderColor"
          :background-color="backgroundColor"
          :hover-border-color="hoverBorderColor"
          :focus-border-color="focusBorderColor"
          :border-color="borderColor"
          :border-radius="borderRadius"
          :padding="padding"
          :width="width"
          :height="height"
          :text-align="textAlign"
          :delay-debounce="delayDebounce"
          :clearable="clearable"
          @clear="onClear"
          @update:model-value="onSearch"
        >
          <template #clear-icon>
            <slot name="clear-icon"></slot>
          </template>
          <template #prefix>
            <slot name="prefix"></slot>
          </template>
          <template #postfix>
            <slot name="postfix" :isOpened="isOpened">
              <vega-icon-arrow :rotate="isOpened ? '180deg' : '0deg'" />
            </slot>
          </template>
        </vega-input>
      </template>
    </vega-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import VegaInput from './VegaInput.vue'
import VegaDropdown from './VegaDropdown.vue'
import VegaIconArrow from './VegaIconArrow.vue'
import useSelectState from '../use/useSelectState.ts'

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
export interface Props<T> {
  label?: string
  searchable?: boolean
  valueField?: string
  labelField?: string
  tooltipField?: string
  placeholder?: string
  fontSize?: string
  fontWeight?: string
  fontColor?: string
  placeholderColor?: string
  backgroundColor?: string
  hoverBorderColor?: string
  focusBorderColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  width?: string
  height?: string
  textAlign?: string
  delayDebounce?: number
  clearable?: boolean
  notEmpty?: boolean

  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  hoverTextColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
  infiniteScroll?: boolean
  noOptionsMessage?: string

  remoteHandler?: (params: any) => Promise<ApiResponse<Option<string | number> | string | number>>
  options?: Array<Option<T> | string | number>

  modelValue?: Option<T> | string | number | null
  storageKey?: string
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  options: () => [],
  searchable: false,
  valueField: 'value',
  labelField: 'label',
  backgroundColor: 'var(--vega-secondary)',
  backgroundColorDropdown: 'var(--vega-secondary)',
  hoverColorDropdown: 'var(--vega-primary)',
  delayDebounce: 600,
  clearable: true,
  notEmpty: false,

  placeholder: 'Select value',
  label: '',
  modelValue: null,
})

const emits = defineEmits(['update:modelValue', 'selected'])

const isOpened = ref(false)

const search = ref('')
const filters = computed(() => {
  return {
    search: search.value,
  }
})

const cursor = computed(() => {
  return props.searchable ? 'text' : 'pointer'
})

const storage = props.storageKey ? useSelectState(props.storageKey) : null

// TODO: initial model-value will be ignored, if storageKey props passed
const selected = storage
  ? storage.selected
  : ref<Option<number | string> | string | number | null>(props.modelValue)

const selectedText = computed(() => {
  if (selected.value === null) {
    return ''
  }
  if (typeof selected.value === 'object') {
    return String(selected.value[props.labelField])
  }

  return String(selected.value === undefined ? '' : selected.value)
})
const selectedValue = computed(() => {
  if (selected.value === null) {
    return null
  }
  if (typeof selected.value === 'object') {
    return selected.value[props.valueField]
  }

  return selected.value
})

const inputModel = computed(() =>
  isOpened.value && props.searchable ? search.value : selectedText.value,
)

const placeholderCurrent = ref(props.placeholder)

function onOpen() {
  isOpened.value = true
  placeholderCurrent.value = selectedText.value || props.placeholder
}

function onClose() {
  isOpened.value = false
  search.value = ''
  if (!inputModel.value) {
    placeholderCurrent.value = props.placeholder
  }
}

const onClear = () => {
  search.value = ''
  placeholderCurrent.value = props.placeholder
  selected.value = null
  localStorageClear()
  emitSelected()
}

function onSelect(item: Option<number | string> | string | number) {
  selected.value = item
  emitSelected()
  localStorageSave(item)
}

function onSearch(payload: string) {
  search.value = payload
}

if (props.notEmpty) {
  watch(
    () => props.options,
    () => {
      if ((selected.value === null || selected.value === '') && props.options[0])
        onSelect(props.options[0])
    },
    { immediate: true },
  )
}

function localStorageSave(payload: Option<number | string> | string | number) {
  if (storage) {
    storage.storageSave(payload)
  }
}

function localStorageClear() {
  if (storage) {
    storage.storageClear()
  }
}

function emitSelected() {
  emits('update:modelValue', selected.value)
  emits('selected', selectedValue.value)
}

onMounted(() => {
  if (selectedValue.value !== null && props.storageKey) {
    emitSelected()
  }
})
</script>

<style scoped>
.select-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
