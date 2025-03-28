<template>
  <div class="input-container">
    <slot name="label">
      <span v-if="label">{{ label }}</span>
    </slot>
    <label class="input-wrapper" v-bind="$attrs">
      <slot name="prefix"></slot>
      <input
        ref="inputRef"
        :type="type"
        :readonly="readonly"
        class="vega-input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="debouncedHandleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :autocomplete="type === 'password' ? 'on' : 'off'"
      />
      <span v-if="clearable && modelValue" class="clear-button" @mousedown.stop="clearInput">
        <slot name="clear-icon">&#10005;</slot>
      </span>
      <slot name="postfix"></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  type?: 'text' | 'password' | 'date' | 'email' | 'number' | 'url'
  label?: string
  readonly?: boolean
  placeholder?: string
  modelValue?: string | number | null
  cursorType?: string
  fontSize?: string
  fontWeight?: string
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

  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  readonly: false,
  placeholder: '',
  modelValue: '',
  cursorType: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  fontColor: 'var(--vega-text-color)',
  placeholderColor: 'var(--vega-gray)',
  backgroundColor: 'none',
  borderColor: 'var(--vega-border-color)',
  hoverBorderColor: 'var(--vega-border-color)',
  focusBorderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  padding: '10px 5px',
  width: '100%',
  height: '40px',
  textAlign: 'left',
  delayDebounce: 300,

  clearable: true,
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['focus', 'blur', 'update:modelValue', 'clear'])

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

const inputRef = ref<HTMLElement | null>(null)
function handleBlur(event?: FocusEvent) {
  emit('blur', event)
}

function clearInput() {
  emit('clear')
}

function debounce<Arg extends unknown[]>(func: (...args: Arg) => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (...args: Arg) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

const debouncedHandleInput = debounce((event: Event) => {
  const inputElement = event.target as HTMLInputElement
  emit('update:modelValue', inputElement.value)
}, props.delayDebounce)
</script>

<style scoped>
.vega-input {
  cursor: v-bind(cursorType);
  border: none;
  box-sizing: border-box;
  font-size: v-bind(fontSize);
  font-weight: v-bind(fontWeight);
  color: v-bind(fontColor);
  width: 100%;
  height: 100%;
  background-color: inherit;
  text-align: v-bind(textAlign);
}

.vega-input:focus {
  cursor: v-bind(cursorType);
  outline: none;
}

.vega-input::placeholder {
  color: v-bind(placeholderColor);
}

.input-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 0 1px v-bind(borderColor);
  border-radius: v-bind(borderRadius);
  background-color: v-bind(backgroundColor);
  padding: v-bind(padding);
  height: v-bind(height);
  box-sizing: border-box;
}

.input-wrapper:hover {
  box-shadow: 0 0 0 1px v-bind(hoverBorderColor);
}

.input-wrapper:focus-within {
  box-shadow: 0 0 0 1px v-bind(focusBorderColor);
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: v-bind(width);
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  opacity: 0;
}

.clear-button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #ccc;
  font-size: 14px;
  margin: auto;
}
.clear-button:hover {
  color: #999;
}
</style>
