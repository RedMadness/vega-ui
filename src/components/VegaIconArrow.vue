<template>
  <div>
    <svg
      :class="{ transition: transition }"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :transform="'rotate(' + initialRotate + ', 12, 12)'"
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
  transition?: boolean
  initialRotate?: number
}

withDefaults(defineProps<Props>(), {
  color: '#B5C7D3',
  rotate: '90deg',
  transition: true,
  initialRotate: 0,
})
</script>

<style scoped>
svg {
  display: block;
  cursor: pointer;
  transform: rotate(v-bind(rotate));
}
.transition {
  transition: transform 150ms ease-in;
}
</style>
