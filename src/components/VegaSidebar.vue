<template>
  <div class="aside" :class="{ 'aside-exit': !show }">
    <div class="vega-aside-container">
      <div class="vega-sidebar-header">
        <div v-if="show" class="sidebar-header-content">
          <slot name="title" />
        </div>
        <div>
          <slot name="title-postfix">
            <vega-sidebar-toggle :name="name" />
          </slot>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from './useSidebarState'
import VegaSidebarToggle from "./VegaSidebarToggle.vue";

export interface Props {
  headerHeight?: string,
  padding?: string,
  name?: string,
  width?: string,
  widthMin?: string,
}

const props =  withDefaults(defineProps<Props>(), {
  headerHeight: '80px',
  padding: '2rem',
  name: 'vega-sidebar',
  width: '350px',
  widthMin: 'calc(2rem * 2)',
})

const { show } = useSidebarState(props.name)

</script>

<style scoped>
.vega-sidebar-header {
  line-height: v-bind(headerHeight);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vega-aside-container {
  padding: 0 v-bind(padding);
}
.aside {
  -webkit-transition: width 0.2s ease;
  -moz-transition: width 0.2s ease;
  -o-transition: width 0.2s ease;
  transition: width 0.2s ease;
  overflow: hidden;
  width: v-bind(width);
}
.aside-exit {
  width: v-bind(widthMin);
}
</style>
