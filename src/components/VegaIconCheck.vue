<template>
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12.9L10.1429 16.5L18 7.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup lang="ts">
export interface Props {
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: '#B5C7D3',
})
</script>

<style scoped>
svg {
  display: block;
  cursor: pointer;
}
</style>
