<template>
  <span class="loader" />
</template>

<script setup lang="ts">

import { VegaLoadingProps } from '../props/VegaLoadingProps'

withDefaults(defineProps<VegaLoadingProps>(), {
  color: 'var(--vega-primary)',
  scale: 1,
})
</script>

<style scoped>
.loader {
  width: calc(30px * v-bind(scale));
  height: calc(30px * v-bind(scale));
  border: 5px solid #fff;
  border-bottom-color: v-bind(color);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
