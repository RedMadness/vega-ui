<template>
  <div class="input-container">
    <slot name="label">
      <span v-if="label">{{ label }}</span>
    </slot>
    <label class="input-wrapper" v-bind="$attrs">
      <slot name="prefix"></slot>
      <input
        :type="type"
        :readonly="readonly"
        class="vega-input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :autocomplete="type === 'password' ? 'on' : 'off'"
        :min="min"
        :max="max"
      />
      <span v-if="clearable && modelValue && !readonly" class="clear-button" @mousedown.stop="clearInput">
        <slot name="clear-icon">&#10005;</slot>
      </span>
      <slot name="postfix"></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Props, VegaInputProps } from '../props/VegaInputProps.ts'

const props = withDefaults(defineProps<Props & {
  type?: 'text' | 'password' | 'date' | 'email' | 'number' | 'url',
  clearable?: boolean
  min?: number
  max?: number
}>(), {
  ...VegaInputProps,
  type: 'text',
  clearable: true,
})

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['focus', 'blur', 'update:modelValue', 'clear'])

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event?: FocusEvent) {
  emit('blur', event)
}

function clearInput() {
  emit('clear')
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value;

  if (props.type === 'number' && (props.min || props.max)) {
    value = handleMinMax(value)
  }

  debouncedHandleInput(event, value)
}

function handleMinMax(value: string) {
  const floatValue = parseFloat(value)

  if (isNaN(floatValue)) {
    return '0'
  }

  if (props.min && floatValue < props.min) {
    return props.min.toString()
  }

  if (props.max && floatValue > props.max) {
    return props.max.toString()
  }

  return value
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

const debouncedHandleInput = debounce((event: Event, value?: string) => {
  const input = event.target as HTMLInputElement
  if (value) {
    input.value = value
  }
  emit('update:modelValue', value)
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
  background-color: transparent;
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
