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
    <div class="dropdown" :class="{ open: dropdownOpen }" @blur="closeDropdown" tabindex="-1">
      <div
        v-for="item in filteredItems"
        :key="item.value"
        class="dropdown-item"
        @click="selectItem(item)"
        @mousedown.prevent
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import VegaInput from './VegaInput.vue'

export interface Option {
  value: number
  label: string
}
export interface Props {
  searchable?: boolean
  localSearch?: boolean
  options?: Option[]
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
}

const props = withDefaults(defineProps<Props>(), {
  searchable: false,
  localSearch: false,
  options: () => [] as Option[],
  placeholder: 'select',
})

const searchQuery = ref('')
const selected = ref<number | null>(null)
const dropdownOpen = ref(false)

const filteredItems = computed(() => {
  // filtering with available localSearch and have value in searchQuery
  if (props.searchable && props.localSearch && searchQuery.value) {
    return props.options.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  // return all options
  return props.options
})

const closeDropdown = () => {
  dropdownOpen.value = false
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleInputClick = () => {
  if (!props.searchable) {
    toggleDropdown()
  }
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

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  background-color: white;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown.open {
  max-height: 200px;
  opacity: 1;
}
</style>
