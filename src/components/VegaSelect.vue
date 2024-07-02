<template>
  <div class="select-container">
    <slot name="label"></slot>
    <vega-input
      v-model="searchQuery"
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

export interface Option {
  [key: string]: any
}
export interface Props {
  searchable?: boolean
  localSearch?: boolean
  options?: Option[]

  valueField?: string
  labelField?: string

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
  //select props
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

const props = withDefaults(defineProps<Props>(), {
  searchable: false,
  localSearch: false,
  options: () => [] as Option[],

  valueField: 'value',
  labelField: 'label',

  placeholder: 'select',
})

const searchQuery = ref('')
const selected = ref<number | null>(null)
const dropdownOpen = ref(false)

const adaptedOptions = computed(() => {
  return props.options.map((option) => ({
    value: option[props.valueField],
    label: option[props.labelField],
  }))
})

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleInputClick = () => {
  toggleDropdown()
}

const selectItem = (item: Option) => {
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
