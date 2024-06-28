<template>
  <div class="dropdown" :class="{ open: isOpen }" @blur="closeDropdown" tabindex="-1">
    <div
      v-for="item in items"
      :key="item.value"
      class="dropdown-item"
      @click="selectItem(item)"
      @mousedown.prevent
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Option {
  value: number
  label: string
}

export interface Props {
  items?: Option[]
  isOpen?: boolean
}

withDefaults(defineProps<Props>(), {
  items: () => [] as Option[],
  isOpen: false,
})

const emits = defineEmits(['select', 'close'])

const closeDropdown = () => {
  emits('close')
}

const selectItem = (item: Option) => {
  emits('select', item)
}
</script>

<style scoped>
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
