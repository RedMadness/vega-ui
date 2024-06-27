::: warning
This package is in the early stages of development. Use it at your own risk.
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
```vue
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
> **Note**\
> styles.css very important. Don't forget import it!