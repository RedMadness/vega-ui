<template>
  <section v-if="headerFirst" class="vega-container vega-column">
    <header class="vega-header vega-header-config">
      <slot name="header" />
    </header>
    <section class="vega-container vega-content">
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
    <section class="vega-container vega-column">
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
  contentBackground?: string
  headerHeight?: string
  headerBorder?: string,
  headerBackground?: string,
  asideLeftWidth?: string,
  asideLeftBorder?: string,
  asideLeftBackground?: string,
  asideRightWidth?: string,
  asideRightBorder?: string,
  asideRightBackground?: string,
  headerFirst?: boolean,
  headerShadow?: string,
}

withDefaults(defineProps<Props>(), {
  contentBackground: 'none',
  headerHeight: '80px',
  headerBorder: 'none',
  headerBackground: 'none',
  asideLeftWidth: 'initial',
  asideLeftBorder: 'none',
  asideLeftBackground: 'none',
  asideRightWidth: 'initial',
  asideRightBorder: 'none',
  asideRightBackground: 'none',
  headerFirst: false,
  headerShadow: 'none'
})
</script>

<style scoped>
.vega-container {
  --vega-header-height: v-bind(headerHeight);

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
  padding: 0;
  z-index: 0;
}

.vega-header-config {
  height: var(--vega-header-height);
  line-height: var(--vega-header-height);
  border-bottom: v-bind(headerBorder) 1px solid;
  background: v-bind(headerBackground);
  box-shadow: v-bind(headerShadow);
}
.vega-content {
  height: calc(100% - var(--vega-header-height));
  background: v-bind(contentBackground);
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
