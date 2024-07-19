<template>
  <div class="tooltip" @mouseenter="getMousePosition">
    <slot></slot>
    <span class="tooltip-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  text: String,
})

const x = ref('0px')
const y = ref('0px')

function getMousePosition(event: MouseEvent) {
  console.log(event)
  x.value = event.clientX + 20 + 'px'
  y.value = event.clientY + 20 + 'px'
}
</script>

<style scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltip-text {
  visibility: hidden;
  max-width: 220px;
  background-color: #555;
  color: #fff;
  padding: 10px 15px;
  border-radius: 6px;

  /* Position the tooltip text */
  position: fixed;
  left: v-bind(x);
  top: v-bind(y);

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
