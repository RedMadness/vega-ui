<template>
  <div class="input-container">
    <slot name="label">
      <span v-if="label">{{ label }}</span>
    </slot>
    <div class="input-wrapper" v-bind="$attrs">
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
      <span v-if="clearable && modelValue" class="clear-button" @click.stop="clearInput"
        ><slot name="clear-icon">&#10005;</slot>
      </span>
      <slot name="postfix"></slot>
    </div>
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

  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  readonly: false,
  placeholder: '',
  modelValue: '',
  fontSize: 'inherit',
  fontColor: 'var(--vega-text-color)',
  placeholderColor: 'var(--vega-gray)',
  backgroundColor: 'none',
  borderColor: 'var(--vega-border-color)',
  hoverBorderColor: 'var(--vega-border-color)',
  focusBorderColor: 'var(--vega-border-color)',
  borderRadius: '4px',
  padding: '10px',
  width: '100%',
  height: 'auto',
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
  // event.stopPropagation()
  emit('clear')
}

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (...args: any[]) {
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
  border: none;
  box-sizing: border-box;
  font-size: v-bind(fontSize);
  color: v-bind(fontColor);
  width: 100%;
  height: 100%;
  background-color: inherit;
  text-align: v-bind(textAlign);
}

.vega-input:focus {
  outline: none;
}

.vega-input::placeholder {
  color: v-bind(placeholderColor);
}

.input-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 0 1px v-bind(borderColor);
  border-radius: v-bind(borderRadius);
  background-color: v-bind(backgroundColor);
  padding: v-bind(padding);
  height: v-bind(height);
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

.clear-button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
  font-size: 16px;
}
.clear-button:hover {
  color: #999;
}
</style>
