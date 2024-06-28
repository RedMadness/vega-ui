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
| Prop          | Type   | Default                       | Description                                   |
|---------------|--------|-------------------------------|-----------------------------------------------|
| `name`        | String | 'vega-sidebar'                | Name of the sidebar, used as a key for storing the state in local storage. |
| `title`       | String | ''                            | The title of the sidebar.                     |
| `width`       | String | '350px'                       | Width of the sidebar in its opened state.     |
| `width-min`   | String | 'calc(2rem * 2 + 24px)'       | Width of the sidebar in its closed state.     |
| `header-height` | String | '80px'                      | Height of the sidebar's header.               |
| `padding`     | String | '2rem'                        | Left and right padding of the sidebar.        |
| `gap`         | String | '16px'                        | Gap between the sidebar's header and content. |
| `background`  | String | 'none'                        | Background of the sidebar. Accepts HEX, RGB values. |


Example name:
```html
<VegaSidebar name="left-sidebar-1" />
```

Example title:
```html
<VegaSidebar title="My title" />
```

Example width:
```html
<VegaSidebar width="300px" />
```

Example width-min:
```html
<VegaSidebar width-min="0" />
```

Example header-height:
```html
<VegaSidebar header-height="100px" />
```

Example padding:
```html
<VegaSidebar padding="20px" />
```

Example gap:
```html
<VegaSidebar gap="0" />
```

Example background:
```html
<VegaSidebar background="#fff" />
```

## Slots

| Slot           | Description                     |
|----------------|---------------------------------|
| `default`      | Content of the sidebar.         |
| `header`       | Custom content for the sidebar header. |
| `title`        | Custom title content.           |
| `toggle-button`| Custom toggle button content.   |

Example default:
```html
<VegaSidebar>
  <div>My sidebar content</div>
</VegaSidebar>
```

Example header:
```html
<VegaSidebar>
  <template #header>
    <div>SIDEBAR HEADER</div>
  </template>
</VegaSidebar>
```

Example title:
```html
<VegaSidebar>
  <template #title>
    <div>Custom title</div>
  </template>
</VegaSidebar>
```

Example toggle-button:
```html
<VegaSidebar>
  <template #toggle-button>
    <button>click me!</button>
  </template>
</VegaSidebar>
```