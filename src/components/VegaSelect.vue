<template>
  <div class="autocomplete">
    <vega-input
      v-if="searchable"
      v-model="searchQuery"
      placeholder="Select option"
      @blur="closeDropdown"
      @focus="openDropdown"
    />

    <!-- Отображение выбранного значения, когда searchable === false -->
    <div v-else class="selected-value" @click="toggleDropdown">
      {{ selectedLabel }}
    </div>

    <!-- Кастомный выпадающий список -->
    <div class="dropdown" v-show="dropdownOpen" @blur="closeDropdown" tabindex="-1">
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
  options: {
    type: Array as PropType<Array<{ value: number; label: string }>>,
    required: true,
  },
})

const searchQuery = ref('')
const selected = ref<number | null>(null)
const dropdownOpen = ref(false)

const filteredItems = computed(() => {
  if (props.searchable && searchQuery.value) {
    return props.options.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return props.options
})

const selectedLabel = computed(() => {
  const selectedItem = props.options.find((option) => option.value === selected.value)
  return selectedItem ? selectedItem.label : 'Select option'
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

const selectItem = (item: { value: number; label: string }) => {
  selected.value = item.value
  searchQuery.value = item.label
  closeDropdown()
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  z-index: 100;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  background-color: white;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.selected-value {
  background: white;
}
</style>
