<template>
  <div class="vega-sidebar-toggle" @click="onClick" v-if="displayed">
    <slot :show="show">
      <div v-if="show"> <vega-icon-arrow /> </div>
      <div v-else> <vega-icon-arrow rotate="-90deg" /> </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from "../use/useSidebarState.ts";
import VegaIconArrow from "./VegaIconArrow.vue";
import {computed} from "vue";

export interface Props {
  name?: string,
  showIf?: boolean|null,
  alsoClose?: string[]|null,
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar',
  showIf: null,
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

const displayed = computed(() => {
  if (props.showIf === null) {
    return true
  }
  return props.showIf === show.value
})
</script>

<style scoped>
.vega-sidebar-toggle {
  cursor: pointer;
}
</style>
