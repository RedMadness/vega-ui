<template>
  <div class="autocomplete">
    <vega-input v-model="searchQuery" placeholder="select" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VegaInput from './VegaInput.vue'

const searchQuery = ref<string>('test1111')
</script>

<style scoped>
.autocomplete {
  width: 80%;
  padding: 10px;
}
</style>
