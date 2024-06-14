<template>
  <div style="height: 100vh">
    <vega-layout
        header-background="#005689"
        aside-border="#dcdfe6"
        aside-background="#fff"
        aside-width="300px"
        content-background="#ececec"
        :header-first="true"
        :aside-left="true"
    >
      <template #header>
        <div class="header">AWESOME HEADER</div>
      </template>
      <template #aside-left>
        <div></div>
      </template>
      <template #default>
        <vega-layout
            aside-right
            header-border="#dcdfe6"
            aside-border="#dcdfe6"
            aside-background="#fff"
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