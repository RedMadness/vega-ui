<template>
  <input
    type="text"
    class="vega-input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="debouncedHandleInput"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
export interface Props {
  placeholder?: string
  modelValue?: string
  fontSize?: string
  fontColor?: string
  backgroundColor?: string
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
  padding?: string
  margin?: string
  width?: string
  height?: string
  fontWeight?: string
  textAlign?: string,
  delayDebounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'input text',
  modelValue: '',
  fontSize: '12px',
  fontColor: 'black',
  backgroundColor: 'transparent',
  borderWidth: '2px',
  borderColor: 'red',
  borderRadius: '4px',
  padding: '4px',
  margin: '0px',
  width: '100%',
  height: '100%',
  fontWeight: '400',
  textAlign: 'left',
  delayDebounce: 300
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
  box-shadow: 0 0 0 v-bind(borderWidth) v-bind(borderColor);
  border-radius: v-bind(borderRadius);
  padding: v-bind(padding);
  margin: v-bind(margin);
  width: v-bind(width);
  height: v-bind(height);
  font-weight: v-bind(fontWeight);
  text-align: v-bind(textAlign);
}

.vega-input:focus {
  outline: none;
}

</style>
