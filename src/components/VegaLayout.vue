<template>
  <section v-if="headerFirst" class="vega-container vega-column">
    <header class="vega-header vega-header-config">
      <slot name="header" />
    </header>
    <section class="vega-container vega-content">
      <aside v-if="asideLeft" class="vega-aside vega-aside-config">
        <slot name="aside-left" />
      </aside>
      <main class="vega-main">
        <slot />
      </main>
      <aside v-if="asideRight" class="vega-aside vega-aside-config">
        <slot name="aside-right" />
      </aside>
    </section>
  </section>
  <section v-else class="vega-container">
    <aside v-if="asideLeft" class="vega-aside vega-aside-config">
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
    <aside v-if="asideRight" class="vega-aside vega-aside-config">
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
  asideWidth?: string,
  asideBorder?: string,
  asideBackground?: string,
  asideLeft?: boolean
  asideRight?: boolean,
  headerFirst?: boolean,
}

withDefaults(defineProps<Props>(), {
  contentBackground: 'none',
  headerHeight: '80px',
  headerBorder: 'none',
  headerBackground: 'none',
  asideWidth: '350px',
  asideBorderColor: 'none',
  asideBackground: 'none',
  asideLeft: false,
  asideRight: false,
  headerFirst: false,
})
</script>

<style scoped>
.vega-container {
  --header-height: v-bind(headerHeight);
  --aside-width: v-bind(asideWidth);

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
}
.vega-aside {
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: auto;
}
.vega-main {
  box-sizing: border-box;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  padding: 0;
}

.vega-header-config {
  height: var(--header-height);
  border-bottom: v-bind(headerBorder) 1px solid;
  background: v-bind(headerBackground);
}
.vega-content {
  height: calc(100% - var(--header-height));
  background: v-bind(contentBackground);
}
.vega-aside-config {
  width: v-bind(asideWidth);
  border-right: v-bind(asideBorder) 1px solid;
  border-left: v-bind(asideBorder) 1px solid;
  background: v-bind(asideBackground);
}
</style>
