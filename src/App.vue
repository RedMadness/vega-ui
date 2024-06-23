<template>
  <div style="height: 100vh">
    <vega-layout
        :header-first="true"
        header-background="#005689"
        aside-left-border="#dcdfe6"
        aside-left-background="#fff"
        aside-right-background="#fff"
        content-background="#ececec"
    >
      <template #header>AWESOME HEADER</template>

      <template #aside-left>
        <vega-sidebar title="SIDEBAR TITLE">
          <vega-lorem-ipsum />
        </vega-sidebar>
      </template>

      <template #default>
        <vega-layout header-border="#dcdfe6" aside-right-border="#dcdfe6">
          <template #header>
            AWESOME HEADER 2
          </template>

          <template #default>
            <vega-lorem-ipsum />
          </template>

          <template #aside-right>
            <vega-sidebar name="vega-sidebar-right" title="SIDEBAR TITLE 2" />
          </template>
        </vega-layout>
      </template>
    </vega-layout>
  </div>
</template>

<script setup lang="ts">
import VegaLayout from "./components/VegaLayout.vue";
import VegaLoremIpsum from "./components/VegaLoremIpsum.vue";
import VegaSidebar from "./components/VegaSidebar.vue";
</script>

<style scoped></style>