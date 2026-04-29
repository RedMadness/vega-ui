<template>
  <div>
    <vega-icon-arrow v-show="!active || !asc" :class="{ idle: !active }" rotate="180deg" :color="color" />
    <vega-icon-arrow v-show="!active || asc" rotate="0deg" :color="color" />
  </div>
</template>

<script setup lang="ts">

import VegaIconArrow from './VegaIconArrow.vue'

export interface Props {
  color?: string
  asc?: boolean
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'var(--vega-gray)',
  asc: true,
  active: false,
})
</script>

<style scoped>
.idle {
  height: 8px;
}
</style>
