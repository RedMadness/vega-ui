<template>
  <div class="vega-sidebar" :class="{ 'vega-sidebar-exit': !show }">
    <div class="vega-sidebar-container">
      <slot name="header">
        <div class="vega-sidebar-header">
          <div v-if="show" class="vega-sidebar-header-content">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div>
            <slot name="toggle-button">
              <vega-sidebar-toggle :name="name">
                <slot name="toggle-icon" />
              </vega-sidebar-toggle>
            </slot>
          </div>
        </div>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSidebarState from '../use/useSidebarState.ts'
import VegaSidebarToggle from './VegaSidebarToggle.vue'

export interface Props {
  name?: string
  title?: string
  width?: string
  widthMin?: string
  headerHeight?: string
  padding?: string
  gap?: string
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar',
  title: '',
  width: '350px',
  widthMin: 'calc(2rem * 2 + 24px)',
  headerHeight: '80px',
  padding: '2rem',
  gap: '16px',
  background: 'none',
})

const { show } = useSidebarState(props.name)
</script>

<style scoped>
.vega-sidebar-header {
  min-height: v-bind(headerHeight);
  line-height: v-bind(headerHeight);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vega-sidebar-container {
  padding: 0 v-bind(padding);
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
  height: 100%;
}
.vega-sidebar {
  -webkit-transition: width 0.2s ease;
  -moz-transition: width 0.2s ease;
  -o-transition: width 0.2s ease;
  transition: width 0.2s ease;
  overflow-x: hidden;
  width: v-bind(width);
  height: 100%;
  background: v-bind(background);
}
.vega-sidebar-exit {
  width: v-bind(widthMin);
}

.vega-sidebar-header-content {
  display: flex;
  justify-content: flex-start;
  gap: 14px;
  align-items: center;
}
</style>
