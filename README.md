# Vega UI

Vue 3 UI library for rapid prototyping.

> **WARNING!**\
> This package is in the early stages of development. Use it at your own risk.

## Table of contents
- 🚀 [Getting Started](#install)
- 🏠 [Layout component](#vegalayout)
  - 🛠 [Props](#props)
  - 🛠 [Slots](#slots)
- 📄 [Lorem Ipsum component](#vegaloremipsum)

# Install
```shell
npm install vega-ui
```
# Usage

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
    <VegaLayout :aside-left="true">
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

# VegaLayout
Page layout component.

Simple example:
```vue
<template>
  <div style="height: 100vh">
    <VegaLayout
      header-border="#dcdfe6"
      header-background="#005689"
      aside-border="#dcdfe6"
      aside-background="#fff"
      content-background="#ececec"
      :header-first="true"
    >
      <template #header>
        <div></div>
      </template>
      <template #aside-left>
        <div></div>
      </template>
      <template #default>
        <VegaLoremIpsum />
      </template>
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```

> **Note**\
> If you want to create a full-page layout with a fixed header, you need to set `height: 100vh` for the parent DOM element.\
With this setup, only the content inside `<template #default>` will be scrollable.

Example above will give you a following structure:
```
+-------------------------------------+
| HEADER                              |
|                                     |
|------------------------------------++
|       |                            ||
| ASIDE | CONTENT                    ||
|       |                            ||
|       |                            ||
|       |                            ||
|       |                            ||
|       |             scroll ------->||
+------------------------------------++
```

Layouts can be nested:
```vue
<div style="height: 100vh">
  <VegaLayout
      header-height="80px"
      header-border="#dcdfe6"
      header-background="#005689"
      aside-border="#dcdfe6"
      aside-background="#fff"
      content-background="#ececec"
      :header-first="true"
  >
    <template #header>
      <div></div>
    </template>
    <template #aside-left>
      <div></div>
    </template>
    <template #default>
      <VegaLayout
          header-border="#dcdfe6"
          aside-border="#dcdfe6"
          aside-background="#fff"
          aside-right-width="350px"
      >
        <VegaLoremIpsum />
      </VegaLayout>
    </template>
  </VegaLayout>
</div>
```
Example above will give you a following structure:
```
+-----------------------------------------------------------------+
| HEADER 1                                                        |
|                                                                 |
|---------+-------------------------------------------------------|
| ASIDE 1 | HEADER 2                                    | ASIDE 2 |
|         |                                             |         |
|         |---------------------------------------------+         |
|         | CONTENT 2                                   |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
|         |                                             |         |
+---------|---------------------------------------------|---------+
```

## Props
### content-background
Content background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout content-background="#005689" />
```

### header-height
Header height. You can pass a string with valid css value. Default value is '80px'.

Example
```vue
<VegaLayout header-height="100px" />
```

### header-border
Header border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout header-border="#005689" />
```

### header-background
Header background color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout header-background="#fff" />
```

### header-shadow
Header shadow. You can pass any valid css [box-shadow](box-shadow) value as string. Default value is 'none'.

Example
```vue
<VegaLayout header-shadow="0 10px 20px #0000000d" />
```

### aside-left-width
Width of left asides. You can pass a string with valid css value. Default value is '350px'.

Example
```vue
<VegaLayout aside-left-width="200px" />
```

### aside-right-width
Width of right asides. You can pass a string with valid css value. Default value is 'unset'.

Example
```vue
<VegaLayout aside-right-width="350px" />
```

### aside-border
Asides (left and right) border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-border="#005689" />
```
### aside-background
Asides (left and right) background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-background="#fff" />
```

### header-first
Header must be on top of asides. Default value is 'false'.

Example
```vue
<VegaLayout header-first />
```
## Slots
### header
Header custom content

Example
```vue
<VegaLayout>
  <template #header>
    <div>Hello World!</div>
  </template>
</VegaLayout>
```
### aside-left
Left aside custom content

Example
```vue
<VegaLayout>
  <template #aside-left>
    <ul>
      <li>Coffee</li>
      <li>Tea</li>
      <li>Milk</li>
    </ul>
  </template>
</VegaLayout>
```
### aside-right
Right aside custom content

Example
```vue
<VegaLayout>
  <template #aside-right>
    <ul>
      <li>Neil Armstrong</li>
      <li>Alan Bean</li>
      <li>Peter Conrad</li>
      <li>Edgar Mitchell</li>
      <li>Alan Shepard</li>
    </ul>
  </template>
</VegaLayout>
```
### default
Content on page

Example
```vue
<VegaLayout>
  <div>Bunch of awesome content</div>
</VegaLayout>
```
# VegaLoremIpsum
Simple content placeholder.

Example
```vue
<VegaLoremIpsum />
```