<template>
  <vega-select
    v-model="selected"
    :options="options"
    :searchable="searchable"
    :value-field="valueField"
    :label-field="labelField"
    :background-color="backgroundColor"
    :background-color-dropdown="backgroundColorDropdown"
    :delay-debounce="delayDebounce"
    :clearable="clearable"
    :not-empty="notEmpty"
    :label="label"
    :remote-handler="remoteHandler"
    :font-size="fontSize"
    :font-color="fontColor"
    :tooltip-field="tooltipField"
    :padding="padding"
    :option-padding-dropdown="optionPaddingDropdown"
    :width="width"
    :height="height"
    :border-color="borderColor"
    :border-color-dropdown="borderColorDropdown"
    :border-radius="borderRadius"
    :border-radius-dropdown="borderColorDropdown"
    :focus-border-color="focusBorderColor"
    :font-size-dropdown="fontSizeDropdown"
    :font-weight="fontWeight"
    :hover-color-dropdown="hoverColorDropdown"
    :hover-border-color="hoverBorderColor"
    :hover-text-color-dropdown="hoverTextColorDropdown"
    :infinite-scroll="infiniteScroll"
    :no-options-message="noOptionsMessage"
    :placeholder-color="placeholderColor"
    :placeholder="placeholder"
    :text-align="textAlign"
    :text-color-dropdown="textColorDropdown"
    :transition-duration-dropdown="transitionDurationDropdown"
    @clear="onClear"
    @selected="onSelect"
    @update:model-value="localStorageSave"
  >
    <template #clear-icon>
      <slot name="clear-icon"></slot>
    </template>
    <template #label>
      <slot name="label"></slot>
    </template>
    <template #postfix>
      <slot name="postfix"></slot>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
  </vega-select>
</template>

<script lang="ts" setup>
import useSelectState from '../use/useSelectState.ts'
import VegaSelect from './VegaSelect.vue'

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

  remoteHandler?: (
    params: object,
  ) => Promise<ApiResponse<Option<string | number> | string | number>>
  options?: Array<Option<T> | string | number>

  modelValue?: Option<T> | string | number | null
  storageKey: string
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

const emits = defineEmits(['selected', 'clear', 'changed'])
const storage = useSelectState(props.storageKey)
const selected = storage.selected

const onClear = () => {
  localStorageClear()
  emitClear()
}

function onSelect(item: Option<number | string> | string | number) {
  emitSelected(item)
}

function localStorageSave(payload: Option<number | string | null> | string | number | null) {
  if (payload) {
    storage.storageSave(payload)
  }
  emits('changed', payload)
}

function localStorageClear() {
  storage.storageClear()
}

function emitSelected(payload: Option<number | string> | string | number) {
  emits('selected', payload)
}

function emitClear() {
  emits('clear')
}
</script>

<style scoped></style>
