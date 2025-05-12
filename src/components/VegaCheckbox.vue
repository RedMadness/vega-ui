<template>
  <label class="vega-checkbox">
    <span class="vega-checkbox-input">
      <input type="checkbox" :checked="checked" class="vega-checkbox-original" @input="onSelect" />
      <span class="vega-checkbox-actual" />
    </span>
    <span class="vega-checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">

import { computed, PropType } from 'vue'

const props = defineProps({
  modelValue: [Boolean, String, Number],
  checkedValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  checkedColor: {
    type: String,
    default: 'var(--vega-primary)',
  },
  label: String,
  labelPosition: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'right',
  },
  labelGap: {
    type: String,
    default: '6px',
  },
  checkboxSize: {
    type: String,
    default: '16px',
  }
})
const emit = defineEmits(['update:modelValue'])

const checked = computed(() => props.modelValue === props.checkedValue)
function onSelect() {
  emit('update:modelValue', checked.value ? props.uncheckedValue : props.checkedValue)
}

const flexDirection = computed(() => {
  switch (props.labelPosition) {
    case 'top':
      return 'column-reverse'
    case 'bottom':
      return 'column'
    case 'left':
      return 'row-reverse'
    case 'right':
      return 'row'
    default:
      return 'row'
  }
})
</script>

<style scoped>
.vega-checkbox {
  cursor: pointer;
  display: inline-flex;
  flex-direction: v-bind(flexDirection);
  gap: v-bind(labelGap);
}
.vega-checkbox-input {
  display: flex;
  align-items: center;
  .vega-checkbox-original {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  .vega-checkbox-original:checked + .vega-checkbox-actual:after {
    background-color: v-bind(checkedColor);
    border-color: v-bind(checkedColor);
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9.5 7.5'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M.25 4.35l3.93 2.4 5.07-6'/%3E%3C/svg%3E");
  }
  .vega-checkbox-original:focus-visible + .vega-checkbox-actual:after {
    border: 1px solid var(--vega-primary);
    outline: 1px solid var(--vega-border-color);
  }
  .vega-checkbox-actual {
    position: relative;
    width: v-bind(checkboxSize);
    height: v-bind(checkboxSize);
    display: inline-block;
  }
  .vega-checkbox-actual:after {
    background-size: 60%;
    border-radius: 0.125rem;
    transition: all 0.2s;
    border: 1px solid var(--vega-border-color);
    background-color: transparent;
    background-position: 50%;
    background-repeat: no-repeat;
    position: absolute;
    content: '';
    box-sizing: border-box;
    width: v-bind(checkboxSize);
    height: v-bind(checkboxSize);
    user-select: none;
  }
}
.vega-checkbox-label {
  display: inline-block;
}
</style>
