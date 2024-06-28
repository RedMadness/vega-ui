# Sidebar Toggle
Toggle button to control the state of the sidebar.\
Associates with a specific sidebar using the "name" prop.

## Usage

Here is example how to use sidebar toggle, placed in header slot, to control sidebar in aside slot of layout.\
To achieve a link between the sidebar and the toggle button, you must specify the same name in the `name` prop of the toggle component and the sidebar component.

```html{5,8}
<template>
  <div style="height: 100vh">
    <VegaLayout>
      <templae #header>
        <VegaSidebarToggle name="my-sidebar" />
      </templae>
      <template #aside-left>
        <VegaSidebar name="my-sidebar" />
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
| Prop       | Type    | Default      | Description |
|------------|---------|--------------|-------------|
| `name`     | String  | 'vega-sidebar' | Name of the associated sidebar. Used as a key to store the state of the sidebar in local storage. |
| `show-if`  | Boolean | `null`       | Show toggle button only when the associated sidebar is in a certain state. Set to `false` to show when the sidebar is closed. |
| `also-close` | Array | `undefined` | Automatically close sidebars with given names after changing the state of the main associated sidebar. |


Example name:
```html
<VegaSidebarToggle name="left-sidebar-1" />
```

Example show-if:
```html
<VegaSidebarToggle :show-if="false" />
```

Example also-close:
```html
<VegaSidebarToggle
  name="left-sidebar-1"
  :also-close="['right-sidebar-1', 'right-sidebar-2']"
/>
```

## Slots
| Slot     | Description                                 |
|----------|---------------------------------------------|
| `default` | Displays the button content, by default contains a vega arrow icon. |


Example default:
```html
<VegaSidebarToggle name="may-sidebar">
  <CustomIcon />
</VegaSidebarToggle>
```