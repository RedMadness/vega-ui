<template>
  <div class="input-container">
    <slot name="label"></slot>
    <label class="input-wrapper">
      <slot name="prefix"></slot>
      <input
        type="text"
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
  placeholder?: string
  modelValue?: string
  fontSize?: string
  fontColor?: string
  backgroundColor?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  width?: string
  height?: string
  textAlign?: string
  delayDebounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: '',
  fontSize: 'inherit',
  fontColor: 'var(--vega-text-color)',
  backgroundColor: 'none',
  borderColor: 'var(--vega-border-color)',
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
  background-color: v-bind(backgroundColor);
  width: v-bind(width);
  height: v-bind(height);
  text-align: v-bind(textAlign);
}

.vega-input:focus {
  outline: none;
}

.input-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 0 1px v-bind(borderColor);
  border-radius: v-bind(borderRadius);
  padding: v-bind(padding);
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
