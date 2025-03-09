<template>
  <div class="vega-sidebar-toggle" @click="onClick" v-if="displayed">
    <slot :show="show">
      <vega-icon-arrow :color="iconColor" :initial-rotate="initialRotate" :rotate="rotate" :transition="false" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from '../use/useSidebarState.ts'
import VegaIconArrow from './VegaIconArrow.vue'
import { computed } from 'vue'

export interface Props {
  name?: string
  showIf?: boolean | null
  alsoClose?: string[] | null
  iconToRight?: boolean
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar',
  showIf: null,
  alsoClose: null,
  right: false,
  iconColor: 'var(--vega-border-color)',
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

const rotate = computed(() => {
  return show.value ? '0deg' : '180deg'
})

const initialRotate = computed(() => (props.iconToRight ? -90 : 90))
</script>

<style scoped>
.vega-sidebar-toggle {
  cursor: pointer;
}
</style>
