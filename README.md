# Vega UI 🌌

Vue 3 UI library for rapid prototyping.

> **WARNING!**\
> This package is in the early stages of development. Use it at your own risk.

## Table of contents
- 🚀 [Getting Started](#install)
- 🏠 [Layout component](#vegalayout)
  - 🛠 [Props](#props)
  - 🛠 [Slots](#slots)
- 🎫 [Sidebar component](#vegasidebar)
  - 🛠 [Props](#props-1)
  - 🛠 [Slots](#slots-1)
- 🔗 [Sidebar Toggle component](#vegasidebartoggle)
  - 🛠 [Props](#props-2)
  - 🛠 [Slots](#slots-2)
- 🐠 [Lorem Ipsum component](#vegaloremipsum)

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

# VegaLayout
Page layout component.

Simple example:
```vue
<template>
  <div style="height: 100vh">
    <VegaLayout
      :header-first="true"
      header-background="#005689"
      aside-left-width="350px"
      aside-left-border="#dcdfe6"
      aside-left-background="#fff"
      content-background="#ececec"
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
      :header-first="true"
      header-background="#005689"
      aside-left-width="350px"
      aside-left-border="#dcdfe6"
      aside-left-background="#fff"
      content-background="#ececec"
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
          aside-right-width="350px"
          aside-right-border="#dcdfe6"
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

### header-padding
Header left and right padding. You can pass a string with valid css value. Default value is '2rem'.

Example
```vue
<VegaLayout header-padding="40px" />
```

### aside-left-width
Left aside width. You can pass a string with valid css value. Default value is 'initial'.

Example
```vue
<VegaLayout aside-left-width="200px" />
```

### aside-left-border
Left aside border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-left-border="#005689" />
```
### aside-left-background
Left aside background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-left-background="#fff" />
```

### aside-right-width
Right aside width. You can pass a string with valid css value. Default value is 'initial'.

Example
```vue
<VegaLayout aside-right-width="350px" />
```

### aside-right-border
Right aside border color. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-right-border="#005689" />
```
### aside-right-background
Right aside background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaLayout aside-right-background="#fff" />
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
# VegaSidebar
Sidebar with state memory.\
Component out of the box provide a hide/show button.
By default, it is places in top right corner and uses vega icon, but you can override this.\
In addition, the sidebar saves its show/hide state in local storage, so when page reloads, it will be in same state as before.

Simple example:
```vue
<template>
  <div style="height: 100vh">
    <VegaLayout>
      <template #aside-left>
        <VegaSidebar name="my-sidebar" title="SIDEBAR TITLE" />
      </template>
      <template #default>
        <VegaLoremIpsum />
      </template>
    </VegaLayout>
  </div>
</template>

<script setup>
  import { VegaLayout, VegaSidebar } from 'vega-ui'
  import 'vega-ui/dist/style.css'
</script>
```

## Props
### name
Name of sidebar. Used as a key to store state of sidebar in local storage. You can pass any string. Default value is 'vega-sidebar'.

Example
```vue
<VegaSidebar name="left-sidebar-1" />
```

### title
Sidebar title. You can pass any string. Default value is ''.

Example
```vue
<VegaSidebar title="My title" />
```

### width
Sidebar width in opened state. You can pass a string with valid css value. Default value is '350px'.

Example
```vue
<VegaSidebar width="300px" />
```

### width-min
Sidebar width in closed state. You can pass a string with valid css value. Default value is 'calc(2rem * 2 + 24px)'.

Example
```vue
<VegaSidebar width-min="0" />
```

### header-height
Sidebar header height. You can pass a string with valid css value. Default value is '80px'.

Example
```vue
<VegaSidebar header-height="100px" />
```

### padding
Sidebar left and right padding. You can pass a string with valid css value. Default value is '2rem'.

Example
```vue
<VegaSidebar padding="20px" />
```

### gap
Gap between header and content. You can pass a string with valid css value. Default value is '16px'.

Example
```vue
<VegaSidebar gap="0" />
```

### background
Sidebar background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```vue
<VegaSidebar background="#fff" />
```

## Slots

### default
Sidebar content

Example
```vue
<VegaSidebar>
  <div>My sidebar content</div>
</VegaSidebar>
```

### header
Header custom content.

Example
```vue
<VegaSidebar>
  <template #header>
    <div>SIDEBAR HEADER</div>
  </template>
</VegaSidebar>
```

### title
Custom title.

Example
```vue
<VegaSidebar>
  <template #title>
    <div>Custom title</div>
  </template>
</VegaSidebar>
```

### toggle-button
Custom toggle button.

Example
```vue
<VegaSidebar>
  <template #toggle-button>
    <button>click me!</button>
  </template>
</VegaSidebar>
```

# VegaSidebarToggle
Button to control the state of the sidebar. Associates with a specific sidebar using the "name" prop.

## Props
### name
Name of associated sidebar. Used as a key to store state of sidebar in local storage. You can pass any string. Default value is 'vega-sidebar'.

Example:
```vue
<VegaSidebarToggle name="left-sidebar-1" />
```

### show-if
Show toggle button only when associated sidebar is in certain state.\
If you want to show toggle button only when sidebar is closed, set `show-if` to "false"".\
Default value is "null"

Example:
```vue
<VegaSidebarToggle :show-if="false" />
```

### also-close
Automatically close sidebars with given names after changing  the state of main associated sidebar.
```vue
<VegaSidebarToggle name="left-sidebar-1" :also-close="['right-sidebar-1', 'right-sidebar-2']" />
```

## Slots

### default
Displayed button content. By default contains vega arrow icon.

Example:
```vue
<VegaSidebarToggle name="may-sidebar">
  <CustomIcon />
</VegaSidebarToggle>
```

# VegaLoremIpsum
Simple content placeholder.

Example
```vue
<VegaLoremIpsum />
```

# VegaInput
Customizable Input Component.
This component provides a versatile input field with slots for labels and optional prefix or postfix content. It supports various styling options through props like font size, color, placeholder attributes, and more.
By default, it uses a text input type, but you can specify other types as needed. The component also includes a debounce mechanism on input to limit the frequency of events, with a default delay of 300 milliseconds.

Simple example:
```vue
<vega-input
  v-model="modelValue"
  placeholder="Search here"
  padding="0 7px"
  :delay-debounce="800"
  @focus="focusInput"
  @blur="blurInput"
>
  <template #label>
    <label>Search:</label>
  </template>
  <template #prefix>
    <span>🔍</span>
  </template>
  <template #postfix>
    <button @click="clearSearch">Clear</button>
  </template>
</vega-input>

<script setup>
  import { VegaInput } from 'vega-ui'
</script>

```

### Props

Here are the props available for the component. Each prop allows you to customize the input field in various ways, enhancing its functionality and style.

| Prop Name          | Type    | Default                      | Description                                                |
|--------------------|---------|------------------------------|------------------------------------------------------------|
| `type`             | String  | `"text"`                     | Specifies the type of input.                               |
| `placeholder`      | String  | `""`                         | Text to display when the input is empty.                   |
| `modelValue`       | String  | `""`                         | Value bound to the input and updated via v-model.          |
| `fontSize`         | String  | `"inherit"`                  | Font size of the input text.                               |
| `fontColor`        | String  | `"var(--vega-text-color)"`   | Text color of the input.                                   |
| `placeholderColor` | String  | `"var(--vega-gray)"`         | Color of the placeholder text.                             |
| `backgroundColor`  | String  | `"none"`                     | Background color of the input.                             |
| `borderColor`      | String  | `"var(--vega-border-color)"` | Color of the input border.                                 |
| `hoverBorderColor` | String  | `"var(--vega-border-color)"` | Border color of the input on hover.                        |
| `focusBorderColor` | String  | `"var(--vega-border-color)"` | Border color of the input when focused.                    |
| `borderRadius`     | String  | `"4px"`                      | Border radius of the input field.                          |
| `padding`          | String  | `"10px"`                     | Padding inside the input field.                            |
| `width`            | String  | `"100%"`                     | Width of the input field.                                  |
| `height`           | String  | `"auto"`                     | Height of the input field.                                 |
| `textAlign`        | String  | `"left"`                     | Text alignment within the input field.                     |
| `delayDebounce`    | Number  | `300`                        | Milliseconds to delay the input event for debouncing.      |

### Events

The component emits the following events:

| Event Name         | Description                                                   |
|--------------------|---------------------------------------------------------------|
| `focus`            | Emitted when the input field gains focus.                     |
| `blur`             | Emitted when the input field loses focus.                     |
| `update:modelValue`| Emitted with the current value of the input when it changes.  |

