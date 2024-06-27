# Sidebar
Sidebar with state memory.

## Usage

Component out of the box provide a hide/show button.\
By default, it is places in top right corner and uses vega icon, but you can override this.\
In addition, the sidebar saves its show/hide state in local storage, so when page reloads, it will be in same state as before.

Simple example:
```html
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
```html
<VegaSidebar name="left-sidebar-1" />
```

### title
Sidebar title. You can pass any string. Default value is ''.

Example
```html
<VegaSidebar title="My title" />
```

### width
Sidebar width in opened state. You can pass a string with valid css value. Default value is '350px'.

Example
```html
<VegaSidebar width="300px" />
```

### width-min
Sidebar width in closed state. You can pass a string with valid css value. Default value is 'calc(2rem * 2 + 24px)'.

Example
```html
<VegaSidebar width-min="0" />
```

### header-height
Sidebar header height. You can pass a string with valid css value. Default value is '80px'.

Example
```html
<VegaSidebar header-height="100px" />
```

### padding
Sidebar left and right padding. You can pass a string with valid css value. Default value is '2rem'.

Example
```html
<VegaSidebar padding="20px" />
```

### gap
Gap between header and content. You can pass a string with valid css value. Default value is '16px'.

Example
```html
<VegaSidebar gap="0" />
```

### background
Sidebar background. You can pass a string in HEX, RGB format. Default value is 'none'.

Example
```html
<VegaSidebar background="#fff" />
```

## Slots

### default
Sidebar content

Example
```html
<VegaSidebar>
  <div>My sidebar content</div>
</VegaSidebar>
```

### header
Header custom content.

Example
```html
<VegaSidebar>
  <template #header>
    <div>SIDEBAR HEADER</div>
  </template>
</VegaSidebar>
```

### title
Custom title.

Example
```html
<VegaSidebar>
  <template #title>
    <div>Custom title</div>
  </template>
</VegaSidebar>
```

### toggle-button
Custom toggle button.

Example
```html
<VegaSidebar>
  <template #toggle-button>
    <button>click me!</button>
  </template>
</VegaSidebar>
```