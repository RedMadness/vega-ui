<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="inputModel"
      label="label"
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
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-slot:prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-slot:postfix>
        <slot name="postfix"></slot>
      </template>
    </vega-input>

    <!-- dropdown -->
    <!-- TODO add props for dropdown from select -->
    <vega-dropdown
      :items="adaptedOptions"
      :isOpen="dropdownOpen"
      @select="selectItem"
      @loadMoreItems="loadMoreItems"
      @close="closeDropdown"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import VegaInput from './VegaInput.vue'
import VegaDropdown from './VegaDropdown.vue'

export interface Option<T> {
  [key: string]: T
}
export interface Props<T> {
  searchable?: boolean

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
  options: () => [] as (Option<number | string> | number | string)[],
  valueField: 'value',
  labelField: 'label',

  placeholder: 'select',
})

const searchQuery = ref('')
const displayValue = ref('')
const inputModel = ref('')
const isFocused = ref(false)
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

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  //нужно чтобы после выбора опции срабатывал внутри компонента input
  isFocused.value = false
  dropdownOpen.value = false
  if (!searchQuery.value || !props.searchable) {
    inputModel.value = displayValue.value
  }
  console.log('VegaSelect.vue handleBlur')
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: { value: number | string; label: string }) => {
  selected.value = item.value
  displayValue.value = item.label
  if (props.searchable) {
    searchQuery.value = ''
  } else {
    searchQuery.value = item.label
  }
  handleBlur() //тут убрать прямой вызов метода, нужно сделать через инпут
}

watch(isFocused, (newVal) => {
  inputModel.value = newVal && props.searchable ? searchQuery.value : displayValue.value
})

watch(searchQuery, (newVal) => {
  if (isFocused.value && props.searchable) {
    inputModel.value = newVal
  }
})

const loadMoreItems = () => {
  console.log('vega-select loadMore')
}
</script>

<style scoped>
.select-container {
  position: relative;
}
</style>
