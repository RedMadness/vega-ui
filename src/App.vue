<template>
  <div style="height: 100vh">
    <vega-layout
        :header-first="true"
        header-background="#005689"
        aside-left-width="350px"
        aside-left-border="#dcdfe6"
        aside-left-background="#fff"
        content-background="#ececec"
    >
      <template #header>
        <div class="header">AWESOME HEADER</div>
      </template>
      <template #aside-left>
        <div></div>
      </template>
      <template #default>
        <vega-layout
            header-border="#dcdfe6"
            aside-right-width="350px"
            aside-right-border="#dcdfe6"
        >
          <template #header>
            <div class="header">AWESOME HEADER 2</div>
          </template>
          <vega-lorem-ipsum />
        </vega-layout>
      </template>
    </vega-layout>
  </div>
</template>

<script setup lang="ts">
import VegaLayout from "./components/VegaLayout.vue";
import VegaLoremIpsum from "./components/VegaLoremIpsum.vue";
</script>

<style scoped>
.header {
  padding: 0 2rem
}
</style>