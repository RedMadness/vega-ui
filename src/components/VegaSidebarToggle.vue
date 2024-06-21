<template>
  <div class="vega-sidebar-toggle" @click="onClick">
    <slot>
      <div v-if="show"> < </div>
      <div v-else> > </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from "./useSidebarState.ts";

export interface Props {
  name?: string,
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar'
})

const { show, toggle } = useSidebarState(props.name)

function onClick() {
  toggle()
}
</script>

<style scoped>
.vega-sidebar-toggle {
  cursor: pointer;
}
</style>
