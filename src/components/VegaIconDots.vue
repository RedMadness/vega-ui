<template>
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    :stroke="color"
  >
    <line x1="5.99" y1="12" x2="6" y2="12" stroke-linecap="round" stroke-width="2"></line>
    <line x1="11.99" y1="12" x2="12" y2="12" stroke-linecap="round" stroke-width="2"></line>
    <line x1="17.99" y1="12" x2="18" y2="12" stroke-linecap="round" stroke-width="2"></line>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string,
}>(), {
  color: 'var(--vega-text-color)'
})
</script>

<style scoped></style>
