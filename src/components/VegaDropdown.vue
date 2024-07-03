<template>
  <div
    class="dropdown"
    :class="{ open: isOpen }"
    @scroll="handleScroll"
    @blur="closeDropdown"
    tabindex="-1"
  >
    <div
      v-for="item in items"
      :key="item.value"
      class="dropdown-item"
      @click="selectItem(item)"
      @mousedown.prevent
    >
      {{ item[labelField] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export interface Option<T> {
  [key: string]: T
}

export interface Props<T> {
  items?: Array<Option<T>>
  valueField?: keyof Option<T>
  labelField?: keyof Option<T>

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
}

const props = withDefaults(defineProps<Props<number | string>>(), {
  items: () => [] as Option<number | string>[],
  valueField: 'value',
  labelField: 'label',
  isOpen: false,
  backgroundColorDropdown: 'white', //заменить на транспарент
  hoverColorDropdown: 'transparent',
  textColorDropdown: 'inherit',
  borderColorDropdown: 'inherit',
  borderRadiusDropdown: '4px',
  fontSizeDropdown: 'inherit',
  optionPaddingDropdown: '8px 12px',
  transitionDurationDropdown: '0.3s',

  infiniteScroll: true, //заменить на фалсе
})

const emits = defineEmits(['select', 'close', 'loadMoreItems'])

const loading = ref(false)
const reachedBottom = ref(false)

const closeDropdown = () => {
  resetScrollState()
  emits('close')
}

const selectItem = (item: Option<number | string>) => {
  emits('select', { value: item[props.valueField], label: item[props.labelField] })
}

function resetScrollState() {
  reachedBottom.value = false
  loading.value = false
}

function checkScrollPosition(
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number
): boolean {
  return scrollTop + clientHeight >= scrollHeight - 10
}

function triggerDataLoad() {
  if (props.infiniteScroll && !loading.value) {
    loading.value = true
    emits('loadMoreItems')
  }
}

const handleScroll = (event: Event) => {
  const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement

  if (!checkScrollPosition(scrollTop, clientHeight, scrollHeight)) {
    resetScrollState()
    return
  }

  if (reachedBottom.value) return

  reachedBottom.value = true
  triggerDataLoad()
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
