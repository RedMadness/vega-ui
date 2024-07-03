<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="searchQuery"
      :placeholder="placeholder"
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
      @click="handleInputClick"
      @blur="closeDropdown"
    >
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:postfix>
        <slot name="postfix"></slot>
      </template>
    </vega-input>

    <!-- dropdown -->
    <vega-dropdown
      :items="adaptedOptions"
      :isOpen="dropdownOpen"
      background-color-dropdown="white"
      @select="selectItem"
      @close="closeDropdown"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import VegaInput from './VegaInput.vue'
import VegaDropdown from './VegaDropdown.vue'

export interface Option<T> {
  [key: string]: T
}
export interface Props<T> {
  searchable?: boolean
  localSearch?: boolean

  options: Array<Option<T> | T>

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
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  searchable: false,
  localSearch: false,
  options: () => [] as (Option<number | string> | number | string)[],
  valueField: 'value',
  labelField: 'label',

  placeholder: 'select',
})

const searchQuery = ref('')
const selected = ref<number | string | null>(null)
const dropdownOpen = ref(false)

const createOption = (option: Option<number | string> | number | string) => {
  if (typeof option !== 'object') {
    return { value: option, label: String(option) }
  }

  const value = option[props.valueField] ?? '[Undefined value]'
  const label = option[props.labelField] ?? '[Undefined label]'

  return { value, label }
}

const adaptedOptions = computed(() => props.options.map(createOption))

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: { value: number | string; label: string }) => {
  selected.value = item.value
  searchQuery.value = item.label
  closeDropdown()
}
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
