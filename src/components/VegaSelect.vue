<template>
  <div class="select-container">
    <slot name="label"></slot>

    <vega-input
      v-model="searchQuery"
      placeholder="Select option"
      label="label"
      :readonly="!searchable"
      @click="handleInputClick"
      @blur="closeDropdown"
      @focus="openDropdown"
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
import { ref, computed, PropType } from 'vue'
import VegaInput from './VegaInput.vue'

const props = defineProps({
  searchable: {
    type: Boolean,
    default: false,
  },
  localSearch: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<Array<{ value: number; label: string }>>,
    required: true,
  },
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

const openDropdown = () => {
  dropdownOpen.value = true
}

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

const selectItem = (item: { value: number; label: string }) => {
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
