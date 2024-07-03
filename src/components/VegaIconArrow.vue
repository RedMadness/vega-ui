<template>
  <div>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 10L12 14L8 10"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  color?: string
  rotate?: string
}

withDefaults(defineProps<Props>(), {
  color: '#B5C7D3',
  rotate: '90deg',
})
</script>

<style scoped>
svg {
  display: block;
  cursor: pointer;
  transform: rotate(v-bind(rotate));
  transition: transform 150ms ease-in;
}
</style>
