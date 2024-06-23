<template>
  <div class="vega-sidebar-toggle" @click="onClick">
    <slot :show="show">
      <div v-if="show"> <vega-icon-arrow /> </div>
      <div v-else> <vega-icon-arrow rotate="-90deg" /> </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from "../use/useSidebarState.ts";
import VegaIconArrow from "./VegaIconArrow.vue";

export interface Props {
  name?: string,
  alsoClose?: string[]|null,
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar',
  alsoClose: null,
})

const { show, toggle } = useSidebarState(props.name)

function onClick() {
  toggle()
  if (props.alsoClose) {
    props.alsoClose.forEach((key) => {
      useSidebarState(key).show.value = false
    })
  }
}
</script>

<style scoped>
.vega-sidebar-toggle {
  cursor: pointer;
}
</style>
