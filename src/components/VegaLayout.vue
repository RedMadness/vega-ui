<template>
  <section v-if="headerFirst" class="vega-container vega-column">
    <header class="vega-header vega-header-config">
      <slot name="header" />
    </header>
    <section class="vega-section vega-content">
      <aside class="vega-aside vega-aside-left-config">
        <slot name="aside-left" />
      </aside>
      <main class="vega-main">
        <slot />
      </main>
      <aside class="vega-aside vega-aside-right-config">
        <slot name="aside-right" />
      </aside>
    </section>
  </section>
  <section v-else class="vega-container">
    <aside class="vega-aside vega-aside-left-config">
      <slot name="aside-left" />
    </aside>
    <section class="vega-section vega-column">
      <header class="vega-header vega-header-config">
        <slot name="header" />
      </header>
      <main class="vega-main">
        <slot />
      </main>
    </section>
    <aside class="vega-aside vega-aside-right-config">
      <slot name="aside-right" />
    </aside>
  </section>
</template>

<script setup lang="ts">
export interface Props {
  containerPadding?: string
  containerBackground?: string
  contentBackground?: string
  contentBorderRadius?: string
  contentPadding?: string
  headerHeight?: string
  headerBorder?: string
  headerBorderRadius?: string
  headerBackground?: string
  headerPadding?: string
  asideLeftWidth?: string
  asideLeftBorder?: string
  asideLeftBackground?: string
  asideRightWidth?: string
  asideRightBorder?: string
  asideRightBackground?: string
  headerFirst?: boolean
  headerShadow?: string
  scrollbarColor?: string
}

withDefaults(defineProps<Props>(), {
  containerBackground: 'none',
  containerPadding: '0',
  contentBackground: 'none',
  contentBorderRadius: '0',
  contentPadding: '0',
  headerHeight: '80px',
  headerBorder: 'none',
  headerBorderRadius: '0',
  headerBackground: 'none',
  headerPadding: '2rem',
  asideLeftWidth: 'initial',
  asideLeftBorder: 'none',
  asideLeftBackground: 'none',
  asideRightWidth: 'initial',
  asideRightBorder: 'none',
  asideRightBackground: 'none',
  headerFirst: false,
  headerShadow: 'none',
  scrollbarColor: 'var(--vega-border-color)',
})
</script>

<style scoped>
.vega-container {
  --vega-header-height: v-bind(headerHeight);

  background: v-bind(containerBackground);
  padding: v-bind(containerPadding);
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-basis: auto;
  flex-direction: row;
  min-width: 0;
  height: 100%;
}
.vega-section {
  background: v-bind(containerBackground);
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-basis: auto;
  flex-direction: row;
  min-width: 0;
  height: 100%;
}
.vega-column {
  flex-direction: column;
}
.vega-header {
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  border-radius: v-bind(headerBorderRadius);
}
.vega-aside {
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: auto;
  z-index: 2;
}
.vega-main {
  box-sizing: border-box;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  padding: v-bind(contentPadding);
  z-index: 0;
  background: v-bind(contentBackground);
  scrollbar-width: thin;
  border-radius: v-bind(contentBorderRadius);
  scrollbar-color: v-bind(scrollbarColor) v-bind(contentBackground);
}

.vega-header-config {
  height: var(--vega-header-height);
  border-bottom: v-bind(headerBorder) 1px solid;
  background: v-bind(headerBackground);
  box-shadow: v-bind(headerShadow);
  padding: 0 v-bind(headerPadding);
}
.vega-content {
  height: calc(100% - var(--vega-header-height));
}
.vega-aside-left-config {
  width: v-bind(asideLeftWidth);
  border-right: v-bind(asideLeftBorder) 1px solid;
  background: v-bind(asideLeftBackground);
}
.vega-aside-right-config {
  width: v-bind(asideRightWidth);
  border-left: v-bind(asideRightBorder) 1px solid;
  background: v-bind(asideRightBackground);
}
</style>
