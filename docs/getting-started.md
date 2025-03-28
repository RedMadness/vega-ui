::: warning
This package is currently in the early stages of development. Please use it with caution and be aware that you might encounter bugs or incomplete features.
:::

# Install
```shell
npm install vega-ui
```
# Import

Full Import
```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VegaUI from 'vega-ui'
import 'vega-ui/dist/style.css'

const app = createApp(App)

app.use(VegaUI)
app.mount('#app')
```
Manually import
```html
<template>
  <div style="height: 100vh">
    <VegaLayout>
      <VegaLoremIpsum />
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```
::: info
Importing styles.css is crucial for ensuring that the components are styled correctly. Make sure to include it in your project.
:::