<template>
  <div class="input-container">
    <slot name="label"></slot>
    <label class="input-wrapper">
      <slot name="prefix"></slot>
      <input
        :type="type"
        :readonly="readonly"
        class="vega-input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="debouncedHandleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <slot name="postfix"></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  type?: string
  readonly?: boolean
  placeholder?: string
  modelValue?: string
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
  type: 'text',
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
})

const emit = defineEmits(['focus', 'blur', 'update:modelValue'])

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
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
</style>
