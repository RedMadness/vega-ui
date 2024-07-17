<template>
  <div class="select-container">
    <vega-dropdown
      :options="options"
      :value-field="valueField"
      :label-field="labelField"
      :backgroundColorDropdown="backgroundColorDropdown"
      :hover-color-dropdown="hoverColorDropdown"
      :text-color-dropdown="textColorDropdown"
      :border-color-dropdown="borderColorDropdown"
      :border-radius-dropdown="borderRadiusDropdown"
      :font-size-dropdown="fontSizeDropdown"
      :option-padding-dropdown="optionPaddingDropdown"
      :transitionDuration-dropdown="transitionDurationDropdown"
      :infinite-scroll="infiniteScroll"
      :remote-handler="remoteHandler"
      :filters="filters"
      @select="onSelect"
    >
      <template #trigger>
        <vega-input
          v-model="inputModel"
          :label="label"
          :placeholder="placeholderCurrent"
          :readonly="!searchable"
          :font-size="fontSize"
          :font-color="fontColor"
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
          :clearable="true"
          @focus="handleFocus"
          @blur="handleBlur"
          @clear="handleInputClear"
          @update:model-value="onSearch"
        >
          <template #label>
            <slot name="label" />
          </template>
          <template #clear-icon>
            <slot name="clear-icon"></slot>
          </template>
          <template #prefix>
            <slot name="prefix"></slot>
          </template>
          <template #postfix>
            <slot name="postfix">
              <VegaIconArrow :rotate="dropdownOpen ? '180deg' : '0deg'" />
            </slot>
          </template>
        </vega-input>
      </template>
    </vega-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
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
  valueField?: keyof Option<T>
  labelField?: keyof Option<T>
  placeholder?: string
  fontSize?: string
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
  isOpen?: boolean

  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
  infiniteScroll?: boolean

  remoteHandler?: (params: any) => Promise<ApiResponse<Option<string | number> | string | number>>
  options?: Array<Option<T> | string | number>

  modelValue?: Option<T> | string | number
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

  placeholder: 'Select value',
  label: '',
  modelValue: undefined,
})

const emits = defineEmits(['update:modelValue'])

const search = ref('')
const filters = computed(() => {
  return {
    search: search.value,
  }
})

const storage = props.storageKey ? useSelectState(props.storageKey) : null

const selected = storage
  ? storage.storageSelected
  : ref<Option<number | string> | string | number | null>(null)

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

const inputModel = ref<string | number | null>(null)
const isFocused = ref(false)
const dropdownOpen = ref(false)

const placeholderCurrent = ref(props.placeholder)

const handleBlur = () => {
  reset()
  updateInputModel()
  if (!inputModel.value) {
    placeholderCurrent.value = props.placeholder
  }
}

const handleFocus = () => {
  isFocused.value = true
  placeholderCurrent.value = selectedText.value || props.placeholder
  updateInputModel()
}

const updateInputModel = () => {
  inputModel.value = isFocused.value && props.searchable ? search.value : selectedText.value
}

const handleInputClear = () => {
  inputModel.value = ''
  placeholderCurrent.value = props.placeholder
  selected.value = null
  localStorageClear()
  emits('update:modelValue', null)
}

function onSelect(item: Option<number | string> | string | number) {
  selected.value = item
  emits('update:modelValue', selectedValue.value)
  localStorageSave(item)
}

function onSearch(payload: string) {
  search.value = payload
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

function reset() {
  isFocused.value = false
  search.value = ''
}

onMounted(() => {
  if (selectedValue.value !== null && props.storageKey) {
    emits('update:modelValue', selectedValue.value)
    inputModel.value = selectedText.value
  }
})
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
