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
  backgroundColorDropdown?: string
  hoverColorDropdown?: string
  textColorDropdown?: string
  borderColorDropdown?: string
  borderRadiusDropdown?: string
  fontSizeDropdown?: string
  optionPaddingDropdown?: string
  transitionDurationDropdown?: string
}

withDefaults(defineProps<Props>(), {
  items: () => [] as Option[],
  isOpen: false,
  backgroundColorDropdown: 'transparent',
  hoverColorDropdown: 'transparent',
  textColorDropdown: 'inherit',
  borderColorDropdown: 'inherit',
  borderRadiusDropdown: '4px',
  fontSizeDropdown: 'inherit',
  optionPaddingDropdown: '8px 12px',
  transitionDurationDropdown: '0.3s',
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
  box-shadow: 0 0 0 1px v-bind(borderColorDropdown);
  border-radius: v-bind(borderRadiusDropdown);
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  max-height: 0;
  opacity: 0;
  transition: all v-bind(transitionDurationDropdown) ease-in-out;
  overflow: auto;
  color: v-bind(textColorDropdown);
  font-size: v-bind(fontSizeDropdown);
}

.dropdown-item {
  padding: v-bind(optionPaddingDropdown);
  cursor: pointer;
  background-color: v-bind(backgroundColorDropdown);
}

.dropdown-item:hover {
  background-color: v-bind(hoverColorDropdown);
}

.dropdown.open {
  max-height: 200px;
  opacity: 1;
}
</style>
