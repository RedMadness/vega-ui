<template>
  <div style="height: 100vh">
    <vega-layout
        header-border="#dcdfe6"
        header-background="#005689"
        aside-border="#dcdfe6"
        aside-background="#fff"
        aside-width="300px"
        content-background="#ececec"
        :header-first="true"
        :aside-left="true"
    >
      <template #header>
        <div></div>
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

<style scoped></style>