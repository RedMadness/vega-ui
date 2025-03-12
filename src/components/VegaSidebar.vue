<template>
  <div class="vega-sidebar" :class="{ 'vega-sidebar-exit': !show }">
    <div class="vega-sidebar-container">
      <slot name="header">
        <div v-if="headerRight" class="vega-sidebar-header-right">
          <div>
            <slot name="toggle-button">
              <vega-sidebar-toggle icon-to-right :name="name" :icon-color="toggleIconColor">
                <slot name="toggle-icon" />
              </vega-sidebar-toggle>
            </slot>
          </div>
          <div v-if="show" class="vega-sidebar-header-content">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>
        <div v-else class="vega-sidebar-header">
          <div v-if="show" class="vega-sidebar-header-content">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div>
            <slot name="toggle-button">
              <vega-sidebar-toggle :name="name" :icon-color="toggleIconColor">
                <slot name="toggle-icon" />
              </vega-sidebar-toggle>
            </slot>
          </div>
        </div>
      </slot>
      <div class="vega-sidebar-content">
        <slot></slot>
      </div>
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
  headerRight?: boolean
  headerGap?: string
  contentPadding?: string
  headerPadding?: string
  headerBorder?: string
  gap?: string
  background?: string
  toggleIconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'vega-sidebar',
  title: '',
  width: '350px',
  widthMin: 'calc(2rem * 2 + 24px)',
  headerHeight: '80px',
  headerRight: false,
  headerGap: '8px',
  headerPadding: '0 2rem',
  headerBorder: 'none',
  contentPadding: '0 2rem',
  gap: '16px',
  background: 'none',
  toggleIconColor: 'var(--vega-border-color)'
})

const { show } = useSidebarState(props.name)
</script>

<style scoped>
.vega-sidebar-header {
  min-height: v-bind(headerHeight);
  line-height: v-bind(headerHeight);
  padding: v-bind(headerPadding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: v-bind(headerBorder);
}
.vega-sidebar-header-right {
  min-height: v-bind(headerHeight);
  line-height: v-bind(headerHeight);
  padding: v-bind(headerPadding);
  display: flex;
  align-items: center;
  gap: v-bind(headerGap);
  border-bottom: v-bind(headerBorder);
}
.vega-sidebar-container {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
  height: 100%;
}
.vega-sidebar-content {
  padding: v-bind(contentPadding);
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
  scrollbar-width: thin;
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
