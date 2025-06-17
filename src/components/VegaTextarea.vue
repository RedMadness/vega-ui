<template>
  <div class="input-container">
    <slot name="label">
      <span v-if="label">{{ label }}</span>
    </slot>
    <label class="input-wrapper" v-bind="$attrs">
      <slot name="prefix"></slot>
      <textarea
        ref="textarea"
        :readonly="readonly"
        class="vega-input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="inputHandler"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <slot name="postfix"></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
import { VegaTextareaProps, VegaTextareaDefaults } from '../props/VegaTextareaProps'
import { onMounted, useTemplateRef, watch } from 'vue'

const props = withDefaults(defineProps<VegaTextareaProps>(), VegaTextareaDefaults)
const ref = useTemplateRef('textarea')

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['focus', 'blur', 'update:modelValue'])

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event?: FocusEvent) {
  emit('blur', event)
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
  const inputElement = event.target as HTMLTextAreaElement
  emit('update:modelValue', inputElement.value)
}, props.delayDebounce)

function inputHandler(event: Event) {
  debouncedHandleInput(event)
  setAutoHeight()
}

function setAutoHeight() {
  const target = ref.value as HTMLTextAreaElement
  target.style.height = target.scrollHeight + 'px'
  requestAnimationFrame(() => {
    target.style.height = target.scrollHeight + 'px'
  })
}

onMounted(() => setAutoHeight())
watch(
  () => props.modelValue,
  () => {
    setAutoHeight()
  },
)
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
  resize: none;
  overflow: hidden;
  outline: none;
  font-family: inherit;
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
  height: auto;
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  opacity: 0;
}
</style>
