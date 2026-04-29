<template>
  <svg :width="size" :height="size" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 12L6 7V6L19 6L19 7L14 12V17L11 19V12Z" :stroke="'none'" :fill="color" stroke-width="1.2" stroke-linecap="square"/>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: string
}>(), {
  color: 'var(--vega-gray)',
  size: '24px'
})
</script>

<style scoped></style>
